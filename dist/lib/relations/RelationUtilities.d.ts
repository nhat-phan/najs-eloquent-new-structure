import { Relation } from './Relation';
import IModel = NajsEloquent.Model.IModel;
export declare const RelationUtilities: {
    isLoadedInDataBucket<T>(relation: Relation<T>, model: IModel, name: string): boolean;
    markLoadedInDataBucket<T>(relation: Relation<T>, model: IModel, name: string): void;
};
