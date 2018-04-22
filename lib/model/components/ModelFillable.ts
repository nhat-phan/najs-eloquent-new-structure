/// <reference path="../../contracts/Component.ts" />
/// <reference path="../interfaces/IModel.ts" />
/// <reference path="../interfaces/IModelSetting.ts" />

import { register } from 'najs-binding'
import { NajsEloquent } from '../../constants'
import { pick } from 'lodash'

export class ModelFillable implements Najs.Contracts.Eloquent.Component {
  static className = NajsEloquent.Model.Component.ModelFillable
  getClassName(): string {
    return NajsEloquent.Model.Component.ModelFillable
  }

  extend(prototype: Object, bases: Object[], driver: Najs.Contracts.Eloquent.Driver<any>): void {
    prototype['getFillable'] = ModelFillable.getFillable
    prototype['getGuarded'] = ModelFillable.getGuarded
    prototype['markFillable'] = ModelFillable.markFillable
    prototype['markGuarded'] = ModelFillable.markGuarded
    prototype['isFillable'] = ModelFillable.isFillable
    prototype['isGuarded'] = ModelFillable.isGuarded
    prototype['fill'] = ModelFillable.fill
    prototype['forceFill'] = ModelFillable.forceFill
  }

  static getFillable(this: NajsEloquent.Model.IModel<any> & NajsEloquent.Model.IModelSetting): string[] {
    return this.getArrayUniqueSetting('fillable', [])
  }

  static getGuarded(this: NajsEloquent.Model.IModel<any> & NajsEloquent.Model.IModelSetting): string[] {
    return this.getArrayUniqueSetting('guarded', ['*'])
  }

  static markFillable(this: NajsEloquent.Model.IModel<any>) {
    this['settings']['pushToUniqueArraySetting']('fillable', arguments)
    return this
  }

  static markGuarded(this: NajsEloquent.Model.IModel<any>) {
    this['settings']['pushToUniqueArraySetting']('guarded', arguments)
    return this
  }

  static isFillable(this: NajsEloquent.Model.IModel<any>, key: string): boolean {
    return this['settings']['isInWhiteList'](key, this.getFillable(), this.getGuarded())
  }

  static isGuarded(this: NajsEloquent.Model.IModel<any>, key: string): boolean {
    return this['settings']['isInBlackList'](key, this.getGuarded())
  }

  static fill(this: NajsEloquent.Model.IModel<any>, data: Object) {
    const fillable = this.getFillable()
    const guarded = this.getGuarded()

    const attributes = fillable.length > 0 ? pick(data, fillable) : data
    for (const key in attributes) {
      if (this['settings']['isInWhiteList'](key, fillable, guarded)) {
        this.setAttribute(key, attributes[key])
      }
    }

    return this
  }

  static forceFill(this: NajsEloquent.Model.IModel<any>, data: Object) {
    for (const key in data) {
      this.setAttribute(key, data[key])
    }

    return this
  }
}
register(ModelFillable)
