"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QueryBuilder {
    constructor(handler) {
        this.handler = handler;
    }
    queryName(name) {
        this.handler.setQueryName(name);
        return this;
    }
    setLogGroup(group) {
        this.handler.setLogGroup(group);
        return this;
    }
    orderByAsc(field) {
        this.handler.getBasicQuery().orderBy(field, 'asc');
        this.handler.markUsed();
        return this;
    }
    orderByDesc(field) {
        this.handler.getBasicQuery().orderBy(field, 'desc');
        this.handler.markUsed();
        return this;
    }
}
exports.QueryBuilder = QueryBuilder;
