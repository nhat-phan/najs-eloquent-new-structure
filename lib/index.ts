/// <reference path="contracts/Driver.ts" />
/// <reference path="contracts/DriverProvider.ts" />
/// <reference path="contracts/MemoryDataSource.ts" />
/// <reference path="contracts/MemoryDataSourceProvider.ts" />
/// <reference path="contracts/QueryLog.ts" />

/// <reference path="definitions/collect.js/index.d.ts" />

/// <reference path="definitions/driver/IExecutor.ts" />
/// <reference path="definitions/driver/IExecutorFactory.ts" />

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
/// <reference path="definitions/model/IModelQuery.ts" />
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

/// <reference path="definitions/relations/IHasOne.ts" />
/// <reference path="definitions/relations/IRelation.ts" />
/// <reference path="definitions/relations/IRelationData.ts" />
/// <reference path="definitions/relations/IRelationDataBucket.ts" />
/// <reference path="definitions/relations/IRelationFactory.ts" />
/// <reference path="definitions/model/IModel.ts" />

import { MemoryDataSourceProvider } from './facades/global/MemoryDataSourceProviderFacade'
import { MemoryDataSource } from './drivers/memory/MemoryDataSource'
import { Model } from './model/Model'
MemoryDataSourceProvider.register(MemoryDataSource, 'memory', true)

export { Model, Model as Eloquent }
export { Builtin as NajsEloquent } from './builtin'

export { EloquentDriverProvider, EloquentDriverProviderFacade } from './facades/global/EloquentDriverProviderFacade'
export { QueryLog, QueryLogFacade } from './facades/global/QueryLogFacade'
export {
  MemoryDataSourceProvider,
  MemoryDataSourceProviderFacade
} from './facades/global/MemoryDataSourceProviderFacade'
