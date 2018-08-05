"use strict";
/// <reference path="../../definitions/query-builders/IExecutor" />
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const MongodbProviderFacade_1 = require("../../facades/global/MongodbProviderFacade");
const ExecutorUtils_1 = require("../../query-builders/shared/ExecutorUtils");
const Moment = require("moment");
class MongodbExecutor {
    constructor(queryHandler, basicQuery, logger) {
        this.queryHandler = queryHandler;
        this.basicQuery = basicQuery;
        this.logger = logger;
        this.collectionName = this.queryHandler.getModel().getRecordName();
        this.collection = MongodbProviderFacade_1.MongodbProviderFacade.getDatabase().collection(this.collectionName);
        this.logger.name(this.queryHandler.getQueryName());
    }
    async get() {
        const query = this.makeQuery();
        const options = this.makeQueryOptions();
        const result = await this.collection.find(query, options).toArray();
        return this.logRaw(query, options, 'find')
            .raw('.toArray()')
            .action('get')
            .end(result);
    }
    async first() {
        const query = this.makeQuery();
        const options = this.makeQueryOptions();
        const result = await this.collection.findOne(query, options);
        return this.logRaw(query, options, 'findOne')
            .action('first')
            .end(result);
    }
    async count() {
        if (this.basicQuery.getSelect()) {
            this.basicQuery.clearSelect();
        }
        if (!lodash_1.isEmpty(this.basicQuery.getOrdering())) {
            this.basicQuery.clearOrdering();
        }
        const query = this.makeQuery();
        const options = this.makeQueryOptions();
        const result = await this.collection.count(query, options);
        return this.logRaw(query, options, 'count')
            .action('count')
            .end(result);
    }
    async update(data) {
        const query = this.makeQuery();
        if (this.queryHandler.hasTimestamps()) {
            if (typeof data['$set'] === 'undefined') {
                data['$set'] = {};
            }
            data['$set'][this.queryHandler.getTimestampsSetting().updatedAt] = Moment().toDate();
        }
        const result = await this.collection.updateMany(query, data).then(function (response) {
            return response.result;
        });
        return this.logger
            .raw('db.', this.collection.collectionName, '.updateMany(', query, ', ', data, ')')
            .action('update')
            .end(result);
    }
    async delete() {
        if (!this.queryHandler.isUsed()) {
            return Promise.resolve({ n: 0, ok: 1 });
        }
        const query = this.makeQuery();
        if (lodash_1.isEmpty(query)) {
            return Promise.resolve({ n: 0, ok: 1 });
        }
        const result = await this.collection.deleteMany(query).then(function (response) {
            return response.result;
        });
        return this.logger
            .raw('db.', this.collection.collectionName, '.deleteMany(', query, ')')
            .action('delete')
            .end(result);
    }
    async restore() { }
    async execute() { }
    logRaw(query, options, func) {
        return this.logger.raw('db.', this.collectionName, `.${func}(`, query).raw(options ? ', ' : '', options, ')');
    }
    makeQuery() {
        ExecutorUtils_1.ExecutorUtils.addSoftDeleteConditionIfNeeded(this.queryHandler);
        const conditions = this.basicQuery.getConditions();
        return this.logger
            .queryBuilderData('conditions', conditions)
            .query(ExecutorUtils_1.ExecutorUtils.convertConditionsToMongodbQuery(conditions));
    }
    makeQueryOptions() {
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
