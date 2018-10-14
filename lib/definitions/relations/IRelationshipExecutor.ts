/// <reference path="../data/IDataCollector.ts" />
/// <reference path="../query-builders/IQueryBuilder.ts" />

namespace NajsEloquent.Relation {
  export interface IRelationshipExecutor<T> {
    executeQuery(queryBuilder: QueryBuilder.IQueryBuilder<any>): Promise<T | undefined | null>

    executeCollector(collector: Data.IDataCollector<any>): T | undefined | null

    getEmptyValue(): T | undefined
  }
}
