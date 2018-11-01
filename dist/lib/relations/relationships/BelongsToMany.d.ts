/// <reference path="../../../../lib/definitions/collect.js/index.d.ts" />
/// <reference path="../../definitions/model/IModel.d.ts" />
/// <reference path="../../definitions/data/IDataReader.d.ts" />
/// <reference path="../../definitions/relations/IRelationship.d.ts" />
/// <reference path="../../definitions/relations/IRelationDataBucket.d.ts" />
/// <reference path="../../definitions/relations/IBelongsToManyRelationship.d.ts" />
import Model = NajsEloquent.Model.IModel;
import ModelDefinition = NajsEloquent.Model.ModelDefinition;
import RelationshipFetchType = NajsEloquent.Relation.RelationshipFetchType;
import IRelationDataBucket = NajsEloquent.Relation.IRelationDataBucket;
import IBelongsToMany = NajsEloquent.Relation.IBelongsToManyRelationship;
import Collection = CollectJs.Collection;
import { ManyToMany } from './ManyToMany';
import { RelationshipType } from '../RelationshipType';
import { PivotModel } from './pivot/PivotModel';
export declare class BelongsToMany<T extends Model> extends ManyToMany<T> implements IBelongsToMany<T> {
    static className: string;
    protected pivot: ModelDefinition;
    protected pivotModelInstance: Model;
    protected pivotDefinition: typeof PivotModel;
    protected pivotTargetKeyName: string;
    protected pivotRootKeyName: string;
    getType(): RelationshipType;
    getClassName(): string;
    collectPivotData(dataBucket: IRelationDataBucket): object;
    collectData(): Collection<T> | undefined | null;
    fetchPivotData(type: RelationshipFetchType): Promise<CollectJs.Collection<Model>>;
    fetchData(type: RelationshipFetchType): Promise<Collection<T> | undefined | null>;
    attach(arg1: string | string[] | object, arg2?: object): Promise<this>;
    parseAttachArguments(arg1: string | string[] | object, arg2?: object): object;
    attachModel(targetId: string, data?: object): Promise<any> | undefined;
}