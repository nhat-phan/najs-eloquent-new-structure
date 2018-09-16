/// <reference path="../definitions/model/IModel.d.ts" />
declare namespace Najs.Contracts.Eloquent {
    interface MemoryDataSource<T extends object> extends Najs.Contracts.Autoload {
        push(data: T): this;
        remove(data: T): this;
        read(): Promise<boolean>;
        write(): Promise<boolean>;
        filter(cb: (item: T) => boolean): T[];
        [Symbol.iterator](): IterableIterator<T>;
    }
}
