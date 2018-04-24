/// <reference types="najs-binding" />
/// <reference path="../wrappers/interfaces/IQueryBuilderWrapper.ts" />

namespace Najs.Contracts.Eloquent {
  export interface Driver<NativeRecord> extends Najs.Contracts.Autoload {
    initialize(data?: NativeRecord | Object): void

    getRecord(): NativeRecord

    hasAttribute(name: string): boolean

    getAttribute<T>(name: string): T

    setAttribute<T>(name: string, value: T): boolean

    getPrimaryKeyName(): string

    toObject(): Object

    newQuery<T>(): NajsEloquent.Wrapper.IQueryBuilderWrapper<T>

    delete(softDeletes: boolean): Promise<boolean>

    restore(): Promise<boolean>

    save(): Promise<boolean>

    markModified(name: string): void

    isSoftDeleted(): boolean

    formatAttributeName(name: string): string

    getModelComponentName(): string | undefined

    getModelComponentOrder(components: string[]): string[]
  }
}
