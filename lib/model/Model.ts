/// <reference path="interfaces/IModel.ts" />

import { CREATE_SAMPLE } from '../util/ClassSetting'
import { ClassRegistry, register, getClassName } from 'najs-binding'
import { EloquentDriverProvider } from '../facades/global/EloquentDriverProviderFacade'
import { EloquentComponentProvider } from '../facades/global/EloquentComponentProviderFacade'
import { Fillable } from './components/Fillable'
import { Attribute } from './components/Attribute'
import { Serialization } from './components/Serialization'

export interface Model<T = any> extends NajsEloquent.Model.IModel<T> {}
export class Model<T = any> {
  /**
   * Model constructor.
   *
   * @param {Object|undefined} data
   */
  constructor(data?: Object) {
    const className = getClassName(this)
    if (!ClassRegistry.has(className)) {
      register(Object.getPrototypeOf(this).constructor, className)
    }

    if (data !== CREATE_SAMPLE) {
      this['driver'] = EloquentDriverProvider.create(this)
      this['attributes'] = this['driver'].getRecord()

      EloquentComponentProvider.extend(this, this['driver'])
    }
  }
}

const defaultComponents: Najs.Contracts.Eloquent.Component[] = [new Attribute(), new Fillable(), new Serialization()]
for (const component of defaultComponents) {
  component.extend(Model.prototype)
}
