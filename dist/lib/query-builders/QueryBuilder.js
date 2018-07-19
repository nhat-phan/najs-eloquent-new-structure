"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Query_1 = require("./mixin/Query");
const ConditionQuery_1 = require("./mixin/ConditionQuery");
const SoftDeleteQuery_1 = require("./mixin/SoftDeleteQuery");
class QueryBuilder {
    constructor(handler) {
        this.handler = handler;
    }
}
exports.QueryBuilder = QueryBuilder;
Object.assign(QueryBuilder.prototype, Query_1.Query, ConditionQuery_1.ConditionQuery, SoftDeleteQuery_1.SoftDeleteQuery);
