"use strict";
/// <reference path="../../contracts/Component.ts" />
/// <reference path="../interfaces/IModel.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../constants");
const FORWARD_TO_QUERY_BUILDERS = [
    'queryName',
    'select',
    'limit',
    'orderBy',
    'orderByAsc',
    'orderByDesc',
    'where',
    'whereNot',
    'whereIn',
    'whereNotIn',
    'whereNull',
    'whereNotNull',
    'whereBetween',
    'whereNotBetween',
    'withTrashed',
    'onlyTrashed',
    'first',
    'find',
    'get',
    'count',
    'pluck',
    'findById',
    'findOrFail',
    'firstOrFail'
];
class ModelQuery {
    getClassName() {
        return constants_1.NajsEloquent.Model.Component.ModelQuery;
    }
    extend(prototype, bases, driver) {
        prototype['newQuery'] = ModelQuery.newQuery;
        for (const name of FORWARD_TO_QUERY_BUILDERS) {
            prototype[name] = ModelQuery.forwardToQueryBuilder(name);
        }
    }
    static newQuery() {
        return this['driver'].newQuery();
    }
    static forwardToQueryBuilder(name) {
        return function () {
            return this['driver'].newQuery()[name](...arguments);
        };
    }
}
exports.ModelQuery = ModelQuery;
