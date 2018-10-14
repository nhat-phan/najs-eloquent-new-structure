"use strict";
/// <reference path="../../../definitions/data/IDataCollector.ts" />
/// <reference path="../../../definitions/model/IModel.ts" />
/// <reference path="../../../definitions/relations/IRelationshipExecutor.ts" />
/// <reference path="../../../definitions/relations/IRelationDataBucket.ts" />
/// <reference path="../../../definitions/query-builders/IQueryBuilder.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
class OneRowExecutor {
    constructor(dataBucket, targetModel) {
        this.dataBucket = dataBucket;
        this.targetModel = targetModel;
    }
    async executeQuery(queryBuilder) {
        return queryBuilder.first();
    }
    executeCollector(collector) {
        collector.limit(1);
        const result = collector.exec();
        if (result.length === 0) {
            return undefined;
        }
        return this.dataBucket.makeModel(this.targetModel, result[0]);
    }
    getEmptyValue() {
        return undefined;
    }
}
exports.OneRowExecutor = OneRowExecutor;
