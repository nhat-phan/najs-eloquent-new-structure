import { RecordManagerBase } from './RecordManagerBase'

import { Record } from './Record'

export class RecordManager<T extends Record> extends RecordManagerBase<T> {
  initialize(model: NajsEloquent.Model.IModel<Record>, isGuarded: boolean, data?: T | object): void {
    if (data instanceof Record) {
      model['attributes'] = data
      return
    }

    if (typeof data !== 'object') {
      model['attributes'] = new Record()
      return
    }

    if (!isGuarded) {
      model['attributes'] = new Record(data as object)
      return
    }

    model['attributes'] = new Record()
    model.fill(data)
  }

  getAttribute(model: NajsEloquent.Model.IModel<Record>, key: string): any {
    return model['attributes'].getAttribute(key)
  }

  setAttribute<T>(model: NajsEloquent.Model.IModel<Record>, key: string, value: T): boolean {
    return model['attributes'].setAttribute(key, value)
  }

  hasAttribute(model: NajsEloquent.Model.IModel<Record>, key: string): boolean {
    return true
  }

  getPrimaryKeyName(model: NajsEloquent.Model.IModel): string {
    return model
      .getDriver()
      .getSettingFeature()
      .getSettingProperty(model, 'primaryKey', 'id')
  }

  getClassName(): string {
    return 'RecordManager'
  }
}
