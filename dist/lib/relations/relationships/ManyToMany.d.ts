/// <reference path="../../definitions/model/IModel.d.ts" />
/// <reference path="../../definitions/relations/IRelationship.d.ts" />
import RelationshipFetchType = NajsEloquent.Relation.RelationshipFetchType;
import { Relationship } from '../Relationship';
import { RelationshipType } from '../RelationshipType';
import { PivotModel } from './pivot/PivotModel';
export declare class ManyToMany<T> extends Relationship<T> {
    static className: string;
    protected pivot: ModelDefinition;
    protected pivotModel: PivotModel;
    protected pivotDefinition: typeof PivotModel;
    protected pivotTargetKeyName: string;
    protected pivotRootKeyName: string;
    constructor(root: Model, relationName: string, target: ModelDefinition, pivot: ModelDefinition, pivotTargetKeyName: string, pivotRootKeyName: string, targetKeyName: string, rootKeyName: string);
    getType(): RelationshipType;
    getClassName(): string;
    collectData(): T | undefined | null;
    fetchData(type: RelationshipFetchType): Promise<T | undefined | null>;
    isInverseOf<K>(relation: NajsEloquent.Relation.IRelationship<K>): boolean;
}
