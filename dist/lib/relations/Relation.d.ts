/// <reference path="../definitions/model/IModel.d.ts" />
/// <reference path="../definitions/relations/IRelation.d.ts" />
import IModel = NajsEloquent.Model.IModel;
import IRelation = NajsEloquent.Relation.IRelation;
import RelationFetchType = NajsEloquent.Relation.RelationFetchType;
import IRelationDataBucket = NajsEloquent.Relation.IRelationDataBucket;
import IRelationData = NajsEloquent.Relation.IRelationData;
export declare abstract class Relation<T> {
    protected name: string;
    protected rootModel: IModel;
    protected loadChains: string[];
    constructor(rootModel: IModel, name: string);
    abstract getClassName(): string;
    abstract getType(): string;
    /**
     * Collect data from RelationDataBucket.
     */
    abstract collectData(): T | undefined | null;
    /**
     * Fetch data from database or data source.
     */
    abstract fetchData(type: RelationFetchType): Promise<T | undefined | null>;
    abstract isInverseOf<K>(relation: IRelation<K>): boolean;
    getName(): string;
    getRelationData(): IRelationData<T>;
    getDataBucket(): IRelationDataBucket | undefined;
    with(...relations: Array<string | string[]>): this;
    isLoaded(): boolean;
    getData(): T | undefined | null;
    markInverseRelationsToLoaded<T>(result: T): T;
    lazyLoad(): Promise<T | undefined | null>;
    eagerLoad(): Promise<T | undefined | null>;
    protected loadData(type: 'lazy' | 'eager'): Promise<T | null | undefined>;
    load(): Promise<T | undefined | null>;
}
