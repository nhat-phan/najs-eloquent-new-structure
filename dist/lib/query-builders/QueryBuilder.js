"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Query_1 = require("./mixin/Query");
const ConditionQuery_1 = require("./mixin/ConditionQuery");
const AdvancedQuery_1 = require("./mixin/AdvancedQuery");
class QueryBuilder {
    constructor(handler) {
        this.handler = handler;
    }
}
exports.QueryBuilder = QueryBuilder;
Object.assign(QueryBuilder.prototype, Query_1.Query, ConditionQuery_1.ConditionQuery, AdvancedQuery_1.AdvancedQuery);
