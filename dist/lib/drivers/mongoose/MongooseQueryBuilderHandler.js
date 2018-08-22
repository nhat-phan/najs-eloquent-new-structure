"use strict";
/// <reference path="../../definitions/model/IModel.ts" />
/// <reference path="../../definitions/query-grammars/IBasicQuery.ts" />
/// <reference path="../../definitions/query-grammars/IConditionQuery.ts" />
/// <reference path="../../definitions/query-builders/IConvention.ts" />
/// <reference path="../../definitions/query-builders/IQueryExecutor.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const najs_binding_1 = require("najs-binding");
const QueryBuilderHandlerBase_1 = require("../../query-builders/QueryBuilderHandlerBase");
const BasicQuery_1 = require("../../query-builders/shared/BasicQuery");
const MongodbConvention_1 = require("../../query-builders/shared/MongodbConvention");
const ConditionQueryHandler_1 = require("../../query-builders/shared/ConditionQueryHandler");
const MongooseExecutorFactory_1 = require("./MongooseExecutorFactory");
class MongooseQueryBuilderHandler extends QueryBuilderHandlerBase_1.QueryBuilderHandlerBase {
    constructor(model) {
        super(model, najs_binding_1.make(MongooseExecutorFactory_1.MongooseExecutorFactory.className));
        this.convention = new MongodbConvention_1.MongodbConvention();
        this.basicQuery = new BasicQuery_1.BasicQuery(this.convention);
        this.conditionQuery = new ConditionQueryHandler_1.ConditionQueryHandler(this.basicQuery, this.convention);
    }
    getBasicQuery() {
        return this.basicQuery;
    }
    getConditionQuery() {
        return this.conditionQuery;
    }
    getQueryConvention() {
        return this.convention;
    }
}
exports.MongooseQueryBuilderHandler = MongooseQueryBuilderHandler;
