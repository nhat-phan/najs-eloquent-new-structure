/// <reference path="./IModelQueryHelper.ts" />
/// <reference path="../../query-builders/interfaces/IQueryBuilder.ts" />
/// <reference path="../../query-builders/interfaces/IFetchResultQuery.ts" />
/// <reference path="../../collect.js/index.d.ts" />

namespace NajsEloquent.Model {
  export class IQueryBuilderWrapper<T> {
    protected queryBuilder: NajsEloquent.QueryBuilder.IQueryBuilder & NajsEloquent.QueryBuilder.IFetchResultQuery<T>
  }
  export interface IQueryBuilderWrapper<T> extends NajsEloquent.QueryBuilder.IQueryBuilder, IModelQueryHelper<T> {
    /**
     * Execute query and returns the first record.
     */
    first(): Promise<(IModel<T> & T) | null>

    /**
     * Execute query and return the records as a Collection.
     */
    get(): Promise<CollectJs.Collection<IModel<T> & T>>

    /**
     * Execute query and returns count of records.
     */
    count(): Promise<number>
  }
}
