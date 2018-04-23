/// <reference path="interfaces/IModel.ts" />

import { make } from 'najs-binding'
import { CREATE_SAMPLE, ClassSetting } from '../util/ClassSetting'
import { ClassRegistry, register, getClassName } from 'najs-binding'
import { EloquentDriverProvider } from '../facades/global/EloquentDriverProviderFacade'
import { SettingType } from './../util/SettingType'
import { ModelSetting } from './ModelSetting'
import { ModelAttribute } from './components/ModelAttribute'
import { ModelFillable } from './components/ModelFillable'
import { ModelSerialization } from './components/ModelSerialization'
const collect = require('collect.js')

export interface Model<T = any> extends NajsEloquent.Model.IModel<T> {}
export class Model<T = any> {
  private setting: ClassSetting

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
      this.settings = new ModelSetting(this)
      this.driver = EloquentDriverProvider.create(this)
      this.driver.initialize(data)
      this.attributes = this.driver.getRecord()
    }
  }

  // model: 3 functions
  // fillable: 8 functions
  // serialization: 9 functions
  // attribute: 5 functions
  // timestamps: 3 functions
  // soft delete: 5 functions

  newCollection(dataset: any[]): any {
    return collect(dataset.map(item => this.newInstance(item)))
  }

  newInstance(data?: Object | T): this {
    return <any>make(getClassName(this), [data])
  }

  private getSetting(): ClassSetting {
    if (!this.setting) {
      this.setting = ClassSetting.of(this)
    }
    return this.setting
  }

  protected getArrayUniqueSetting(property: string, defaultValue: string[]): string[] {
    return this.getSetting().read(property, SettingType.arrayUnique([], defaultValue))
  }
}

const defaultComponents: Najs.Contracts.Eloquent.Component[] = [
  make(ModelAttribute.className),
  make(ModelFillable.className),
  make(ModelSerialization.className)
]
for (const component of defaultComponents) {
  component.extend(Model.prototype, [], <any>{})
}
