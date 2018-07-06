/// <reference path="../definitions/model/IModel.ts" />
/// <reference path="../definitions/model/IModelRecord.ts" />

export const RecordManagerPublicApi: NajsEloquent.Model.IModelRecord<any> = {
  getRecordName(this: NajsEloquent.Model.IModel): string {
    return this['driver'].getRecordManager().getRecordName(this)
  },

  getRecord(this: NajsEloquent.Model.IModel): any {
    return this['driver'].getRecordManager().getRecord(this)
  },

  formatAttributeName(this: NajsEloquent.Model.IModel, name: string): string {
    return this['driver'].getRecordManager().formatAttributeName(this, name)
  },

  getAttribute<K>(this: NajsEloquent.Model.IModel, key: string): K {
    return this['driver'].getRecordManager().getAttribute(this, key)
  },

  setAttribute<T>(this: NajsEloquent.Model.IModel, key: string, value: T) {
    this['driver'].getRecordManager().setAttribute(this, key, value)

    return this
  },

  hasAttribute(this: NajsEloquent.Model.IModel, key: string): boolean {
    return this['driver'].getRecordManager().hasAttribute(this, key)
  },

  getPrimaryKey<K>(this: NajsEloquent.Model.IModel): K {
    return this['driver'].getRecordManager().getPrimaryKey(this)
  },

  setPrimaryKey<K>(this: NajsEloquent.Model.IModel, value: K) {
    this['driver'].getRecordManager().setPrimaryKey(this, value)

    return this
  },

  getPrimaryKeyName(this: NajsEloquent.Model.IModel): string {
    return this['driver'].getRecordManager().getPrimaryKeyName(this)
  },

  markModified(this: NajsEloquent.Model.IModel, ...keys: Array<string | string[]>) {
    this['driver'].getRecordManager().markModified(this, arguments)

    return this
  },

  isModified(this: NajsEloquent.Model.IModel, ...keys: Array<string | string[]>): boolean {
    return this['driver'].getRecordManager().isModified(this, arguments)
  },

  getModified(this: NajsEloquent.Model.IModel): string[] {
    return this['driver'].getRecordManager().getModified(this)
  }
}
