/// <reference path="IRelationFactory.d.ts" />
declare namespace NajsEloquent.Relation {
    interface IRelationData<T> {
        getFactory(): IRelationFactory;
        isLoaded(): boolean;
        isBuilt(): boolean;
        markLoaded(): this;
        markBuilt(): this;
        getData(): T;
        setData(data: T): this;
        getLoadType(): 'unknown' | 'lazy' | 'eager';
        setLoadType(type: 'lazy' | 'eager'): this;
    }
}
