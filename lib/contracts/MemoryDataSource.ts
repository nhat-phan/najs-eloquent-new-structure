/// <reference types="najs-binding" />
/// <reference path="../definitions/model/IModel.ts" />

namespace Najs.Contracts.Eloquent {
  export interface MemoryDataSource<T extends object> extends Najs.Contracts.Autoload {
    push(data: T): this

    remove(data: T): this

    read(): Promise<boolean>

    write(): Promise<boolean>

    filter(cb: (item: T) => boolean): T[]

    next(): { value?: T; done: boolean }

    [Symbol.iterator](): { next: () => { value?: T; done: boolean } }
  }
}
