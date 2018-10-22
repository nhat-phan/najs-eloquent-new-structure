/// <reference path="../../definitions/model/IModel.d.ts" />
/// <reference path="../../definitions/relations/IRelationship.d.ts" />
/// <reference path="../../definitions/relations/IManyToManyRelationship.d.ts" />
import Model = NajsEloquent.Model.IModel;
import ModelDefinition = NajsEloquent.Model.ModelDefinition;
import RelationshipFetchType = NajsEloquent.Relation.RelationshipFetchType;
import IManyToManyRelationship = NajsEloquent.Relation.IManyToManyRelationship;
import IQueryBuilder = NajsEloquent.QueryBuilder.IQueryBuilder;
import { Relationship } from '../Relationship';
import { RelationshipType } from '../RelationshipType';
import { PivotModel } from './pivot/PivotModel';
export declare class ManyToMany<T extends Model> extends Relationship<T> implements IManyToManyRelationship<T> {
    static className: string;
    protected pivot: ModelDefinition;
    protected pivotModelInstance: Model;
    protected pivotDefinition: typeof PivotModel;
    protected pivotTargetKeyName: string;
    protected pivotRootKeyName: string;
    constructor(root: Model, relationName: string, target: ModelDefinition, pivot: ModelDefinition, pivotTargetKeyName: string, pivotRootKeyName: string, targetKeyName: string, rootKeyName: string);
    getType(): RelationshipType;
    getClassName(): string;
    protected readonly pivotModel: Model;
    collectData(): T | undefined | null;
    fetchData(type: RelationshipFetchType): Promise<T | undefined | null>;
    isInverseOf<K>(relation: NajsEloquent.Relation.IRelationship<K>): boolean;
    newPivot(data?: object, isGuarded?: boolean): Model;
    newPivotQuery(name?: string): IQueryBuilder<Model>;
    attach(id: string): Promise<this>;
    attachByTargetId(targetId: string): Promise<any> | undefined;
}
