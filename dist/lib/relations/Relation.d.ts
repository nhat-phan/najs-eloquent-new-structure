/// <reference path="../definitions/model/IModel.d.ts" />
/// <reference path="../definitions/relations/IRelation.d.ts" />
import IModel = NajsEloquent.Model.IModel;
import IRelation = NajsEloquent.Relation.IRelation;
import IRelationDataBucket = NajsEloquent.Relation.IRelationDataBucket;
import IRelationData = NajsEloquent.Relation.IRelationData;
export declare abstract class Relation<T> {
    protected name: string;
    protected rootModel: IModel;
    protected loadChains: string[];
    constructor(rootModel: IModel, name: string);
    abstract getClassName(): string;
    abstract getType(): string;
    abstract buildData(): T | undefined | null;
    abstract lazyLoad(): Promise<T | undefined | null>;
    abstract eagerLoad(): Promise<T | undefined | null>;
    abstract isInverseOf<K>(relation: IRelation<K>): boolean;
    getName(): string;
    getRelationData(): IRelationData<T>;
    getDataBucket(): IRelationDataBucket | undefined;
    with(...relations: Array<string | string[]>): this;
    isLoaded(): boolean;
    getData(): T | undefined | null;
    load(): Promise<T | undefined | null>;
}
