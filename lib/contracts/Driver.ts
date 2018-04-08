/// <reference path="ModelComponent" />

namespace Najs.Contracts.Eloquent {
  export interface Driver<T> {
    getRecord(): T

    getAttribute(name: string): T

    setAttribute(name: string): T

    toObject(): Object

    toJSON(): Object

    is(model: Object): T

    newQuery(): any

    // proxify(target: Object): any
    // getProxies(): ModelComponent[]
    // getProxies(model: string): ModelComponent[]

    // register(proxy: ModelProxy, name: string, isDefault: boolean): this

    // bind(model: string, proxyName: string): this
  }
}
