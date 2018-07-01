/// <reference path="../definitions/model/IModel.ts" />

import { getClassName } from 'najs-binding'
import { EloquentDriverProvider } from '../facades/global/EloquentDriverProviderFacade'

export interface Model<T> extends NajsEloquent.Model.IModel<T> {}
export class Model<T> {
  constructor(data?: T | object, isGuarded?: boolean) {
    this.driver = EloquentDriverProvider.create(this)

    return this.driver.makeModel(this, data, isGuarded)
  }

  getDriver() {
    return this.driver
  }

  getModelName() {
    return getClassName(this)
  }
}
