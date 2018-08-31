"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const QueryBuilder_1 = require("../../query-builders/QueryBuilder");
class KnexQueryBuilder extends QueryBuilder_1.QueryBuilder {
    native(nativeCb) {
        const queryBuilder = this.handler.getKnexQueryBuilder();
        nativeCb.call(undefined, queryBuilder);
        return this;
    }
    toSqlQuery() {
        return this.handler.getKnexQueryBuilder().toQuery();
    }
}
exports.KnexQueryBuilder = KnexQueryBuilder;
