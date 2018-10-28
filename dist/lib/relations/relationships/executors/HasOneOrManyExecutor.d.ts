/// <reference path="../../../definitions/data/IDataCollector.d.ts" />
/// <reference path="../../../definitions/relations/IRelationDataBucket.d.ts" />
/// <reference path="../../../definitions/query-builders/IConditionMatcher.d.ts" />
/// <reference path="../../../definitions/query-builders/IQueryBuilder.d.ts" />
import IDataCollector = NajsEloquent.Data.IDataCollector;
import IConditionMatcher = NajsEloquent.QueryBuilder.IConditionMatcher;
import IQueryBuilder = NajsEloquent.QueryBuilder.IQueryBuilder;
import IRelationDataBucket = NajsEloquent.Relation.IRelationDataBucket;
export declare abstract class HasOneOrManyExecutor<T> {
    protected dataBucket: IRelationDataBucket;
    protected targetModel: IModel;
    protected collector: IDataCollector<any>;
    protected query: IQueryBuilder<any>;
    constructor(dataBucket: IRelationDataBucket, targetModel: IModel);
    setCollector(collector: IDataCollector<any>, conditions: IConditionMatcher<any>[]): this;
    setQuery(query: IQueryBuilder<any>): this;
    abstract executeCollector(): T | undefined | null;
    abstract getEmptyValue(): T | undefined;
    abstract executeQuery(): Promise<T | undefined | null>;
}
