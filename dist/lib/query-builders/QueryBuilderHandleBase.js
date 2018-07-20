"use strict";
/// <reference path="../definitions/model/IModel.ts" />
/// <reference path="../definitions/query-builders/IConvention.ts" />
/// <reference path="../definitions/query-builders/IExecutor.ts" />
/// <reference path="../definitions/query-builders/IQueryBuilderHandle.ts" />
/// <reference path="../definitions/query-grammars/IBasicQuery.ts" />
/// <reference path="../definitions/query-grammars/IQuery.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
class QueryBuilderHandleBase {
    constructor(model) {
        this.model = model;
        this.used = false;
        this.softDeleteState = 'should-add';
    }
    getModel() {
        return this.model;
    }
    getPrimaryKeyName() {
        return this.model.getPrimaryKeyName();
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
    hasSoftDeletes() {
        return this.model
            .getDriver()
            .getSoftDeletesFeature()
            .hasSoftDeletes(this.model);
    }
    markSoftDeleteState(state) {
        this.softDeleteState = state;
    }
    shouldAddSoftDeleteCondition() {
        return this.softDeleteState === 'should-add' && this.hasSoftDeletes();
    }
    createCollection(result) {
        return {};
    }
    createInstance(result) {
        return {};
    }
}
exports.QueryBuilderHandleBase = QueryBuilderHandleBase;
