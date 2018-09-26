"use strict";
/// <reference path="../../definitions/model/IModel.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
// import IModel = NajsEloquent.Model.IModel
const QueryBuilder_1 = require("../../query-builders/QueryBuilder");
class MongodbQueryBuilder extends QueryBuilder_1.QueryBuilder {
    native(handler) {
        const queryExecutor = this.handler.getQueryExecutor();
        return queryExecutor.native(handler);
    }
    collection() {
        const queryExecutor = this.handler.getQueryExecutor();
        return queryExecutor.getCollection();
    }
}
exports.MongodbQueryBuilder = MongodbQueryBuilder;
