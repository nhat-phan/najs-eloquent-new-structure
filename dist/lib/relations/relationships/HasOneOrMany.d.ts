/// <reference path="../../definitions/model/IModel.d.ts" />
/// <reference path="../../definitions/relations/IRelation.d.ts" />
/// <reference path="../../definitions/data/IDataCollector.d.ts" />
/// <reference path="../../definitions/query-builders/IQueryBuilder.d.ts" />
import Model = NajsEloquent.Model.IModel;
import ModelDefinition = NajsEloquent.Model.ModelDefinition;
import RelationFetchType = NajsEloquent.Relation.RelationFetchType;
import IQueryBuilder = NajsEloquent.QueryBuilder.IQueryBuilder;
import IDataCollector = NajsEloquent.Data.IDataCollector;
import { Relation } from '../Relation';
export declare abstract class HasOneOrMany<T> extends Relation<T> {
    protected rootKeyName: string;
    private targetModelInstance;
    protected targetDefinition: ModelDefinition;
    protected targetKeyName: string;
    constructor(root: Model, relationName: string, target: ModelDefinition, targetKey: string, rootKey: string);
    protected readonly targetModel: Model;
    abstract getClassName(): string;
    abstract getType(): string;
    abstract executeQuery(queryBuilder: IQueryBuilder<any>): Promise<T | undefined | null>;
    abstract executeCollector(collector: IDataCollector<any>): T | undefined | null;
    abstract getEmptyValue(): T | undefined;
    getQueryBuilder(name: string | undefined): IQueryBuilder<any>;
    collectData(): T | undefined | null;
    fetchData(type: RelationFetchType): Promise<T | undefined | null>;
    isInverseOf<K>(relation: NajsEloquent.Relation.IRelation<K>): boolean;
}
