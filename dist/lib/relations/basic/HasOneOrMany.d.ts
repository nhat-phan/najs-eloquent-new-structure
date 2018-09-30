/// <reference path="../../definitions/model/IModel.d.ts" />
/// <reference path="../../definitions/relations/IRelation.d.ts" />
/// <reference path="../../definitions/query-builders/IQueryBuilder.d.ts" />
import Model = NajsEloquent.Model.IModel;
import ModelDefinition = NajsEloquent.Model.ModelDefinition;
import RelationFetchType = NajsEloquent.Relation.RelationFetchType;
import { Relation } from '../Relation';
export declare abstract class HasOneOrMany<T> extends Relation<T> {
    protected rootKeyName: string;
    private targetModelInstance;
    protected targetDefinition: ModelDefinition;
    protected targetKeyName: string;
    protected is1v1: boolean;
    constructor(root: Model, relationName: string, target: ModelDefinition, targetKey: string, rootKey: string, is1v1: boolean);
    protected readonly targetModel: Model;
    abstract getClassName(): string;
    abstract getType(): string;
    abstract executeQuery(): T | undefined | null;
    getQueryBuilder(name: string | undefined): NajsEloquent.QueryBuilder.IQueryBuilder<Model>;
    collectData(): T | undefined | null;
    fetchData(type: RelationFetchType): Promise<T | undefined | null>;
    isInverseOf<K>(relation: NajsEloquent.Relation.IRelation<K>): boolean;
}
