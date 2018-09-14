"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions_1 = require("./util/functions");
exports.NajsEloquent = {
    Driver: {
        DummyDriver: 'NajsEloquent.Driver.DummyDriver',
        MongodbDriver: 'NajsEloquent.Driver.MongodbDriver',
        MongooseDriver: 'NajsEloquent.Driver.MongooseDriver',
        Memory: {
            MemoryDataSource: 'NajsEloquent.Driver.Memory.MemoryDataSource',
            MemoryExecutorFactory: 'NajsEloquent.Driver.Memory.MemoryExecutorFactory',
            RecordFilter: 'NajsEloquent.Driver.Memory.RecordFilter',
            RecordConditionMatcherFactory: 'NajsEloquent.Driver.Memory.RecordConditionMatcherFactory'
        },
        Mongodb: {
            MongodbExecutorFactory: 'NajsEloquent.Driver.Mongodb.MongodbExecutorFactory',
            MongodbConditionMatcherFactory: 'NajsEloquent.Driver.Mongodb.MongodbConditionMatcherFactory'
        },
        Mongoose: {
            MongooseDocumentManager: 'NajsEloquent.Driver.Mongoose.MongooseDocumentManager',
            MongooseExecutorFactory: 'NajsEloquent.Driver.Mongoose.MongooseExecutorFactory'
        },
        Knex: {
            KnexWrapper: 'NajsEloquent.Driver.Knex.KnexWrapper'
        }
    },
    Feature: {
        RecordManager: 'NajsEloquent.Feature.RecordManager',
        SettingFeature: 'NajsEloquent.Feature.SettingFeature',
        EventFeature: 'NajsEloquent.Feature.EventFeature',
        FillableFeature: 'NajsEloquent.Feature.FillableFeature',
        SerializationFeature: 'NajsEloquent.Feature.SerializationFeature',
        TimestampsFeature: 'NajsEloquent.Feature.TimestampsFeature',
        SoftDeletesFeature: 'NajsEloquent.Feature.SoftDeletesFeature',
        RelationFeature: 'NajsEloquent.Feature.RelationFeature'
    },
    Provider: {
        DriverProvider: 'NajsEloquent.Provider.DriverProvider',
        MongodbProvider: 'NajsEloquent.Provider.MongodbProvider',
        MongooseProvider: 'NajsEloquent.Provider.MongooseProvider',
        KnexProvider: 'NajsEloquent.Provider.KnexProvider'
    },
    QueryBuilder: {
        MongodbConditionConverter: 'NajsEloquent.QueryBuilder.MongodbConditionConverter'
    },
    QueryLog: {
        FlipFlopQueryLog: 'NajsEloquent.QueryLog.FlipFlopQueryLog'
    },
    Relation: {
        RelationDataBucket: 'NajsEloquent.Relation.RelationDataBucket',
        HasOneRelation: 'NajsEloquent.Relation.HasOneRelation'
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
