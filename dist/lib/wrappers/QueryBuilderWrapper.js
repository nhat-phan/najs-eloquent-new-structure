"use strict";
/// <reference path="../model/interfaces/IModel.ts" />
/// <reference path="interfaces/IQueryBuilderWrapper.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const FORWARD_FUNCTIONS = [
    'queryName',
    'setLogGroup',
    'getPrimaryKeyName',
    'select',
    'limit',
    'orderBy',
    'orderByAsc',
    'orderByDesc',
    'where',
    'andWhere',
    'orWhere',
    'whereNot',
    'andWhereNot',
    'orWhereNot',
    'whereIn',
    'andWhereIn',
    'orWhereIn',
    'whereNotIn',
    'andWhereNotIn',
    'whereNull',
    'andWhereNull',
    'orWhereNull',
    'whereNotNull',
    'andWhereNotNull',
    'orWhereNotNull',
    'whereBetween',
    'andWhereBetween',
    'orWhereBetween',
    'whereNotBetween',
    'andWhereNotBetween',
    'orWhereNotBetween'
];
class QueryBuilderWrapper {
}
exports.QueryBuilderWrapper = QueryBuilderWrapper;
for (const name of FORWARD_FUNCTIONS) {
    QueryBuilderWrapper.prototype[name] = function () {
        return this['queryBuilder'][name](...arguments);
    };
}
