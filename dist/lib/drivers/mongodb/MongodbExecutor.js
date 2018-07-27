"use strict";
/// <reference path="../../definitions/query-builders/IExecutor" />
Object.defineProperty(exports, "__esModule", { value: true });
const najs_binding_1 = require("najs-binding");
const lodash_1 = require("lodash");
const MongodbConditionConverter_1 = require("../../query-builders/shared/MongodbConditionConverter");
class MongodbExecutor {
    constructor(queryHandler, basicQuery, logger) {
        this.queryHandler = queryHandler;
        this.basicQuery = basicQuery;
        this.logger = logger;
        this.collectionName = this.queryHandler.getModel().getRecordName();
        this.logger.name(this.queryHandler.getQueryName());
    }
    async get() {
        const query = this.getQuery();
        const options = this.getQueryOptions();
        const result = this.collection.find(query, options).toArray();
        return this.logRaw(query, options, 'find')
            .raw('.toArray()')
            .action('get()')
            .end(result);
    }
    async first() {
        const query = this.getQuery();
        const options = this.getQueryOptions();
        const result = this.collection.findOne(query, options);
        return this.logRaw(query, options, 'findOne')
            .action('first()')
            .end(result);
    }
    async count() {
        if (this.basicQuery.getSelect()) {
            this.basicQuery.clearSelect();
        }
        if (!lodash_1.isEmpty(this.basicQuery.getOrdering())) {
            this.basicQuery.clearOrdering();
        }
        const query = this.getQuery();
        const options = this.getQueryOptions();
        const result = this.collection.count(query, options);
        return this.logRaw(query, options, 'count')
            .action('count()')
            .end(result);
    }
    async update(data) {
        return {};
    }
    async delete() { }
    async restore() { }
    async execute() { }
    logRaw(query, options, func) {
        return this.logger.raw('db.', this.collectionName, `.${func}(`, query).raw(options ? ', ' : '', options, ')');
    }
    getQuery() {
        if (this.queryHandler.shouldAddSoftDeleteCondition()) {
            const settings = this.queryHandler.getSoftDeletesSetting();
            this.queryHandler.getConditionQuery().whereNull(settings.deletedAt);
            this.queryHandler.markSoftDeleteState('added');
        }
        const conditions = this.basicQuery.getConditions();
        return this.logger
            .queryBuilderData('conditions', conditions)
            .query(this.resolveMongodbConditionConverter(conditions));
    }
    resolveMongodbConditionConverter(conditions) {
        return najs_binding_1.make(MongodbConditionConverter_1.MongodbConditionConverter.className, [conditions]);
    }
    getQueryOptions() {
        const options = {};
        const limit = this.basicQuery.getLimit();
        if (limit) {
            options['limit'] = limit;
            this.logger.queryBuilderData('limit', limit);
        }
        const ordering = this.basicQuery.getOrdering();
        if (ordering && !lodash_1.isEmpty(ordering)) {
            this.logger.queryBuilderData('ordering', ordering);
            options['sort'] = Object.keys(ordering).reduce((memo, key) => {
                memo.push([key, ordering[key] === 'asc' ? 1 : -1]);
                return memo;
            }, []);
        }
        const selected = this.basicQuery.getSelect();
        if (!lodash_1.isEmpty(selected)) {
            this.logger.queryBuilderData('select', selected);
            options['projection'] = selected.reduce((memo, key) => {
                memo[key] = 1;
                return memo;
            }, {});
        }
        return this.logger.options(lodash_1.isEmpty(options) ? undefined : options);
    }
}
exports.MongodbExecutor = MongodbExecutor;
