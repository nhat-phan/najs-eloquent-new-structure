/// <reference types="najs-binding" />

namespace Najs.Contracts.Eloquent {
  export interface Driver<NativeRecord> extends Najs.Contracts.Autoload {
    initialize(data?: NativeRecord | Object): void

    getRecord(): NativeRecord

    hasAttribute(name: string): boolean

    getAttribute<T>(name: string): T

    setAttribute<T>(name: string, value: T): boolean

    getPrimaryKeyName(): string

    toObject(): Object

    newQuery(): any

    delete(softDeletes: boolean): Promise<boolean>

    restore(): Promise<any>

    save(): Promise<any>

    markModified(name: string): void

    formatAttributeName(name: string): string

    getModelComponentName(): string | undefined

    getModelComponentOrder(components: string[]): string[]
  }
}
