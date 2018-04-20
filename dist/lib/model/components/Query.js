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
    'count'
];
class Query {
    getClassName() {
        return constants_1.NajsEloquent.Model.Component.Fillable;
    }
    extend(prototype, bases, driver) {
        prototype['newQuery'] = Query.newQuery;
        for (const name of FORWARD_TO_QUERY_BUILDERS) {
            prototype[name] = Query.forwardToQueryBuilder(name);
        }
        prototype['first'] = Query.first;
        prototype['find'] = Query.first;
        prototype['get'] = Query.get;
        prototype['all'] = Query.get;
    }
    static newQuery() {
        return this['driver'].newQuery();
    }
    static forwardToQueryBuilder(name) {
        return function () {
            return this['driver'].newQuery()[name](...arguments);
        };
    }
    static async first() {
        return this['driver'].newQuery().first();
    }
    static async get() {
        return await this['driver'].newQuery().get();
    }
}
exports.Query = Query;
