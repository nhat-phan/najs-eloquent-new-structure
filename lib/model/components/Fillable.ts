/// <reference path="../../contracts/Component.ts" />
/// <reference path="../interfaces/IModel.ts" />

import { register } from 'najs-binding'
import { NajsEloquent } from '../../constants'
import { ClassSetting } from '../../util/ClassSetting'
import { SettingType } from '../../util/SettingType'
import { ModelUtilities } from '../../util/ModelUtilities'
import { pick } from 'lodash'

export class Fillable implements Najs.Contracts.Eloquent.Component {
  getClassName(): string {
    return NajsEloquent.Model.Component.Fillable
  }

  extend(prototype: Object): void {
    prototype['getFillable'] = Fillable.getFillable
    prototype['getGuarded'] = Fillable.getGuarded
    prototype['markFillable'] = Fillable.markFillable
    prototype['markGuarded'] = Fillable.markGuarded
    prototype['isFillable'] = Fillable.isFillable
    prototype['isGuarded'] = Fillable.isGuarded
    prototype['fill'] = Fillable.fill
    prototype['forceFill'] = Fillable.forceFill
  }

  static getFillable(this: NajsEloquent.Model.IModel<any>): string[] {
    return ClassSetting.of(this).read('fillable', SettingType.arrayUnique([], []))
  }

  static getGuarded(this: NajsEloquent.Model.IModel<any>): string[] {
    return ClassSetting.of(this).read('guarded', SettingType.arrayUnique([], ['*']))
  }

  static markFillable(this: NajsEloquent.Model.IModel<any>) {
    ModelUtilities.pushToUniqueArraySetting(this, 'fillable', arguments)
    return this
  }

  static markGuarded(this: NajsEloquent.Model.IModel<any>) {
    ModelUtilities.pushToUniqueArraySetting(this, 'guarded', arguments)
    return this
  }

  static isFillable(this: NajsEloquent.Model.IModel<any>, key: string): boolean {
    return ModelUtilities.isInWhiteList(this, key, this.getFillable(), this.getGuarded())
  }

  static isGuarded(this: NajsEloquent.Model.IModel<any>, key: string): boolean {
    return ModelUtilities.isInBlackList(this, key, this.getGuarded())
  }

  static fill(this: NajsEloquent.Model.IModel<any>, data: Object) {
    const fillable = this.getFillable()
    const guarded = this.getGuarded()

    const attributes = fillable.length > 0 ? pick(data, fillable) : data
    for (const key in attributes) {
      if (ModelUtilities.isInWhiteList(this, key, fillable, guarded)) {
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
register(Fillable)
