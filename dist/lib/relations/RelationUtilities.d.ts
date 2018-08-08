import { RelationBase } from './RelationBase';
import IModel = NajsEloquent.Model.IModel;
export declare class RelationUtilities<T> {
    protected relation: RelationBase<T>;
    constructor(relation: RelationBase<T>);
    extractSamplesFrom(result: CollectJs.Collection<Model>): Model[];
    isRelationLoadedInDataBucket(model: IModel, relationName: string): boolean;
    setRelationLoadedInDataBucket(model: IModel, relationName: string): void;
}
