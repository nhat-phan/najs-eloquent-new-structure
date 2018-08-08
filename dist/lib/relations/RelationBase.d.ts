/// <reference path="../definitions/model/IModel.d.ts" />
/// <reference path="../definitions/relations/IRelation.d.ts" />
import IModel = NajsEloquent.Model.IModel;
import IRelation = NajsEloquent.Relation.IRelation;
import IRelationDataBucket = NajsEloquent.Relation.IRelationDataBucket;
import RelationData = NajsEloquent.Relation.RelationData;
import { RelationUtilities } from './RelationUtilities';
export declare abstract class RelationBase<T> {
    protected name: string;
    protected rootModel: IModel;
    protected utils: RelationUtilities<T>;
    constructor(rootModel: IModel, name: string, utilities?: RelationUtilities<T>);
    abstract getClassName(): string;
    abstract getType(): string;
    abstract buildData(): T | undefined | null;
    abstract lazyLoad(): Promise<T | undefined | null>;
    abstract eagerLoad(): Promise<T | undefined | null>;
    abstract isInverseOf<K>(relation: IRelation<K>): boolean;
    getRelationData(): RelationData<T>;
    isLoaded(): boolean;
    getData(): T | undefined | null;
    load(): Promise<T | undefined | null>;
    getDataBucket(): IRelationDataBucket | undefined;
}
