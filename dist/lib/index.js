"use strict";
/// <reference path="collect.js/index.d.ts" />
/// <reference path="contracts/Driver.ts" />
/// <reference path="contracts/DriverProvider.ts" />
/// <reference path="contracts/Component.ts" />
/// <reference path="contracts/ComponentProvider.ts" />
/// <reference path="contracts/QueryLog.ts" />
/// <reference path="contracts/MongooseProvider.ts" />
/// <reference path="model/interfaces/IModel.ts" />
/// <reference path="model/interfaces/IModelQuery.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const container_1 = require("./facades/container");
const ModelAttribute_1 = require("./model/components/ModelAttribute");
const ModelFillable_1 = require("./model/components/ModelFillable");
const ModelSerialization_1 = require("./model/components/ModelSerialization");
const ModelQuery_1 = require("./model/components/ModelQuery");
const DynamicAttribute_1 = require("./model/components/DynamicAttribute");
const DriverProvider_1 = require("./providers/DriverProvider");
const ComponentProvider_1 = require("./providers/ComponentProvider");
const MongooseProvider_1 = require("./providers/MongooseProvider");
const EloquentDriverProviderFacade_1 = require("./facades/global/EloquentDriverProviderFacade");
const MongooseDriver_1 = require("./drivers/MongooseDriver");
var QueryLogFacade_1 = require("./facades/global/QueryLogFacade");
exports.QueryLogFacade = QueryLogFacade_1.QueryLogFacade;
exports.QueryLog = QueryLogFacade_1.QueryLog;
var EloquentDriverProviderFacade_2 = require("./facades/global/EloquentDriverProviderFacade");
exports.EloquentDriverProviderFacade = EloquentDriverProviderFacade_2.EloquentDriverProviderFacade;
exports.EloquentDriverProvider = EloquentDriverProviderFacade_2.EloquentDriverProvider;
var EloquentComponentProviderFacade_1 = require("./facades/global/EloquentComponentProviderFacade");
exports.EloquentComponentProviderFacade = EloquentComponentProviderFacade_1.EloquentComponentProviderFacade;
exports.EloquentComponentProvider = EloquentComponentProviderFacade_1.EloquentComponentProvider;
var MongooseProviderFacade_1 = require("./facades/global/MongooseProviderFacade");
exports.MongooseProviderFacade = MongooseProviderFacade_1.MongooseProviderFacade;
exports.MongooseProvider = MongooseProviderFacade_1.MongooseProvider;
var FactoryFacade_1 = require("./facades/global/FactoryFacade");
exports.FactoryFacade = FactoryFacade_1.FactoryFacade;
exports.Factory = FactoryFacade_1.Factory;
exports.factory = FactoryFacade_1.factory;
var Model_1 = require("./model/Model");
exports.Model = Model_1.Model;
var Eloquent_1 = require("./model/Eloquent");
exports.Eloquent = Eloquent_1.Eloquent;
var EloquentMongoose_1 = require("./model/EloquentMongoose");
exports.EloquentMongoose = EloquentMongoose_1.EloquentMongoose;
var DummyDriver_1 = require("./drivers/DummyDriver");
exports.DummyDriver = DummyDriver_1.DummyDriver;
var MongooseDriver_2 = require("./drivers/MongooseDriver");
exports.MongooseDriver = MongooseDriver_2.MongooseDriver;
EloquentDriverProviderFacade_1.EloquentDriverProvider.register(MongooseDriver_1.MongooseDriver, 'mongoose', true);
exports.NajsEloquent = {
    FacadeContainer: container_1.container,
    Model: {
        Component: {
            ModelAttribute: ModelAttribute_1.ModelAttribute,
            ModelFillable: ModelFillable_1.ModelFillable,
            ModelSerialization: ModelSerialization_1.ModelSerialization,
            ModelQuery: ModelQuery_1.ModelQuery,
            DynamicAttribute: DynamicAttribute_1.DynamicAttribute
        }
    },
    Provider: {
        DriverProvider: DriverProvider_1.DriverProvider,
        ComponentProvider: ComponentProvider_1.ComponentProvider,
        MongooseProvider: MongooseProvider_1.MongooseProvider
    }
};
