/// <reference path="../../definitions/model/IModel.d.ts" />
/// <reference path="../../definitions/relations/IRelationship.d.ts" />
/// <reference path="../../definitions/data/IDataCollector.d.ts" />
/// <reference path="../../definitions/query-builders/IQueryBuilder.d.ts" />
import Model = NajsEloquent.Model.IModel;
import ModelDefinition = NajsEloquent.Model.ModelDefinition;
import RelationshipFetchType = NajsEloquent.Relation.RelationshipFetchType;
import IRelationshipExecutor = NajsEloquent.Relation.IRelationshipExecutor;
import { Relationship } from '../Relationship';
export declare abstract class MorphOneOrMany<T> extends Relationship<T> {
    protected targetMorphTypeName: string;
    constructor(root: Model, relationName: string, target: ModelDefinition, targetType: string, targetKey: string, rootKey: string);
    abstract getClassName(): string;
    abstract getType(): string;
    abstract getExecutor(): IRelationshipExecutor<T>;
    protected readonly targetMorphType: string;
    collectData(): T | undefined | null;
    fetchData(type: RelationshipFetchType): Promise<T | undefined | null>;
    isInverseOf<K>(relationship: NajsEloquent.Relation.IRelationship<K>): boolean;
}
