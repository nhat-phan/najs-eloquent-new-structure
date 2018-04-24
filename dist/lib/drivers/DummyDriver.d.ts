/// <reference path="../contracts/Driver.d.ts" />
export declare class DummyDriver implements Najs.Contracts.Eloquent.Driver<Object> {
    static className: string;
    attributes: Object;
    getClassName(): string;
    initialize(data?: Object): void;
    getRecord(): Object;
    hasAttribute(name: string): boolean;
    getAttribute<T>(name: string): T;
    setAttribute<T>(name: string, value: T): boolean;
    getPrimaryKeyName(): string;
    toObject(): Object;
    newQuery(): any;
    delete(softDeletes: boolean): Promise<boolean>;
    restore(): Promise<any>;
    save(): Promise<any>;
    isSoftDeleted(): boolean;
    markModified(name: string): void;
    getModelComponentName(): string | undefined;
    getModelComponentOrder(components: string[]): string[];
    formatAttributeName(name: string): string;
}
