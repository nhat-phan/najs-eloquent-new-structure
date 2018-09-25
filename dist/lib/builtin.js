"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// package: Driver
const DriverBase_1 = require("./drivers/DriverBase");
const QueryLogBase_1 = require("./drivers/QueryLogBase");
const ExecutorBase_1 = require("./drivers/ExecutorBase");
const Record_1 = require("./drivers/Record");
const RecordCollector_1 = require("./drivers/RecordCollector");
const RecordConditionMatcher_1 = require("./drivers/RecordConditionMatcher");
const RecordConditionMatcherFactory_1 = require("./drivers/RecordConditionMatcherFactory");
const RecordDataSourceBase_1 = require("./drivers/RecordDataSourceBase");
const RecordExecutorBase_1 = require("./drivers/RecordExecutorBase");
const RecordManager_1 = require("./drivers/RecordManager");
const RecordManagerBase_1 = require("./drivers/RecordManagerBase");
// package: Driver/Memory
const MemoryDataSource_1 = require("./drivers/memory/MemoryDataSource");
const MemoryDriver_1 = require("./drivers/memory/MemoryDriver");
const MemoryExecutorFactory_1 = require("./drivers/memory/MemoryExecutorFactory");
const MemoryQueryBuilder_1 = require("./drivers/memory/MemoryQueryBuilder");
const MemoryQueryBuilderHandler_1 = require("./drivers/memory/MemoryQueryBuilderHandler");
const MemoryQueryExecutor_1 = require("./drivers/memory/MemoryQueryExecutor");
const MemoryQueryLog_1 = require("./drivers/memory/MemoryQueryLog");
const MemoryRecordExecutor_1 = require("./drivers/memory/MemoryRecordExecutor");
// package: Error
const NotFoundError_1 = require("./errors/NotFoundError");
const RelationNotDefinedError_1 = require("./errors/RelationNotDefinedError");
// package: Feature
const EventFeature_1 = require("./features/EventFeature");
const FeatureBase_1 = require("./features/FeatureBase");
const FillableFeature_1 = require("./features/FillableFeature");
const RelationFeature_1 = require("./features/RelationFeature");
const SerializationFeature_1 = require("./features/SerializationFeature");
const SettingFeature_1 = require("./features/SettingFeature");
const SoftDeletesFeature_1 = require("./features/SoftDeletesFeature");
const TimestampsFeature_1 = require("./features/TimestampsFeature");
// package: Feature/Mixin
const EventPublicApi_1 = require("./features/mixin/EventPublicApi");
const FillablePublicApi_1 = require("./features/mixin/FillablePublicApi");
const RecordManagerPublicApi_1 = require("./features/mixin/RecordManagerPublicApi");
const RelationPublicApi_1 = require("./features/mixin/RelationPublicApi");
const SerializationPublicApi_1 = require("./features/mixin/SerializationPublicApi");
const SoftDeletesPublicApi_1 = require("./features/mixin/SoftDeletesPublicApi");
const TimestampsPublicApi_1 = require("./features/mixin/TimestampsPublicApi");
// package Provider
const DriverProvider_1 = require("./providers/DriverProvider");
const MemoryDataSourceProvider_1 = require("./providers/MemoryDataSourceProvider");
// package QueryBuilder
const QueryBuilder_1 = require("./query-builders/QueryBuilder");
const QueryBuilderHandlerBase_1 = require("./query-builders/QueryBuilderHandlerBase");
// package QueryBuilder/Mixin
const AdvancedQuery_1 = require("./query-builders/mixin/AdvancedQuery");
const ConditionQuery_1 = require("./query-builders/mixin/ConditionQuery");
const ExecuteQuery_1 = require("./query-builders/mixin/ExecuteQuery");
const Query_1 = require("./query-builders/mixin/Query");
// package QueryBuilder/Shared
const BasicQuery_1 = require("./query-builders/shared/BasicQuery");
const BasicQueryConverter_1 = require("./query-builders/shared/BasicQueryConverter");
const ConditionQueryHandler_1 = require("./query-builders/shared/ConditionQueryHandler");
const DefaultConvention_1 = require("./query-builders/shared/DefaultConvention");
const ExecutorUtils_1 = require("./query-builders/shared/ExecutorUtils");
const Operator_1 = require("./query-builders/shared/Operator");
const QueryCondition_1 = require("./query-builders/shared/QueryCondition");
// package QueryLog
const FlipFlopQueryLog_1 = require("./query-log/FlipFlopQueryLog");
// package Relation
const Relation_1 = require("./relations/Relation");
const RelationData_1 = require("./relations/RelationData");
const RelationDataBucket_1 = require("./relations/RelationDataBucket");
const RelationDefinitionFinder_1 = require("./relations/RelationDefinitionFinder");
const RelationFactory_1 = require("./relations/RelationFactory");
const RelationUtilities_1 = require("./relations/RelationUtilities");
const HasOneRelation_1 = require("./relations/basic/HasOneRelation");
exports.Builtin = {
    Driver: {
        DriverBase: DriverBase_1.DriverBase,
        ExecutorBase: ExecutorBase_1.ExecutorBase,
        QueryLogBase: QueryLogBase_1.QueryLogBase,
        Record: Record_1.Record,
        RecordCollector: RecordCollector_1.RecordCollector,
        RecordConditionMatcher: RecordConditionMatcher_1.RecordConditionMatcher,
        RecordConditionMatcherFactory: RecordConditionMatcherFactory_1.RecordConditionMatcherFactory,
        RecordDataSourceBase: RecordDataSourceBase_1.RecordDataSourceBase,
        RecordExecutorBase: RecordExecutorBase_1.RecordExecutorBase,
        RecordManager: RecordManager_1.RecordManager,
        RecordManagerBase: RecordManagerBase_1.RecordManagerBase,
        Memory: {
            MemoryDataSource: MemoryDataSource_1.MemoryDataSource,
            MemoryDriver: MemoryDriver_1.MemoryDriver,
            MemoryExecutorFactory: MemoryExecutorFactory_1.MemoryExecutorFactory,
            MemoryQueryBuilder: MemoryQueryBuilder_1.MemoryQueryBuilder,
            MemoryQueryBuilderHandler: MemoryQueryBuilderHandler_1.MemoryQueryBuilderHandler,
            MemoryQueryExecutor: MemoryQueryExecutor_1.MemoryQueryExecutor,
            MemoryQueryLog: MemoryQueryLog_1.MemoryQueryLog,
            MemoryRecordExecutor: MemoryRecordExecutor_1.MemoryRecordExecutor
        }
    },
    Error: {
        NotFoundError: NotFoundError_1.NotFoundError,
        RelationNotDefinedError: RelationNotDefinedError_1.RelationNotDefinedError
    },
    Feature: {
        EventFeature: EventFeature_1.EventFeature,
        FeatureBase: FeatureBase_1.FeatureBase,
        FillableFeature: FillableFeature_1.FillableFeature,
        RelationFeature: RelationFeature_1.RelationFeature,
        SerializationFeature: SerializationFeature_1.SerializationFeature,
        SettingFeature: SettingFeature_1.SettingFeature,
        SoftDeletesFeature: SoftDeletesFeature_1.SoftDeletesFeature,
        TimestampsFeature: TimestampsFeature_1.TimestampsFeature,
        Mixin: {
            EventPublicApi: EventPublicApi_1.EventPublicApi,
            FillablePublicApi: FillablePublicApi_1.FillablePublicApi,
            RecordManagerPublicApi: RecordManagerPublicApi_1.RecordManagerPublicApi,
            RelationPublicApi: RelationPublicApi_1.RelationPublicApi,
            SerializationPublicApi: SerializationPublicApi_1.SerializationPublicApi,
            SoftDeletesPublicApi: SoftDeletesPublicApi_1.SoftDeletesPublicApi,
            TimestampsPublicApi: TimestampsPublicApi_1.TimestampsPublicApi
        }
    },
    Provider: {
        DriverProvider: DriverProvider_1.DriverProvider,
        MemoryDataSourceProvider: MemoryDataSourceProvider_1.MemoryDataSourceProvider
    },
    QueryBuilder: {
        QueryBuilder: QueryBuilder_1.QueryBuilder,
        QueryBuilderHandlerBase: QueryBuilderHandlerBase_1.QueryBuilderHandlerBase,
        Mixin: {
            AdvancedQuery: AdvancedQuery_1.AdvancedQuery,
            ConditionQuery: ConditionQuery_1.ConditionQuery,
            ExecuteQuery: ExecuteQuery_1.ExecuteQuery,
            Query: Query_1.Query
        },
        Shared: {
            BasicQuery: BasicQuery_1.BasicQuery,
            BasicQueryConverter: BasicQueryConverter_1.BasicQueryConverter,
            ConditionQueryHandler: ConditionQueryHandler_1.ConditionQueryHandler,
            DefaultConvention: DefaultConvention_1.DefaultConvention,
            ExecutorUtils: ExecutorUtils_1.ExecutorUtils,
            Operator: Operator_1.Operator,
            QueryCondition: QueryCondition_1.QueryCondition
        }
    },
    QueryLog: {
        FlipFlopQueryLog: FlipFlopQueryLog_1.FlipFlopQueryLog
    },
    Relation: {
        Relation: Relation_1.Relation,
        RelationData: RelationData_1.RelationData,
        RelationDataBucket: RelationDataBucket_1.RelationDataBucket,
        RelationDefinitionFinder: RelationDefinitionFinder_1.RelationDefinitionFinder,
        RelationFactory: RelationFactory_1.RelationFactory,
        RelationUtilities: RelationUtilities_1.RelationUtilities,
        HasOneRelation: HasOneRelation_1.HasOneRelation
    }
};
