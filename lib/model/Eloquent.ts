/// <reference path="interfaces/IEloquent.ts" />

import { CREATE_SAMPLE } from '../util/ClassSetting'
import { ClassRegistry, register, getClassName } from 'najs-binding'
import { EloquentDriverProvider } from '../facades/global/EloquentDriverProviderFacade'
import { EloquentComponentProvider } from '../facades/global/EloquentComponentProviderFacade'

function EloquentClass<T>(this: NajsEloquent.Model.IModel<T>, data?: Object | T) {
  const className = getClassName(this)
  if (!ClassRegistry.has(className)) {
    register(Object.getPrototypeOf(this).constructor, className)
  }

  if (data !== CREATE_SAMPLE) {
    this['driver'] = EloquentDriverProvider.create(this)
    this['attributes'] = this['driver'].getRecord()

    return EloquentComponentProvider.extend(this, this['driver'])
  }
}

export const Eloquent: NajsEloquent.Model.IEloquent<{}> = <any>EloquentClass
