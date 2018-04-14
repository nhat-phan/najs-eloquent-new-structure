/// <reference path="../../contracts/Component.ts" />
/// <reference path="../interfaces/IModel.ts" />

import { register } from 'najs-binding'
import { NajsEloquent } from '../../constants'
import { ClassSetting } from '../../util/ClassSetting'
import { SettingType } from '../../util/SettingType'
import { ModelUtilities } from '../../util/ModelUtilities'

export class Fillable implements Najs.Contracts.Eloquent.Component {
  model: NajsEloquent.Model.IModel<any>
  driver: Najs.Contracts.Eloquent.Driver<any>

  // prettier-ignore
  "constructor"(model: NajsEloquent.Model.IModel<any>, driver: Najs.Contracts.Eloquent.Driver<any>) {
    this.model = model
    this.driver = driver
  }

  getClassName(): string {
    return NajsEloquent.Model.Component.Fillable
  }

  extend(prototype: Object): void {
    prototype['getFillable'] = Fillable.getFillable
    prototype['getGuarded'] = Fillable.getGuarded
    prototype['markFillable'] = Fillable.markFillable
    prototype['markGuarded'] = Fillable.markGuarded
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

  // isFillable(key: string): boolean {
  //   // return this.isInWhiteList(key, this.getFillable(), this.getGuarded())
  // }

  // isGuarded(key: string): boolean {
  //   // return this.isInBlackList(key, this.getGuarded())
  // }
}
register(Fillable)
