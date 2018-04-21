/// <reference path="interfaces/IModel.ts" />

import { make } from 'najs-binding'
import { CREATE_SAMPLE } from '../util/ClassSetting'
import { ClassRegistry, register, getClassName } from 'najs-binding'
import { EloquentDriverProvider } from '../facades/global/EloquentDriverProviderFacade'
import { ModelAttribute } from './components/ModelAttribute'
import { ModelFillable } from './components/ModelFillable'
import { ModelSerialization } from './components/ModelSerialization'

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
      this.driver = EloquentDriverProvider.create(this)
      this.driver.initialize(data)
      this.attributes = this.driver.getRecord()
    }
  }

  // newCollection(dataset: any[]): any {
  //   return collect(dataset.map(item => this.newInstance(item)))
  // }

  // newInstance(data?: Object | T): this {
  //   return <any>make(getClassName(this), [data])
  // }
}

const defaultComponents: Najs.Contracts.Eloquent.Component[] = [
  make(ModelAttribute.className),
  make(ModelFillable.className),
  make(ModelSerialization.className)
]
for (const component of defaultComponents) {
  component.extend(Model.prototype, [], <any>{})
}
