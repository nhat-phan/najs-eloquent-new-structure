"use strict";
/// <reference path="../../definitions/model/IModel.ts" />
/// <reference path="../../definitions/query-grammars/IBasicQuery.ts" />
/// <reference path="../../definitions/query-grammars/IConditionQuery.ts" />
/// <reference path="../../definitions/query-builders/IConvention.ts" />
/// <reference path="../../definitions/query-builders/IExecutor.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const QueryBuilderHandleBase_1 = require("../../query-builders/QueryBuilderHandleBase");
const BasicQuery_1 = require("../../query-builders/shared/BasicQuery");
const MongodbConvention_1 = require("../../query-builders/shared/MongodbConvention");
const ConditionQueryHandle_1 = require("../../query-builders/shared/ConditionQueryHandle");
const MongodbExecutor_1 = require("./MongodbExecutor");
const MongodbQueryLog_1 = require("./MongodbQueryLog");
class MongodbQueryBuilderHandle extends QueryBuilderHandleBase_1.QueryBuilderHandleBase {
    constructor(model) {
        super(model);
        this.convention = new MongodbConvention_1.MongodbConvention();
        this.basicQuery = new BasicQuery_1.BasicQuery(this.convention);
        this.conditionQuery = new ConditionQueryHandle_1.ConditionQueryHandle(this.basicQuery, this.convention);
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
    getQueryExecutor() {
        return new MongodbExecutor_1.MongodbExecutor(this, this.basicQuery, new MongodbQueryLog_1.MongodbQueryLog());
    }
}
exports.MongodbQueryBuilderHandle = MongodbQueryBuilderHandle;
