"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const QueryBuilder_1 = require("../../query-builders/QueryBuilder");
class MongodbQueryBuilder extends QueryBuilder_1.QueryBuilder {
    native(handler) {
        return this.handler.getQueryExecutor().native(handler);
    }
    collection() {
        return this.handler.getQueryExecutor().getCollection();
    }
}
exports.MongodbQueryBuilder = MongodbQueryBuilder;
