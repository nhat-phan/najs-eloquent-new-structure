/// <reference path="../model/IModel.d.ts" />
/// <reference path="../query-builders/IQueryBuilderHandler.d.ts" />
declare namespace NajsEloquent.Driver {
    interface IExecutorFactory<T> {
        makeRecordExecutor(model: Model.ModelInternal, record: T): Feature.IRecordExecutor<T>;
        makeQueryExecutor(handler: QueryBuilder.IQueryBuilderHandler): QueryBuilder.IQueryExecutor;
    }
}
