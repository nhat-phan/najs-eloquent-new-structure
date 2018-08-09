/// <reference path="../definitions/relations/IRelationData.d.ts" />
export declare class RelationData<T> implements NajsEloquent.Relation.IRelationData<T> {
    protected data: T;
    protected state: string;
    protected factory: NajsEloquent.Relation.IRelationFactory;
    protected loadType?: 'lazy' | 'eager';
    constructor(factory: NajsEloquent.Relation.IRelationFactory);
    getFactory(): NajsEloquent.Relation.IRelationFactory;
    isLoaded(): boolean;
    isBuilt(): boolean;
    markLoaded(): this;
    markBuilt(): this;
    getData(): T;
    setData(data: T): this;
    getLoadType(): 'unknown' | 'lazy' | 'eager';
    setLoadType(type: 'lazy' | 'eager'): this;
}
