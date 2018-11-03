"use strict";
/// <reference path="contracts/Driver.ts" />
/// <reference path="contracts/DriverProvider.ts" />
/// <reference path="contracts/FactoryBuilder.ts" />
/// <reference path="contracts/FactoryManager.ts" />
/// <reference path="contracts/MemoryDataSource.ts" />
/// <reference path="contracts/MemoryDataSourceProvider.ts" />
/// <reference path="contracts/QueryLog.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const MemoryDataSourceProviderFacade_1 = require("./facades/global/MemoryDataSourceProviderFacade");
const MemoryDataSource_1 = require("./drivers/memory/MemoryDataSource");
const Model_1 = require("./model/Model");
exports.Model = Model_1.Model;
exports.Eloquent = Model_1.Model;
const Relationship_1 = require("./relations/Relationship");
const DriverProviderFacade_1 = require("./facades/global/DriverProviderFacade");
const MemoryDriver_1 = require("./drivers/memory/MemoryDriver");
MemoryDataSourceProviderFacade_1.MemoryDataSourceProvider.register(MemoryDataSource_1.MemoryDataSource, 'memory', true);
DriverProviderFacade_1.DriverProvider.register(MemoryDriver_1.MemoryDriver, 'memory');
exports.Relation = Relationship_1.Relationship;
var PivotModel_1 = require("./relations/relationships/pivot/PivotModel");
exports.Pivot = PivotModel_1.PivotModel;
var helpers_1 = require("./util/helpers");
exports.isModel = helpers_1.isModel;
exports.isCollection = helpers_1.isCollection;
exports.isObjectId = helpers_1.isObjectId;
var builtin_1 = require("./builtin");
exports.NajsEloquent = builtin_1.Builtin;
var DriverProviderFacade_2 = require("./facades/global/DriverProviderFacade");
exports.DriverProvider = DriverProviderFacade_2.DriverProvider;
exports.ModelDriverProvider = DriverProviderFacade_2.DriverProvider;
exports.EloquentDriverProvider = DriverProviderFacade_2.DriverProvider;
exports.DriverProviderFacade = DriverProviderFacade_2.DriverProviderFacade;
exports.ModelDriverProviderFacade = DriverProviderFacade_2.DriverProviderFacade;
exports.EloquentDriverProviderFacade = DriverProviderFacade_2.DriverProviderFacade;
var FactoryFacade_1 = require("./facades/global/FactoryFacade");
exports.factory = FactoryFacade_1.factory;
exports.Factory = FactoryFacade_1.Factory;
exports.FactoryFacade = FactoryFacade_1.FactoryFacade;
var QueryLogFacade_1 = require("./facades/global/QueryLogFacade");
exports.QueryLog = QueryLogFacade_1.QueryLog;
exports.QueryLogFacade = QueryLogFacade_1.QueryLogFacade;
var MemoryDataSourceProviderFacade_2 = require("./facades/global/MemoryDataSourceProviderFacade");
exports.MemoryDataSourceProvider = MemoryDataSourceProviderFacade_2.MemoryDataSourceProvider;
exports.MemoryDataSourceProviderFacade = MemoryDataSourceProviderFacade_2.MemoryDataSourceProviderFacade;
