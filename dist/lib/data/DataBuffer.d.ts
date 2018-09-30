/// <reference path="../definitions/data/IDataReader.d.ts" />
/// <reference path="../definitions/data/IDataBuffer.d.ts" />
export declare class DataBuffer<T extends object> implements NajsEloquent.Data.IDataBuffer<T> {
    protected primaryKeyName: string;
    protected reader: NajsEloquent.Data.IDataReader<T>;
    protected buffer: Map<any, T>;
    constructor(primaryKeyName: string, reader: NajsEloquent.Data.IDataReader<T>);
    getPrimaryKeyName(): string;
    add(data: T): this;
    remove(data: T): this;
    find(cb: (item: T) => boolean): T | undefined;
    filter(cb: (item: T) => boolean): T[];
    map<V>(cb: (item: T) => V): V[];
    keys<V>(): V[];
    [Symbol.iterator](): IterableIterator<T>;
    getCollector(): NajsEloquent.Data.IDataCollector<T>;
}
