"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Query_1 = require("./mixin/Query");
class QueryBuilder {
    constructor(handler) {
        this.handler = handler;
    }
}
exports.QueryBuilder = QueryBuilder;
Object.assign(QueryBuilder.prototype, Query_1.Query);
