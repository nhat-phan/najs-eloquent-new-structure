"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NajsEloquent = {
    Driver: {
        DummyDriver: 'NajsEloquent.Driver.DummyDriver',
        MongooseDriver: 'NajsEloquent.Driver.MongooseDriver',
        KnexDriver: 'NajsEloquent.Driver.KnexDriver'
    },
    Model: {
        Component: {
            Attribute: 'NajsEloquent.Model.Component.Attribute',
            DynamicAttribute: 'NajsEloquent.Model.Component.DynamicAttribute',
            Fillable: 'NajsEloquent.Model.Component.Fillable',
            Timestamps: 'NajsEloquent.Model.Component.Timestamps',
            Serialization: 'NajsEloquent.Model.Component.Serialization',
            SoftDeletes: 'NajsEloquent.Model.Component.SoftDeletes'
        }
    },
    QueryBuilder: {
        MongooseQueryBuilder: 'NajsEloquent.QueryBuilder.Mongodb.MongooseQueryBuilder',
        MongodbConditionConverter: 'NajsEloquent.QueryBuilder.Mongodb.MongodbConditionConverter',
        MongooseQueryLog: 'NajsEloquent.QueryBuilder.Mongodb.MongooseQueryLog'
    },
    Database: {
        Seeder: 'NajsEloquent.Database.Seeder'
    },
    QueryLog: {
        FlipFlopQueryLog: 'NajsEloquent.QueryLog.FlipFlopQueryLog'
    },
    Provider: {
        ComponentProvider: 'NajsEloquent.Provider.ComponentProvider',
        DriverProvider: 'NajsEloquent.Provider.DriverProvider',
        MongooseProvider: 'NajsEloquent.Provider.MongooseProvider'
    }
};
