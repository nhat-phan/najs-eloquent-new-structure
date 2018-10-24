/// <reference path="../../../../lib/definitions/collect.js/index.d.ts" />
/// <reference path="../../definitions/model/IModel.d.ts" />
/// <reference path="../../definitions/relations/IRelationship.d.ts" />
/// <reference path="../../definitions/relations/IManyToManyRelationship.d.ts" />
import Model = NajsEloquent.Model.IModel;
import ModelDefinition = NajsEloquent.Model.ModelDefinition;
import RelationshipFetchType = NajsEloquent.Relation.RelationshipFetchType;
import IManyToMany = NajsEloquent.Relation.IManyToManyRelationship;
import IQueryBuilder = NajsEloquent.QueryBuilder.IQueryBuilder;
import Collection = CollectJs.Collection;
import { Relationship } from '../Relationship';
import { RelationshipType } from '../RelationshipType';
import { PivotModel } from './pivot/PivotModel';
export declare class ManyToMany<T extends Model> extends Relationship<Collection<T>> implements IManyToMany<T> {
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
    collectData(): Collection<T> | undefined | null;
    fetchPivotData(type: RelationshipFetchType): Promise<CollectJs.Collection<Model>>;
    getQueryBuilder(name: string | undefined): IQueryBuilder<any>;
    fetchData(type: RelationshipFetchType): Promise<Collection<T> | undefined | null>;
    isInverseOf<K>(relation: NajsEloquent.Relation.IRelationship<K>): boolean;
    newPivot(data?: object, isGuarded?: boolean): Model;
    newPivotQuery(name?: string, raw?: boolean): IQueryBuilder<Model>;
    attach(id: string): Promise<this>;
    attachByTargetId(targetId: string): Promise<any> | undefined;
}
