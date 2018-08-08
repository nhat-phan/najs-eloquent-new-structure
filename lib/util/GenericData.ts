/// <reference path="../definitions/utils/IDataReader.ts" />
/// <reference path="../definitions/utils/IDataWriter.ts" />

import { has, get, set, flatten, unset } from 'lodash'

export class GenericData implements NajsEloquent.Util.IDataReader, NajsEloquent.Util.IDataWriter {
  protected data: object

  constructor(data: object) {
    this.data = data
  }

  get<T extends any>(path: string): T
  get<T extends any>(path: string, defaultValue: T): T
  get<T extends any>(path: string, defaultValue?: T): T {
    return get(this.data, path, defaultValue)
  }

  has(path: string): boolean {
    return has(this.data, path) && !!get(this.data, path)
  }

  exists(path: string): boolean {
    return has(this.data, path)
  }

  all(): object {
    return this.data
  }

  only(path: string): object
  only(paths: string[]): object
  only(...args: Array<string | string[]>): object
  only(...args: Array<string | string[]>): object {
    const paths: string[] = flatten(args)
    return paths.reduce((memo: object, path: string) => {
      set(memo, path, get(this.data, path))
      return memo
    }, {})
  }

  except(path: string): object
  except(paths: string[]): object
  except(...args: Array<string | string[]>): object
  except(...args: Array<string | string[]>): object {
    const paths: string[] = flatten(args)
    return paths.reduce((memo: object, path: string) => {
      unset(memo, path)
      return memo
    }, Object.assign({}, this.data))
  }

  set<T extends any>(path: string, value: T): this {
    set(this.data, path, value)
    return this
  }

  put<T extends any>(path: string, value: T): this {
    return this.set(path, value)
  }

  push<T extends any>(path: string, value: T): this {
    return this.set(path, value)
  }

  pull<T extends any>(path: string, defaultValue?: T): T {
    const value: T = this.get(path, <any>defaultValue)
    this.delete(path)
    return value
  }

  delete(path: string): this {
    unset(this.data, path)
    return this
  }

  remove(path: string): this {
    return this.delete(path)
  }

  forget(path: string): this {
    return this.delete(path)
  }

  clear(): this {
    this.data = {}
    return this
  }

  flush(): this {
    return this.clear()
  }
}
