declare namespace Najs.Contracts.Eloquent {
    interface Driver<NativeRecord> {
        getClassName(): string;
        initialize(data?: NativeRecord | Object): void;
        getRecord(): any;
        getAttribute<T>(name: string): T;
        setAttribute<T>(name: string, value: T): this;
        getPrimaryKeyName(): string;
        toObject(): Object;
        newQuery(): any;
        delete(softDeletes: boolean): Promise<boolean>;
        restore(): Promise<any>;
        save(): Promise<any>;
        markModified(name: string): void;
        getModelComponentName(): string | undefined;
        getModelComponentOrder(components: string[]): string[];
    }
}
