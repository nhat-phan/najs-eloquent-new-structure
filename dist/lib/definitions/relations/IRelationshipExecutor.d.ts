/// <reference path="../data/IDataCollector.d.ts" />
/// <reference path="../query-builders/IQueryBuilder.d.ts" />
declare namespace NajsEloquent.Relation {
    interface IRelationshipExecutor<T> {
        executeQuery(queryBuilder: QueryBuilder.IQueryBuilder<any>): Promise<T | undefined | null>;
        executeCollector(collector: Data.IDataCollector<any>): T | undefined | null;
        getEmptyValue(): T | undefined;
    }
}
