"use strict";
/// <reference path="../../definitions/model/IModel.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
// import IModel = NajsEloquent.Model.IModel
const QueryBuilder_1 = require("../../query-builders/QueryBuilder");
class MongooseQueryBuilder extends QueryBuilder_1.QueryBuilder {
    native(handler) {
        const executor = this.handler.getQueryExecutor();
        return executor.native(handler);
    }
    nativeModel() {
        const executor = this.handler.getQueryExecutor();
        return executor.getMongooseModel();
    }
}
exports.MongooseQueryBuilder = MongooseQueryBuilder;
