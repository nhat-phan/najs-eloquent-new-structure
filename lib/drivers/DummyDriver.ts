/// <reference path="../contracts/Driver.ts" />

import { register } from 'najs-binding'
import { NajsEloquent } from '../constants'
import { snakeCase } from 'lodash'

export class DummyDriver implements Najs.Contracts.Eloquent.Driver<Object> {
  static className: string = NajsEloquent.Driver.DummyDriver
  attributes: Object = {}

  getClassName(): string {
    return NajsEloquent.Driver.DummyDriver
  }

  initialize(data?: Object): void {
    this.attributes = data || {}
  }

  getRecord(): Object {
    return this.attributes
  }

  hasAttribute(name: string): boolean {
    return false
  }

  getAttribute<T>(name: string): T {
    return this.attributes[name]
  }

  setAttribute<T>(name: string, value: T): boolean {
    this.attributes[name] = value
    return true
  }

  getPrimaryKeyName(): string {
    return 'id'
  }

  toObject(): Object {
    return this.attributes
  }

  newQuery(): any {
    return {}
  }

  async delete(softDeletes: boolean): Promise<boolean> {
    return true
  }

  async restore(): Promise<any> {
    return true
  }

  async save(): Promise<any> {
    return true
  }

  markModified(name: string): void {}

  getModelComponentName(): string | undefined {
    return undefined
  }

  getModelComponentOrder(components: string[]): string[] {
    return components
  }

  formatAttributeName(name: string): string {
    return snakeCase(name)
  }
}
register(DummyDriver)
