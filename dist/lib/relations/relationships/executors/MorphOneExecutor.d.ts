/// <reference path="../../../definitions/data/IDataCollector.d.ts" />
/// <reference path="../../../definitions/relations/IRelationDataBucket.d.ts" />
/// <reference path="../../../definitions/query-builders/IConditionMatcher.d.ts" />
/// <reference path="../../../definitions/query-builders/IQueryBuilder.d.ts" />
import IDataCollector = NajsEloquent.Data.IDataCollector;
import IDataReader = NajsEloquent.Data.IDataReader;
import IConditionMatcher = NajsEloquent.QueryBuilder.IConditionMatcher;
import IQueryBuilder = NajsEloquent.QueryBuilder.IQueryBuilder;
import IRelationDataBucket = NajsEloquent.Relation.IRelationDataBucket;
import { HasOneExecutor } from './HasOneExecutor';
export declare class MorphOneExecutor<T> extends HasOneExecutor<T> {
    protected targetMorphType: string;
    protected targetMorphTypeName: string;
    constructor(dataBucket: IRelationDataBucket, targetModel: IModel, targetMorphTypeName: string);
    setCollector(collector: IDataCollector<any>, conditions: IConditionMatcher<any>[], reader: IDataReader<any>): this;
    setQuery(query: IQueryBuilder<any>): this;
}
