"use strict";
/// <reference path="../../definitions/query-builders/IQueryExecutor" />
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const ExecutorUtils_1 = require("../../query-builders/shared/ExecutorUtils");
class MongooseQueryExecutor {
    constructor(queryHandler, mongooseModel, logger) {
        this.queryHandler = queryHandler;
        this.basicQuery = queryHandler.getBasicQuery();
        this.mongooseModel = mongooseModel;
        this.modelName = mongooseModel.modelName || this.queryHandler.getModel().getModelName();
        this.logger = logger;
        this.logger.name(this.queryHandler.getQueryName());
    }
    async get() {
        const query = this.createQuery(false);
        const result = await query.exec();
        return this.logger
            .raw('.exec()')
            .action('get')
            .end(result);
    }
    async first() {
        const query = this.createQuery(true);
        const result = await query.exec();
        return this.logger
            .raw('.exec()')
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
        const query = this.createQuery(false);
        const result = await query.count().exec();
        return this.logger
            .raw('.count().exec()')
            .action('count')
            .end(result);
    }
    async update(data) {
        return {};
    }
    async delete() {
        return {};
    }
    async restore() {
        return {};
    }
    async execute() {
        return {};
    }
    // -------------------------------------------------------------------------------------------------------------------
    getMongooseQuery(isFindOne) {
        if (!this.hasMongooseQuery) {
            const conditions = this.basicQuery.getConditions();
            const query = ExecutorUtils_1.ExecutorUtils.convertConditionsToMongodbQuery(conditions);
            this.mongooseQuery = isFindOne ? this.mongooseModel.findOne(query) : this.mongooseModel.find(query);
            this.logger.raw(this.modelName).raw(isFindOne ? '.findOne(' : '.find(', query, ')');
            this.hasMongooseQuery = true;
        }
        return this.mongooseQuery;
    }
    passSelectToQuery(query) {
        const select = this.basicQuery.getSelect();
        if (typeof select !== 'undefined' && select.length > 0) {
            const fields = select.join(' ');
            query.select(fields);
            this.logger.raw(`.select("${fields}")`);
        }
    }
    passLimitToQuery(query) {
        const limit = this.basicQuery.getLimit();
        if (limit) {
            query.limit(limit);
            this.logger.raw(`.limit(${limit})`);
        }
    }
    passOrderingToQuery(query) {
        const ordering = this.basicQuery.getOrdering();
        if (ordering && !lodash_1.isEmpty(ordering)) {
            const sort = Object.keys(ordering).reduce((memo, key) => {
                memo[key] = ordering[key] === 'asc' ? 1 : -1;
                return memo;
            }, {});
            query.sort(sort);
            this.logger.raw('.sort(', sort, ')');
        }
    }
    createQuery(findOne) {
        const mongooseQuery = this.getMongooseQuery(findOne);
        this.passSelectToQuery(mongooseQuery);
        this.passLimitToQuery(mongooseQuery);
        this.passOrderingToQuery(mongooseQuery);
        return mongooseQuery;
    }
}
exports.MongooseQueryExecutor = MongooseQueryExecutor;
