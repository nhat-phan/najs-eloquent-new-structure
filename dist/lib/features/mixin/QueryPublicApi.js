"use strict";
/// <reference path="../../definitions/model/IModel.ts" />
/// <reference path="../../definitions/query-builders/IQueryBuilder.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryPublicApi = {
    queryName(name) {
        return this.newQuery(name);
    },
    select(...fields) {
        return this.newQuery().select(...fields);
    },
    limit(record) {
        return this.newQuery().limit(record);
    },
    orderBy(field, direction) {
        return this.newQuery().orderBy(field, direction);
    },
    orderByAsc(field) {
        return this.newQuery().orderByAsc(field);
    },
    orderByDesc(field) {
        return this.newQuery().orderByDesc(field);
    },
    where(arg1, arg2, arg3) {
        return this.newQuery().where(arg1, arg2, arg3);
    },
    whereNot(field, value) {
        return this.newQuery().whereNot(field, value);
    },
    whereIn(field, values) {
        return this.newQuery().whereIn(field, values);
    },
    whereNotIn(field, values) {
        return this.newQuery().whereNotIn(field, values);
    },
    whereNull(field) {
        return this.newQuery().whereNull(field);
    },
    whereNotNull(field) {
        return this.newQuery().whereNotNull(field);
    },
    whereBetween(field, range) {
        return this.newQuery().whereBetween(field, range);
    },
    whereNotBetween(field, range) {
        return this.newQuery().whereNotBetween(field, range);
    },
    withTrashed() {
        return this.newQuery().withTrashed();
    },
    onlyTrashed() {
        return this.newQuery().onlyTrashed();
    },
    first(id) {
        return this.newQuery().first(id);
    },
    find(id) {
        return this.newQuery().find(id);
    },
    get() {
        return this.newQuery().get(...arguments);
    },
    all() {
        return this.newQuery().all();
    },
    count() {
        return this.newQuery().count();
    },
    pluck(valueKey, indexKey) {
        return this.newQuery().pluck(valueKey, indexKey);
    },
    findById(id) {
        return this.newQuery().findById(id);
    },
    findOrFail(id) {
        return this.newQuery().findOrFail(id);
    },
    firstOrFail(id) {
        return this.newQuery().firstOrFail(id);
    }
};
