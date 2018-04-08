/// <reference path="ModelComponent" />

namespace Najs.Contracts.Eloquent {
  export interface Driver<NativeRecord> {
    initialize(data?: NativeRecord | Object): void

    getRecord(): any

    getAttribute<T>(name: string): T

    setAttribute<T>(name: string, value: T): this

    getPrimaryKeyName(): string

    toObject(): Object

    newQuery(): any

    delete(softDeletes: boolean): Promise<boolean>

    restore(): Promise<any>

    save(): Promise<any>

    markModified(name: string): void

    getModelComponentName(): string | undefined

    getModelComponentOrder(components: string[]): string[]

    // proxify(target: Object): any
    // getProxies(): ModelComponent[]
    // getProxies(model: string): ModelComponent[]

    // register(proxy: ModelProxy, name: string, isDefault: boolean): this

    // bind(model: string, proxyName: string): this
  }
}
