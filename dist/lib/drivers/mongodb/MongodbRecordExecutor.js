"use strict";
/// <reference path="../../definitions/features/IRecordExecutor.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
class MongodbRecordExecutor {
    constructor(model, record, collection, logger) {
        this.model = model;
        this.record = record;
        this.collection = collection;
        this.logger = logger;
    }
    async create() {
        return {};
    }
    async update() {
        return {};
    }
    async delete(useSoftDelete) {
        return {};
    }
    async restore(record) {
        return {};
    }
}
exports.MongodbRecordExecutor = MongodbRecordExecutor;
