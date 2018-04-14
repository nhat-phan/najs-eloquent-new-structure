/// <reference path="interfaces/IEloquent.ts" />

import { CREATE_SAMPLE } from '../util/ClassSetting'
import { ClassRegistry, register, getClassName } from 'najs-binding'
import { EloquentDriverProvider } from '../facades/global/EloquentDriverProviderFacade'
import { EloquentComponentProvider } from '../facades/global/EloquentComponentProviderFacade'

function eloquent<T>(this: NajsEloquent.Model.IModel<T>, data?: Object | T) {
  const definition = Object.getPrototypeOf(this).constructor
  const className = getClassName(definition)
  if (!ClassRegistry.has(className)) {
    register(definition)
  }

  if (data !== CREATE_SAMPLE) {
    const driver = EloquentDriverProvider.create(this)
    return EloquentComponentProvider.extend(this, driver)
  }
}

export const Eloquent: NajsEloquent.Model.IEloquent<{}> = <any>eloquent
