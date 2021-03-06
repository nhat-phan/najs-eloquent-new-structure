"use strict";
/// <reference path="contracts/Driver.ts" />
/// <reference path="contracts/DriverProvider.ts" />
/// <reference path="contracts/FactoryBuilder.ts" />
/// <reference path="contracts/FactoryManager.ts" />
/// <reference path="contracts/MemoryDataSource.ts" />
/// <reference path="contracts/MemoryDataSourceProvider.ts" />
/// <reference path="contracts/MomentProvider.ts" />
/// <reference path="contracts/QueryLog.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="definitions/collect.js/index.d.ts" />
/// <reference path="definitions/data/IDataBuffer.ts" />
/// <reference path="definitions/data/IDataCollector.ts" />
/// <reference path="definitions/data/IDataReader.ts" />
/// <reference path="definitions/driver/IExecutor.ts" />
/// <reference path="definitions/driver/IExecutorFactory.ts" />
/// <reference path="definitions/factory/IFactoryDefinition.ts" />
/// <reference path="definitions/features/IEventFeature.ts" />
/// <reference path="definitions/features/IFeature.ts" />
/// <reference path="definitions/features/IFillableFeature.ts" />
/// <reference path="definitions/features/IQueryFeature.ts" />
/// <reference path="definitions/features/IRecordExecutor.ts" />
/// <reference path="definitions/features/IRecordManager.ts" />
/// <reference path="definitions/features/IRelationFeature.ts" />
/// <reference path="definitions/features/ISerializationFeature.ts" />
/// <reference path="definitions/features/ISettingFeature.ts" />
/// <reference path="definitions/features/ISoftDeletesFeature.ts" />
/// <reference path="definitions/features/ITimestampsFeature.ts" />
/// <reference path="definitions/model/IModel.ts" />
/// <reference path="definitions/model/IModelEvent.ts" />
/// <reference path="definitions/model/IModelFillable.ts" />
/// <reference path="definitions/model/IModelRecord.ts" />
/// <reference path="definitions/model/IModelRelation.ts" />
/// <reference path="definitions/model/IModelSerialization.ts" />
/// <reference path="definitions/model/IModelSoftDeletes.ts" />
/// <reference path="definitions/model/IModelTimestamps.ts" />
/// <reference path="definitions/query-builders/IConditionMatcher.ts" />
/// <reference path="definitions/query-builders/IConvention.ts" />
/// <reference path="definitions/query-builders/IQueryBuilder.ts" />
/// <reference path="definitions/query-builders/IQueryBuilderHandler.ts" />
/// <reference path="definitions/query-builders/IQueryBuilderFactory.ts" />
/// <reference path="definitions/query-builders/IQueryExecutor.ts" />
/// <reference path="definitions/query-grammars/IAdvancedQuery.ts" />
/// <reference path="definitions/query-grammars/IBasicConditionQuery.ts" />
/// <reference path="definitions/query-grammars/IBasicQuery.ts" />
/// <reference path="definitions/query-grammars/IConditionQuery.ts" />
/// <reference path="definitions/query-grammars/IExecuteQuery.ts" />
/// <reference path="definitions/query-grammars/IQuery.ts" />
/// <reference path="definitions/relations/IBelongsToRelationship.ts" />
/// <reference path="definitions/relations/IHasOneRelationship.ts" />
/// <reference path="definitions/relations/IHasManyRelationship.ts" />
/// <reference path="definitions/relations/IBelongsToManyRelationship.ts" />
/// <reference path="definitions/relations/IPivotOptions.ts" />
/// <reference path="definitions/relations/IRelationData.ts" />
/// <reference path="definitions/relations/IRelationData.ts" />
/// <reference path="definitions/relations/IRelationDataBucket.ts" />
/// <reference path="definitions/relations/IRelationship.ts" />
/// <reference path="definitions/relations/IRelationshipFactory.ts" />
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
var MomentProviderFacade_1 = require("./facades/global/MomentProviderFacade");
exports.MomentProvider = MomentProviderFacade_1.MomentProvider;
exports.MomentProviderFacade = MomentProviderFacade_1.MomentProviderFacade;
