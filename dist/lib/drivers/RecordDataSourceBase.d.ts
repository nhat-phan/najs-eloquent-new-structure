/// <reference path="../contracts/MemoryDataSource.d.ts" />
import { Facade } from 'najs-facade';
import { Record } from './Record';
export declare abstract class RecordDataSourceBase extends Facade implements Najs.Contracts.Eloquent.MemoryDataSource<Record> {
    protected modelName: string;
    protected primaryKeyName: string;
    protected buffer: Map<string, Record>;
    constructor(modelName: string, primaryKeyName: string);
    abstract getClassName(): string;
    abstract getPrimaryKey(data: Record): string;
    abstract read(): Promise<boolean>;
    abstract write(): Promise<boolean>;
    push(data: Record): this;
    remove(data: Record): this;
    filter(cb: (item: Record) => boolean): Record[];
    next(): {
        value: Record;
        done: boolean;
    };
    [Symbol.iterator](): {
        next: () => {
            value: Record;
            done: boolean;
        };
    };
}
