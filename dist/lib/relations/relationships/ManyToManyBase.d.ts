/// <reference path="../../../../lib/definitions/collect.js/index.d.ts" />
/// <reference path="../../definitions/model/IModel.d.ts" />
/// <reference path="../../definitions/data/IDataReader.d.ts" />
/// <reference path="../../definitions/relations/IRelationship.d.ts" />
/// <reference path="../../definitions/relations/IRelationDataBucket.d.ts" />
/// <reference path="../../definitions/relations/IManyToManyRelationship.d.ts" />
import Model = NajsEloquent.Model.IModel;
import ModelDefinition = NajsEloquent.Model.ModelDefinition;
import RelationshipFetchType = NajsEloquent.Relation.RelationshipFetchType;
import IPivotOptions = NajsEloquent.Relation.IPivotOptions;
import IManyToManyDefinition = NajsEloquent.Relation.IManyToManyDefinition;
import IQueryBuilder = NajsEloquent.QueryBuilder.IQueryBuilder;
import Collection = CollectJs.Collection;
import { Relationship } from '../Relationship';
import { PivotModel } from './pivot/PivotModel';
export declare abstract class ManyToManyBase<T extends Model> extends Relationship<Collection<T>> implements IManyToManyDefinition<T> {
    static className: string;
    protected pivot: ModelDefinition;
    protected pivotModelInstance: Model;
    protected pivotDefinition: typeof PivotModel;
    protected pivotTargetKeyName: string;
    protected pivotRootKeyName: string;
    protected pivotOptions: IPivotOptions;
    constructor(root: Model, relationName: string, target: ModelDefinition, pivot: ModelDefinition, pivotTargetKeyName: string, pivotRootKeyName: string, targetKeyName: string, rootKeyName: string);
    abstract getType(): string;
    abstract getClassName(): string;
    abstract collectData(): Collection<T> | undefined | null;
    abstract fetchPivotData(type: RelationshipFetchType): Promise<CollectJs.Collection<Model>>;
    isInverseOf<K>(relation: NajsEloquent.Relation.IRelationship<K>): boolean;
    protected readonly pivotModel: Model;
    getQueryBuilder(name: string | undefined): IQueryBuilder<any>;
    newPivot(data?: object, isGuarded?: boolean): Model;
    newPivotQuery(name?: string, raw?: boolean): IQueryBuilder<Model>;
    withPivot(...fields: Array<string | string[]>): this;
    getPivotOptions(name?: string): IPivotOptions;
    private setPivotDefinition;
}
