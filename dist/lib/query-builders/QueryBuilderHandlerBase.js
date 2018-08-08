"use strict";
/// <reference path="../definitions/model/IModel.ts" />
/// <reference path="../definitions/features/ISoftDeletesFeature.ts" />
/// <reference path="../definitions/features/ITimestampsFeature.ts" />
/// <reference path="../definitions/query-builders/IConvention.ts" />
/// <reference path="../definitions/query-builders/IExecutor.ts" />
/// <reference path="../definitions/query-builders/IQueryBuilderHandler.ts" />
/// <reference path="../definitions/query-grammars/IBasicQuery.ts" />
/// <reference path="../definitions/query-grammars/IQuery.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const factory_1 = require("../util/factory");
class QueryBuilderHandlerBase {
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
        return factory_1.make_collection(result, item => this.createInstance(item));
    }
    createInstance(result) {
        const relationFeature = this.model.getDriver().getRelationFeature();
        const bucket = relationFeature.getDataBucket(this.model) || relationFeature.makeDataBucket(this.model);
        const model = bucket.makeModel(this.model, result);
        bucket.add(model);
        return model;
    }
}
exports.QueryBuilderHandlerBase = QueryBuilderHandlerBase;
