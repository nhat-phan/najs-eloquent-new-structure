"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QueryBuilderHandleBase {
    constructor(model) {
        this.model = model;
        this.used = false;
    }
    setQueryName(name) {
        this.queryName = name;
    }
    getQueryName() {
        return this.queryName;
    }
    getLogGroup() {
        return this.logGroup;
    }
    setLogGroup(group) {
        this.logGroup = group;
    }
    markUsed() {
        this.used = true;
    }
    isUsed() {
        return this.used;
    }
}
exports.QueryBuilderHandleBase = QueryBuilderHandleBase;
