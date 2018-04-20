/// <reference path="IModelQueryHelper.d.ts" />
/// <reference path="../../query-builders/interfaces/IQueryBuilder.d.ts" />
/// <reference path="../../query-builders/interfaces/IFetchResultQuery.d.ts" />
/// <reference path="../../../../lib/collect.js/index.d.ts" />
declare namespace NajsEloquent.Model {
    class IQueryBuilderWrapper<T> {
        protected queryBuilder: NajsEloquent.QueryBuilder.IQueryBuilder & NajsEloquent.QueryBuilder.IFetchResultQuery<T>;
    }
    interface IQueryBuilderWrapper<T> extends NajsEloquent.QueryBuilder.IQueryBuilder, IModelQueryHelper<T> {
        /**
         * Execute query and returns the first record.
         */
        first(): Promise<(IModel<T> & T) | null>;
        /**
         * Execute query and return the records as a Collection.
         */
        get(): Promise<CollectJs.Collection<IModel<T> & T>>;
        /**
         * Execute query and returns count of records.
         */
        count(): Promise<number>;
    }
}
