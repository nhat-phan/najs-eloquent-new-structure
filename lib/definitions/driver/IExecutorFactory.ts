/// <reference path="../model/IModel.ts" />
/// <reference path="../query-builders/IQueryBuilderHandler.ts" />

namespace NajsEloquent.Driver {
  export interface IExecutorFactory<T> {
    makeRecordExecutor(model: Model.ModelInternal, record: T): Feature.IRecordExecutor<T>

    makeQueryExecutor(handler: QueryBuilder.IQueryBuilderHandler): QueryBuilder.IQueryExecutor
  }
}
