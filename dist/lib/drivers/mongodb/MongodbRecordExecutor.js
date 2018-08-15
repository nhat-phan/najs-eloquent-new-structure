"use strict";
/// <reference path="../../definitions/features/IRecordExecutor.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const Moment = require("moment");
class MongodbRecordExecutor {
    constructor(model, record, collection, logger) {
        this.model = model;
        this.record = record;
        this.collection = collection;
        this.logger = logger;
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
            // tslint:disable-next-line
            this.setAttributeIfNeeded(softDeleteSettings.deletedAt, null);
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
        this.logRaw(data, 'insertOne').action(`${this.model.getModelName()}.create()`);
        return this.collection.insertOne(data).then((response) => {
            return this.logger.end({
                result: response.result,
                insertedId: response.insertedId,
                insertedCount: response.insertedCount
            });
        });
    }
    async update(shouldFillData = true) {
        // if (shouldFillData) {
        //   this.fillData(false)
        // }
        // return new Promise((resolve, reject) => {
        //   this.collection.updateOne(this.record.toObject(), function(error: any, result: any) {
        //     if (error) {
        //       return reject(error)
        //     }
        //     resolve(result)
        //   })
        // }) as any
        return {};
    }
    async delete(useSoftDelete) {
        return {};
    }
    async restore() {
        return {};
    }
    logRaw(data, func) {
        return this.logger.raw('db.', this.collection.collectionName, `.${func}(`, data, ')');
    }
}
exports.MongodbRecordExecutor = MongodbRecordExecutor;
