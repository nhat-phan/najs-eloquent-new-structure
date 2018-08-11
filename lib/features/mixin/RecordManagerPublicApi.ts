/// <reference path="../../definitions/model/IModel.ts" />
/// <reference path="../../definitions/model/IModelRecord.ts" />
import Model = NajsEloquent.Model.ModelInternal

export const RecordManagerPublicApi: NajsEloquent.Model.IModelRecord<any> = {
  getRecordName(this: Model): string {
    return this.driver.getRecordManager().getRecordName(this)
  },

  getRecord(this: Model): any {
    return this.driver.getRecordManager().getRecord(this)
  },

  formatAttributeName(this: Model, name: string): string {
    return this.driver.getRecordManager().formatAttributeName(this, name)
  },

  getAttribute<K>(this: Model, key: string): K {
    return this.driver.getRecordManager().getAttribute(this, key)
  },

  setAttribute<T>(this: Model, key: string, value: T) {
    this.driver.getRecordManager().setAttribute(this, key, value)

    return this
  },

  hasAttribute(this: Model, key: string): boolean {
    return this.driver.getRecordManager().hasAttribute(this, key)
  },

  getPrimaryKey<K>(this: Model): K {
    return this.driver.getRecordManager().getPrimaryKey(this)
  },

  setPrimaryKey<K>(this: Model, value: K) {
    this.driver.getRecordManager().setPrimaryKey(this, value)

    return this
  },

  getPrimaryKeyName(this: Model): string {
    return this.driver.getRecordManager().getPrimaryKeyName(this)
  },

  markModified(this: Model, ...keys: Array<string | string[]>) {
    this.driver.getRecordManager().markModified(this, arguments)

    return this
  },

  isModified(this: Model, ...keys: Array<string | string[]>): boolean {
    return this.driver.getRecordManager().isModified(this, arguments)
  },

  getModified(this: Model): string[] {
    return this.driver.getRecordManager().getModified(this)
  },

  isNew(this: Model): boolean {
    return this.driver.getRecordManager().isNew(this)
  }
}
