"use strict";
/// <reference path="../QueryBuilder.ts" />
/// <reference path="../../definitions/query-grammars/IExecuteQuery.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecuteQuery = {
    async get() {
        return this.handler.getQueryExecutor().get();
    },
    async first() {
        return this.handler.getQueryExecutor().first();
    },
    async count() {
        return this.handler.getQueryExecutor().count();
    },
    async update(data) {
        return this.handler.getQueryExecutor().update(this);
    },
    async delete() {
        return this.handler.getQueryExecutor().delete();
    },
    async restore() {
        return this.handler.getQueryExecutor().restore();
    },
    async execute() {
        return this.handler.getQueryExecutor().execute();
    }
};
