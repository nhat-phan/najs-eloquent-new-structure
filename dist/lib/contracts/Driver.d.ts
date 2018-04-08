declare namespace Najs.Contracts.Eloquent {
    interface Driver<T> {
        getRecord(): T;
        getAttribute(name: string): T;
        setAttribute(name: string): T;
        toObject(): Object;
        toJSON(): Object;
        is(model: Object): T;
        newQuery(): any;
    }
}
