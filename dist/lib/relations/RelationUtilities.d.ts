/// <reference path="../definitions/relations/IRelationship.d.ts" />
/// <reference path="../definitions/relations/IRelationDataBucket.d.ts" />
import IModel = NajsEloquent.Model.IModel;
import IRelationDataBucket = NajsEloquent.Relation.IRelationDataBucket;
import IRelationship = NajsEloquent.Relation.IRelationship;
import { Relationship } from './Relationship';
export declare const RelationUtilities: {
    bundleRelations(relations: IRelationship<any>[]): IRelationship<any>[];
    isLoadedInDataBucket<T>(relationship: Relationship<T>, model: IModel, name: string): boolean;
    markLoadedInDataBucket<T>(relationship: Relationship<T>, model: IModel, name: string): void;
    getAttributeListInDataBucket(dataBucket: IRelationDataBucket, model: IModel, attribute: string): {}[];
};
