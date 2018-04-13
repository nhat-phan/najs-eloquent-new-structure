/// <reference path="interfaces/IEloquent.ts" />

import { CREATE_SAMPLE } from '../util/ClassSetting'
import { ClassRegistry, register } from 'najs-binding'
// import { EloquentDriverProvider } from '../facades/global/EloquentDriverProviderFacade'
// import { EloquentComponentProvider } from '../facades/global/EloquentComponentProviderFacade'
// import { Fillable } from './components/Fillable'

function eloquent<T>(this: NajsEloquent.Model.IModel<T>, data?: Object | T) {
  if (!ClassRegistry.has(this.getClassName())) {
    register(Object.getPrototypeOf(this).constructor, this.getClassName(), false)
  }

  if (data !== CREATE_SAMPLE) {
    // return EloquentComponentProvider.proxify(this, EloquentDriverProvider.create(this))
  }
}

// eloquent.prototype = Object.assign({}, Fillable)

export const Eloquent: NajsEloquent.Model.IEloquent<{}> = <any>eloquent
