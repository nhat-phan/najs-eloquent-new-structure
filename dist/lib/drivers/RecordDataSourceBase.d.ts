/// <reference path="../contracts/MemoryDataSource.d.ts" />
/// <reference path="../definitions/model/IModel.d.ts" />
import { Record } from './Record';
export declare abstract class RecordDataSourceBase implements Najs.Contracts.Eloquent.MemoryDataSource<Record> {
    protected modelName: string;
    protected primaryKeyName: string;
    protected buffer: Map<string, Record>;
    constructor(model: NajsEloquent.Model.IModel);
    getModelName(): string;
    getPrimaryKeyName(): string;
    getBuffer(): Map<string, Record>;
    abstract getClassName(): string;
    abstract getPrimaryKey(data: Record): string;
    abstract read(): Promise<boolean>;
    abstract write(): Promise<boolean>;
    add(data: Record): this;
    remove(data: Record): this;
    filter(cb: (item: Record) => boolean): Record[];
    [Symbol.iterator](): IterableIterator<Record>;
}
