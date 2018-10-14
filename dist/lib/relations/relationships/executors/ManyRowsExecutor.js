"use strict";
/// <reference path="../../../definitions/data/IDataCollector.ts" />
/// <reference path="../../../definitions/model/IModel.ts" />
/// <reference path="../../../definitions/relations/IRelationshipExecutor.ts" />
/// <reference path="../../../definitions/relations/IRelationDataBucket.ts" />
/// <reference path="../../../definitions/query-builders/IQueryBuilder.ts" />
/// <reference path="../../../definitions/collect.js/index.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const factory_1 = require("../../../util/factory");
class ManyRowsExecutor {
    constructor(dataBucket, targetModel) {
        this.dataBucket = dataBucket;
        this.targetModel = targetModel;
    }
    async executeQuery(queryBuilder) {
        return queryBuilder.get();
    }
    executeCollector(collector) {
        return this.dataBucket.makeCollection(this.targetModel, collector.exec());
    }
    getEmptyValue() {
        return factory_1.make_collection([]);
    }
}
exports.ManyRowsExecutor = ManyRowsExecutor;
