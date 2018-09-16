/// <reference path="../contracts/MemoryDataSource.ts" />

import { Facade } from 'najs-facade'
import { Record } from './Record'

export abstract class RecordDataSourceBase extends Facade implements Najs.Contracts.Eloquent.MemoryDataSource<Record> {
  protected modelName: string
  protected primaryKeyName: string
  protected buffer: Map<string, Record>

  constructor(modelName: string, primaryKeyName: string) {
    super()
    this.modelName = modelName
    this.primaryKeyName = primaryKeyName
    this.buffer = new Map()
  }

  abstract getClassName(): string
  abstract getPrimaryKey(data: Record): string
  abstract read(): Promise<boolean>
  abstract write(): Promise<boolean>

  push(data: Record): this {
    this.buffer.set(this.getPrimaryKey(data), data)

    return this
  }

  remove(data: Record): this {
    this.buffer.delete(this.getPrimaryKey(data))

    return this
  }

  filter(cb: (item: Record) => boolean): Record[] {
    const result = []
    for (const item of this.buffer.values()) {
      if (cb.call(undefined, item)) {
        result.push(item)
      }
    }
    return result
  }

  next(): { value: Record; done: boolean } {
    return this.buffer.values().next()
  }

  [Symbol.iterator](): { next: () => { value: Record; done: boolean } } {
    return {
      next: () => this.next()
    }
  }
}
