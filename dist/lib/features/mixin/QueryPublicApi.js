"use strict";
/// <reference path="../../definitions/model/IModel.ts" />
/// <reference path="../../definitions/model/IModelQuery.ts" />
/// <reference path="../../definitions/query-builders/IQueryBuilder.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryPublicApi = {
    queryName(name) {
        return this.newQuery(name);
    },
    setLogGroup(group) {
        const query = this.newQuery();
        return query.setLogGroup.apply(query, arguments);
    },
    select(...fields) {
        const query = this.newQuery();
        return query.select.apply(query, arguments);
    },
    limit(record) {
        const query = this.newQuery();
        return query.limit.apply(query, arguments);
    },
    orderBy(field, direction) {
        const query = this.newQuery();
        return query.orderBy.apply(query, arguments);
    },
    orderByAsc(field) {
        const query = this.newQuery();
        return query.orderByAsc.apply(query, arguments);
    },
    orderByDesc(field) {
        const query = this.newQuery();
        return query.orderByDesc.apply(query, arguments);
    },
    where(arg1, arg2, arg3) {
        const query = this.newQuery();
        return query.where.apply(query, arguments);
    },
    whereNot(field, value) {
        const query = this.newQuery();
        return query.whereNot.apply(query, arguments);
    },
    whereIn(field, values) {
        const query = this.newQuery();
        return query.whereIn.apply(query, arguments);
    },
    whereNotIn(field, values) {
        const query = this.newQuery();
        return query.whereNotIn.apply(query, arguments);
    },
    whereNull(field) {
        const query = this.newQuery();
        return query.whereNull.apply(query, arguments);
    },
    whereNotNull(field) {
        const query = this.newQuery();
        return query.whereNotNull.apply(query, arguments);
    },
    whereBetween(field, range) {
        const query = this.newQuery();
        return query.whereBetween.apply(query, arguments);
    },
    whereNotBetween(field, range) {
        const query = this.newQuery();
        return query.whereNotBetween.apply(query, arguments);
    },
    withTrashed() {
        const query = this.newQuery();
        return query.withTrashed.apply(query, arguments);
    },
    onlyTrashed() {
        const query = this.newQuery();
        return query.onlyTrashed.apply(query, arguments);
    },
    first(id) {
        const query = this.newQuery();
        return query.first.apply(query, arguments);
    },
    find(id) {
        const query = this.newQuery();
        return query.find.apply(query, arguments);
    },
    get() {
        const query = this.newQuery();
        return query.get.apply(query, arguments);
    },
    all() {
        const query = this.newQuery();
        return query.all.apply(query, arguments);
    },
    count() {
        const query = this.newQuery();
        return query.count.apply(query, arguments);
    },
    pluck(valueKey, indexKey) {
        const query = this.newQuery();
        return query.pluck.apply(query, arguments);
    },
    findById(id) {
        const query = this.newQuery();
        return query.findById.apply(query, arguments);
    },
    findOrFail(id) {
        const query = this.newQuery();
        return query.findOrFail.apply(query, arguments);
    },
    firstOrFail(id) {
        const query = this.newQuery();
        return query.firstOrFail.apply(query, arguments);
    }
};
