"use strict";
/// <reference path="../definitions/model/IModel.ts" />
/// <reference path="../definitions/features/ISoftDeletesFeature.ts" />
/// <reference path="../definitions/features/ITimestampsFeature.ts" />
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
    setLogGroup(group) {
        this.logGroup = group;
    }
    getLogGroup() {
        return this.logGroup;
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
    getSoftDeletesSetting() {
        return this.model
            .getDriver()
            .getSoftDeletesFeature()
            .getSoftDeletesSetting(this.model);
    }
    hasTimestamps() {
        return this.model
            .getDriver()
            .getTimestampsFeature()
            .hasTimestamps(this.model);
    }
    getTimestampsSetting() {
        return this.model
            .getDriver()
            .getTimestampsFeature()
            .getTimestampsSetting(this.model);
    }
    markSoftDeleteState(state) {
        this.softDeleteState = state;
    }
    getSoftDeleteState() {
        return this.softDeleteState;
    }
    shouldAddSoftDeleteCondition() {
        return this.softDeleteState === 'should-add' && this.hasSoftDeletes();
    }
    createCollection(result) {
        // TODO: implement
        return {};
    }
    createInstance(result) {
        // TODO: implement
        return {};
    }
}
exports.QueryBuilderHandleBase = QueryBuilderHandleBase;
