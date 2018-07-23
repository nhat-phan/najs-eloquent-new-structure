/// <reference path="../definitions/model/IModel.ts" />

import { getClassName } from 'najs-binding'
import { EloquentDriverProvider } from '../facades/global/EloquentDriverProviderFacade'

export interface Model extends NajsEloquent.Model.IModel {}
export class Model {
  constructor(data?: object, isGuarded?: boolean) {
    return this.makeDriver().makeModel<any>(this, data, isGuarded)
  }

  protected makeDriver<T>(): Najs.Contracts.Eloquent.Driver<T> {
    this.driver = EloquentDriverProvider.create(this)

    return this.driver
  }

  getDriver() {
    return this.driver
  }

  getModelName() {
    return getClassName(this)
  }
}
