/// <reference path="../../../definitions/data/IDataCollector.d.ts" />
/// <reference path="../../../definitions/model/IModel.d.ts" />
/// <reference path="../../../definitions/relations/IRelationshipExecutor.d.ts" />
/// <reference path="../../../definitions/relations/IRelationDataBucket.d.ts" />
/// <reference path="../../../definitions/query-builders/IQueryBuilder.d.ts" />
/// <reference path="../../../../../lib/definitions/collect.js/index.d.ts" />
import IModel = NajsEloquent.Model.IModel;
import IQueryBuilder = NajsEloquent.QueryBuilder.IQueryBuilder;
import IDataCollector = NajsEloquent.Data.IDataCollector;
import IRelationDataBucket = NajsEloquent.Relation.IRelationDataBucket;
import Collection = CollectJs.Collection;
export declare class ManyRowsExecutor<T> implements NajsEloquent.Relation.IRelationshipExecutor<Collection<T>> {
    protected dataBucket: IRelationDataBucket;
    protected targetModel: IModel;
    constructor(dataBucket: IRelationDataBucket, targetModel: IModel);
    executeQuery(queryBuilder: IQueryBuilder<T>): Promise<Collection<T> | undefined | null>;
    executeCollector(collector: IDataCollector<any>): Collection<T> | undefined | null;
    getEmptyValue(): Collection<T> | undefined;
}
