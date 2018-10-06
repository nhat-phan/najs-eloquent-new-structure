/// <reference path="../../definitions/model/IModel.d.ts" />
/// <reference path="../../definitions/relations/IRelationship.d.ts" />
import RelationshipFetchType = NajsEloquent.Relation.RelationshipFetchType;
import { Relationship } from '../Relationship';
import { RelationshipType } from '../RelationshipType';
import { PivotModel } from './pivot/PivotModel';
export declare class ManyToMany<T> extends Relationship<T> {
    static className: string;
    protected pivotModel: PivotModel;
    protected pivotDefinition: typeof PivotModel;
    protected pivotTargetKeyName: string;
    protected pivotRootKeyName: string;
    getType(): RelationshipType;
    getClassName(): string;
    collectData(): T | undefined | null;
    fetchData(type: RelationshipFetchType): Promise<T | undefined | null>;
    isInverseOf<K>(relation: NajsEloquent.Relation.IRelationship<K>): boolean;
}
