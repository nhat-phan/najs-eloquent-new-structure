/// <reference path="IRelationFactory.d.ts" />
declare namespace NajsEloquent.Relation {
    interface IRelationData<T> {
        getFactory(): IRelationFactory;
        isLoaded(): boolean;
        hasData(): boolean;
        getData(): T | undefined | null;
        setData(data: T | undefined | null): T | undefined | null;
        getLoadType(): 'unknown' | 'lazy' | 'eager';
        setLoadType(type: 'lazy' | 'eager'): this;
    }
}
