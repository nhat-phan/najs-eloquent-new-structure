"use strict";
/// <reference path="../../definitions/features/IRecordExecutor.ts" />
/// <reference path="../../definitions/query-builders/IConvention.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const ExecutorBase_1 = require("../ExecutorBase");
const MongodbConvention_1 = require("../../query-builders/shared/MongodbConvention");
const lodash_1 = require("lodash");
const Moment = require("moment");
class MongodbRecordExecutor extends ExecutorBase_1.ExecutorBase {
    constructor(model, record, collection, logger) {
        super();
        this.model = model;
        this.record = record;
        this.collection = collection;
        this.logger = logger;
        this.convention = new MongodbConvention_1.MongodbConvention();
    }
    fillData(isCreate) {
        this.fillTimestampsData(isCreate);
        this.fillSoftDeletesData();
    }
    fillSoftDeletesData() {
        const softDeletesFeature = this.model.getDriver().getSoftDeletesFeature();
        if (softDeletesFeature.hasSoftDeletes(this.model)) {
            const softDeleteSettings = softDeletesFeature.getSoftDeletesSetting(this.model);
            this.setAttributeIfNeeded(this.convention.formatFieldName(softDeleteSettings.deletedAt), this.convention.getNullValueFor(softDeleteSettings.deletedAt));
        }
    }
    fillTimestampsData(isCreate) {
        const timestampFeature = this.model.getDriver().getTimestampsFeature();
        if (timestampFeature.hasTimestamps(this.model)) {
            const timestampSettings = timestampFeature.getTimestampsSetting(this.model);
            this.record.setAttribute(this.convention.formatFieldName(timestampSettings.updatedAt), Moment().toDate());
            if (isCreate) {
                this.setAttributeIfNeeded(this.convention.formatFieldName(timestampSettings.createdAt), Moment().toDate());
            }
        }
    }
    setAttributeIfNeeded(attribute, value) {
        if (typeof this.record.getAttribute(attribute) === 'undefined') {
            this.record.setAttribute(attribute, value);
        }
    }
    async create(shouldFillData = true, action = 'create') {
        if (shouldFillData) {
            this.fillData(true);
        }
        const data = this.record.toObject();
        this.logRaw('insertOne', data).action(`${this.model.getModelName()}.${action}()`);
        return this.shouldExecute()
            ? this.collection.insertOne(data).then(response => {
                return this.logger.end({
                    result: response.result,
                    insertedId: response.insertedId,
                    insertedCount: response.insertedCount
                });
            })
            : this.logger.end({});
    }
    async update(shouldFillData = true, action = 'update') {
        const filter = this.getFilter();
        if (lodash_1.isEmpty(filter)) {
            return false;
        }
        if (shouldFillData) {
            this.fillData(false);
        }
        const modifiedData = this.getModifiedData();
        if (lodash_1.isEmpty(modifiedData)) {
            return false;
        }
        const data = { $set: modifiedData };
        this.logRaw('updateOne', filter, data).action(`${this.model.getModelName()}.${action}()`);
        return this.shouldExecute()
            ? this.collection.updateOne(filter, data).then(response => {
                return this.logger.end({
                    result: response.result,
                    upsertedId: response.upsertedId,
                    upsertedCount: response.upsertedCount
                });
            })
            : this.logger.end({});
    }
    async softDelete() {
        const isNew = this.model.isNew();
        this.fillTimestampsData(isNew);
        const softDeletesFeature = this.model.getDriver().getSoftDeletesFeature();
        this.record.setAttribute(this.convention.formatFieldName(softDeletesFeature.getSoftDeletesSetting(this.model).deletedAt), Moment().toDate());
        return isNew ? this.create(false, 'softDelete') : this.update(false, 'softDelete');
    }
    async hardDelete() {
        const filter = this.getFilter();
        if (lodash_1.isEmpty(filter)) {
            return false;
        }
        this.logRaw('deleteOne', filter).action(`${this.model.getModelName()}.hardDelete()`);
        return this.shouldExecute()
            ? this.collection.deleteOne(filter).then(response => {
                return this.logger.end({
                    result: response.result,
                    deletedCount: response.deletedCount
                });
            })
            : this.logger.end({});
    }
    async restore() {
        const softDeletesFeature = this.model.getDriver().getSoftDeletesFeature();
        const fieldName = softDeletesFeature.getSoftDeletesSetting(this.model).deletedAt;
        this.fillTimestampsData(false);
        this.record.setAttribute(this.convention.formatFieldName(fieldName), this.convention.getNullValueFor(fieldName));
        return this.update(false, 'restore');
    }
    getModifiedData() {
        return this.record.getModified().reduce((data, name) => {
            data[this.convention.formatFieldName(name)] = this.record.getAttribute(name);
            return data;
        }, {});
    }
    getFilter() {
        const primaryKeyValue = this.model.getPrimaryKey();
        if (!primaryKeyValue) {
            return {};
        }
        return { [this.convention.formatFieldName(this.model.getPrimaryKeyName())]: primaryKeyValue };
    }
    logRaw(func, ...args) {
        const passed = [];
        for (let i = 0, l = args.length; i < l; i++) {
            passed.push(args[i]);
            if (i !== l - 1) {
                passed.push(',');
            }
        }
        return this.logger.raw('db.', this.collection.collectionName, `.${func}(`, ...passed, ')');
    }
}
exports.MongodbRecordExecutor = MongodbRecordExecutor;
