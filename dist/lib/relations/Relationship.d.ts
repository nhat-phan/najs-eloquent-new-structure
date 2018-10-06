/// <reference path="../definitions/model/IModel.d.ts" />
/// <reference path="../definitions/relations/IRelationship.d.ts" />
import IModel = NajsEloquent.Model.IModel;
import ModelDefinition = NajsEloquent.Model.ModelDefinition;
import IRelationship = NajsEloquent.Relation.IRelationship;
import RelationshipFetchType = NajsEloquent.Relation.RelationshipFetchType;
import IRelationDataBucket = NajsEloquent.Relation.IRelationDataBucket;
import IRelationData = NajsEloquent.Relation.IRelationData;
export declare abstract class Relationship<T> implements IRelationship<T> {
    protected name: string;
    protected loadChains: string[];
    protected rootModel: IModel;
    protected rootKeyName: string;
    private targetModelInstance;
    protected targetDefinition: ModelDefinition;
    protected readonly targetModel: IModel;
    protected targetKeyName: string;
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
    abstract fetchData(type: RelationshipFetchType): Promise<T | undefined | null>;
    abstract isInverseOf<K>(relation: IRelationship<K>): boolean;
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
