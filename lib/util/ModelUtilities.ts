/// <reference path="../model/interfaces/IModel.ts" />

import { flatten } from 'lodash'

export class ModelUtilities {
  static pushToUniqueArraySetting(model: Object, key: string, args: ArrayLike<any>) {
    const setting: string[] = model[key] || []
    model[key] = Array.from(new Set(setting.concat(flatten(args))))
    return model[key]
  }

  static isInWhiteList(model: NajsEloquent.Model.IModel<any>, key: string, whiteList: string[], blackList: string[]) {
    if (whiteList.length > 0 && whiteList.indexOf(key) !== -1) {
      return true
    }

    if (this.isInBlackList(model, key, blackList)) {
      return false
    }

    return whiteList.length === 0 && !model.hasAttribute(key) && key.indexOf('_') !== 0
  }

  static isInBlackList(model: NajsEloquent.Model.IModel<any>, key: string, blackList: string[]) {
    return (blackList.length === 1 && blackList[0] === '*') || blackList.indexOf(key) !== -1
  }
}
