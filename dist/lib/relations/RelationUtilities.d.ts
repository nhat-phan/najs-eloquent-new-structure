import { Relationship } from './Relationship';
import IModel = NajsEloquent.Model.IModel;
export declare const RelationUtilities: {
    isLoadedInDataBucket<T>(relationship: Relationship<T>, model: IModel, name: string): boolean;
    markLoadedInDataBucket<T>(relationship: Relationship<T>, model: IModel, name: string): void;
};
