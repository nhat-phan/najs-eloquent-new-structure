"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions_1 = require("./util/functions");
exports.NajsEloquent = {
    Driver: {
        DummyDriver: 'NajsEloquent.Driver.DummyDriver'
    },
    Feature: {
        FillableFeature: 'NajsEloquent.Feature.FillableFeature',
        SettingFeature: 'NajsEloquent.Feature.SettingFeature'
    },
    Provider: {
        DriverProvider: 'NajsEloquent.Provider.DriverProvider'
    }
};
exports.QueryFunctions = {
    BasicQuery: [
        'queryName',
        'setLogGroup',
        'getPrimaryKeyName',
        'select',
        'limit',
        'orderBy',
        'orderByAsc',
        'orderByDesc'
    ],
    ConditionQuery: [
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
        'orWhereNotIn',
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
    ],
    SoftDeleteQuery: ['withTrashed', 'onlyTrashed'],
    FetchResultQuery: ['get', 'first', 'count', 'update', 'delete', 'restore', 'execute'],
    AdvancedQuery: ['first', 'find', 'get', 'all', 'count', 'pluck', 'findById', 'findOrFail', 'firstOrFail']
};
exports.StartQueryFunctions = functions_1.array_unique(exports.QueryFunctions.AdvancedQuery, exports.QueryFunctions.SoftDeleteQuery, exports.QueryFunctions.FetchResultQuery.filter(name => ['update', 'delete', 'restore', 'execute'].indexOf(name) === -1), exports.QueryFunctions.BasicQuery.filter(name => name !== 'getPrimaryKeyName'), exports.QueryFunctions.ConditionQuery.filter(name => name.indexOf('where') === 0));
