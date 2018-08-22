"use strict";
/// <reference path="../../definitions/query-builders/IQueryExecutor" />
Object.defineProperty(exports, "__esModule", { value: true });
// import { ExecutorUtils } from '../../query-builders/shared/ExecutorUtils'
// import * as Moment from 'moment'
class MongooseQueryExecutor {
    constructor(queryHandler, mongooseModel, logger) {
        this.queryHandler = queryHandler;
        this.basicQuery = queryHandler.getBasicQuery();
        this.mongooseModel = mongooseModel;
        this.logger = logger;
        this.logger.name(this.queryHandler.getQueryName());
    }
    async get() {
        return {};
    }
    async first() {
        return {};
    }
    async count() {
        return {};
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
}
exports.MongooseQueryExecutor = MongooseQueryExecutor;
