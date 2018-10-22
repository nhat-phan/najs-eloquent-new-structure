/// <reference path="../definitions/relations/IRelationDataBucket.d.ts" />
import IModel = NajsEloquent.Model.IModel;
import IRelationDataBucket = NajsEloquent.Relation.IRelationDataBucket;
import { Relationship } from './Relationship';
export declare const RelationUtilities: {
    isLoadedInDataBucket<T>(relationship: Relationship<T>, model: IModel, name: string): boolean;
    markLoadedInDataBucket<T>(relationship: Relationship<T>, model: IModel, name: string): void;
    getAttributeListInDataBucket(dataBucket: IRelationDataBucket, model: IModel, attribute: string): {}[];
};
