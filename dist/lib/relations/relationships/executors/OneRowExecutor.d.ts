/// <reference path="../../../definitions/data/IDataCollector.d.ts" />
/// <reference path="../../../definitions/model/IModel.d.ts" />
/// <reference path="../../../definitions/relations/IRelationshipExecutor.d.ts" />
/// <reference path="../../../definitions/relations/IRelationDataBucket.d.ts" />
/// <reference path="../../../definitions/query-builders/IQueryBuilder.d.ts" />
import IModel = NajsEloquent.Model.IModel;
import IQueryBuilder = NajsEloquent.QueryBuilder.IQueryBuilder;
import IDataCollector = NajsEloquent.Data.IDataCollector;
import IRelationDataBucket = NajsEloquent.Relation.IRelationDataBucket;
export declare class OneRowExecutor<T> implements NajsEloquent.Relation.IRelationshipExecutor<T> {
    protected dataBucket: IRelationDataBucket;
    protected targetModel: IModel;
    constructor(dataBucket: IRelationDataBucket, targetModel: IModel);
    executeQuery(queryBuilder: IQueryBuilder<T>): Promise<T | undefined | null>;
    executeCollector(collector: IDataCollector<any>): T | undefined | null;
    getEmptyValue(): T | undefined;
}
