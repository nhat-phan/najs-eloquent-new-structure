"use strict";
/// <reference path="../../definitions/features/IRecordExecutor.ts" />
/// <reference path="../../definitions/query-builders/IConvention.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const MongodbConvention_1 = require("../../query-builders/shared/MongodbConvention");
const lodash_1 = require("lodash");
const Moment = require("moment");
class MongodbRecordExecutor {
    constructor(model, record, collection, logger) {
        this.model = model;
        this.record = record;
        this.collection = collection;
        this.logger = logger;
        this.convention = new MongodbConvention_1.MongodbConvention();
    }
    fillData(isCreate) {
        const timestampFeature = this.model.getDriver().getTimestampsFeature();
        const softDeletesFeature = this.model.getDriver().getSoftDeletesFeature();
        if (timestampFeature.hasTimestamps(this.model)) {
            const timestampSettings = timestampFeature.getTimestampsSetting(this.model);
            this.record.setAttribute(timestampSettings.updatedAt, Moment().toDate());
            if (isCreate) {
                this.setAttributeIfNeeded(timestampSettings.createdAt, Moment().toDate());
            }
        }
        if (softDeletesFeature.hasSoftDeletes(this.model)) {
            const softDeleteSettings = softDeletesFeature.getSoftDeletesSetting(this.model);
            this.setAttributeIfNeeded(softDeleteSettings.deletedAt, this.convention.getNullValueFor(softDeleteSettings.deletedAt));
        }
    }
    setAttributeIfNeeded(attribute, value) {
        if (typeof this.record.getAttribute(attribute) === 'undefined') {
            this.record.setAttribute(attribute, value);
        }
    }
    async create(shouldFillData = true) {
        if (shouldFillData) {
            this.fillData(true);
        }
        const data = this.record.toObject();
        this.logRaw('insertOne', data).action(`${this.model.getModelName()}.create()`);
        return this.collection.insertOne(data).then(response => {
            return this.logger.end({
                result: response.result,
                insertedId: response.insertedId,
                insertedCount: response.insertedCount
            });
        });
    }
    async update(shouldFillData = true) {
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
        this.logRaw('updateOne', filter, data).action(`${this.model.getModelName()}.update()`);
        return this.collection.updateOne(filter, data).then(response => {
            return this.logger.end({
                result: response.result,
                upsertedId: response.upsertedId,
                upsertedCount: response.upsertedCount
            });
        });
    }
    async delete(useSoftDelete) {
        return {};
    }
    async restore() {
        return {};
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
