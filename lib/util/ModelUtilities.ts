/// <reference path="../model/interfaces/IModel.ts" />

import { flatten } from 'lodash'
import { array_unique } from '../util/functions'
import { ClassSetting } from './ClassSetting'
import { SettingType } from './SettingType'

export class ModelUtilities {
  static readArrayUniqueSetting(model: Object, setting: string, defaultValue: string[]): string[] {
    return ClassSetting.of(model).read(setting, SettingType.arrayUnique([], defaultValue))
  }

  static pushToUniqueArraySetting(model: Object, key: string, args: ArrayLike<any>) {
    const setting: string[] = model[key] || []
    model[key] = array_unique(setting, flatten(args))
    return model[key]
  }

  static isVisible(model: NajsEloquent.Model.IModel<any>, key: string) {
    return this.isInWhiteList(model, key, model.getVisible(), model.getHidden())
  }

  static isFillable(model: NajsEloquent.Model.IModel<any>, key: string) {
    return this.isInWhiteList(model, key, model.getFillable(), model.getGuarded())
  }

  static isInWhiteList(model: NajsEloquent.Model.IModel<any>, key: string, whiteList: string[], blackList: string[]) {
    if (whiteList.length > 0 && whiteList.indexOf(key) !== -1) {
      return true
    }

    if (this.isInBlackList(key, blackList)) {
      return false
    }

    return whiteList.length === 0 && !model.hasAttribute(key) && key.indexOf('_') !== 0
  }

  static isInBlackList(key: string, blackList: string[]) {
    return (blackList.length === 1 && blackList[0] === '*') || blackList.indexOf(key) !== -1
  }
}
