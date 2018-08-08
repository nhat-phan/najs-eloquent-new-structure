/// <reference path="../definitions/utils/IDataReader.d.ts" />
/// <reference path="../definitions/utils/IDataWriter.d.ts" />
export declare class GenericData implements NajsEloquent.Util.IDataReader, NajsEloquent.Util.IDataWriter {
    protected data: object;
    constructor(data: object);
    get<T extends any>(path: string): T;
    get<T extends any>(path: string, defaultValue: T): T;
    has(path: string): boolean;
    exists(path: string): boolean;
    all(): object;
    only(path: string): object;
    only(paths: string[]): object;
    only(...args: Array<string | string[]>): object;
    except(path: string): object;
    except(paths: string[]): object;
    except(...args: Array<string | string[]>): object;
    set<T extends any>(path: string, value: T): this;
    put<T extends any>(path: string, value: T): this;
    push<T extends any>(path: string, value: T): this;
    pull<T extends any>(path: string, defaultValue?: T): T;
    delete(path: string): this;
    remove(path: string): this;
    forget(path: string): this;
    clear(): this;
    flush(): this;
}
