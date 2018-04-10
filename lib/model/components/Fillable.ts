/// <reference path="../../contracts/Component.ts" />
/// <reference path="../interfaces/IModel.ts" />

import { register } from 'najs-binding'
import { in_array } from '../../util/in_array'
import { NajsEloquent } from '../../constants'
import { ClassSetting } from '../../util/ClassSetting'
import { SettingType } from '../../util/SettingType'

const VARIABLES = ['fillable', 'guarded']
const METHODS = ['getFillable']

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

  isGetter(key: string | symbol, model: NajsEloquent.Model.IModel<any>): boolean {
    return in_array(key, VARIABLES, METHODS)
  }

  proxifyGetter(model: NajsEloquent.Model.IModel<any>, key: string | symbol): any {
    if (in_array(key, VARIABLES)) {
      return model[key]
    }
    return this[key].bind(model)
  }

  isSetter(key: string | symbol, value: any, model: NajsEloquent.Model.IModel<any>): any {
    return false
  }

  proxifySetter(model: NajsEloquent.Model.IModel<any>, key: string | symbol, value: any): boolean {
    return true
  }

  getFillable(this: NajsEloquent.Model.IModel<any>): string[] {
    return ClassSetting.of(this).read('fillable', SettingType.arrayUnique([], []))
  }

  // getGuarded(): string[] {
  //   return this.mergeWithTemporarySetting('guarded', EloquentMetadata.get(this).guarded())
  // }

  // isFillable(key: string): boolean {
  //   // return this.isInWhiteList(key, this.getFillable(), this.getGuarded())
  // }

  // isGuarded(key: string): boolean {
  //   // return this.isInBlackList(key, this.getGuarded())
  // }
}
register(Fillable)
