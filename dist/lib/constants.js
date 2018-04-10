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
            Fillable: 'NajsEloquent.Model.Component.Fillable',
            Timestamps: 'NajsEloquent.Model.Component.Timestamps',
            Serialization: 'NajsEloquent.Model.Component.Serialization',
            SoftDeletes: 'NajsEloquent.Model.Component.SoftDeletes'
        }
    },
    QueryBuilder: {},
    Database: {
        Seeder: 'NajsEloquent.Database.Seeder'
    },
    Log: {
        FlipFlopQueryLog: 'NajsEloquent.Log.FlipFlopQueryLog'
    },
    Provider: {
        EloquentDriverProvider: 'NajsEloquent.Provider.EloquentDriverProvider',
        MongooseProvider: 'NajsEloquent.Provider.MongooseProvider'
    }
};
