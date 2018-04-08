/// <reference path="interfaces/IEloquent.ts" />

import { ClassRegistry, register } from 'najs-binding'

function eloquent<T>(this: NajsEloquent.Model.IModel<T>, data?: Object | T) {
  if (!ClassRegistry.has(this.getClassName())) {
    register(Object.getPrototypeOf(this).constructor, this.getClassName(), false)
  }

  if (data !== 'do-not-initialize') {
  }
}

export const Eloquent: NajsEloquent.Model.IEloquent<{}> = <any>eloquent
