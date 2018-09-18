/// <reference types="node" />
/// <reference types="najs-binding" />

namespace Najs.Contracts.Eloquent {
  export interface MemoryDataSource<T extends object> extends Najs.Contracts.Autoload {
    push(data: T): this

    remove(data: T): this

    read(): Promise<boolean>

    write(): Promise<boolean>

    filter(cb: (item: T) => boolean): T[]

    [Symbol.iterator](): IterableIterator<T>
  }
}
