"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QueryBase {
    constructor(primaryKeyName) {
        this.primaryKeyName = primaryKeyName || 'id';
        this.convention = this.getQueryConvention();
    }
    getQueryConvention() {
        return QueryBase.DefaultConvention;
    }
    queryName(name) {
        this.name = name;
        return this;
    }
    setLogGroup(group) {
        this.logGroup = group;
        return this;
    }
    getPrimaryKeyName() {
        return this.convention.formatFieldName(this.primaryKeyName);
    }
}
QueryBase.DefaultConvention = {
    formatFieldName(name) {
        return name;
    },
    getNullValueFor(name) {
        // tslint:disable-next-line
        return null;
    }
};
exports.QueryBase = QueryBase;
