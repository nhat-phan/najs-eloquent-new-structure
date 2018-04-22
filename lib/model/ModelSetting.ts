import { ClassSetting } from '../util/ClassSetting'
import { array_unique } from '../util/functions'
import { flatten } from 'lodash'

export class ModelSetting {
  model: NajsEloquent.Model.IModel<any>
  setting: ClassSetting

  constructor(model: NajsEloquent.Model.IModel<any>) {
    this.model = model
    this.setting = ClassSetting.of(model)
  }

  // getSettingProperty<T extends any>(property: string, defaultValue: T): T {
  //   return this.getClassSetting().read(property, function(staticVersion?: any, sampleVersion?: any) {
  //     if (staticVersion) {
  //       return staticVersion
  //     }
  //     return sampleVersion ? sampleVersion : defaultValue
  //   })
  // }

  isInWhiteList(key: string, whiteList: string[], blackList: string[]) {
    if (whiteList.length > 0 && whiteList.indexOf(key) !== -1) {
      return true
    }

    if (this.isInBlackList(key, blackList)) {
      return false
    }

    return whiteList.length === 0 && !this.model.hasAttribute(key) && key.indexOf('_') !== 0
  }

  isInBlackList(key: string, blackList: string[]) {
    return (blackList.length === 1 && blackList[0] === '*') || blackList.indexOf(key) !== -1
  }

  pushToUniqueArraySetting(key: string, args: ArrayLike<any>) {
    const setting: string[] = this.model[key] || []
    this.model[key] = array_unique(setting, flatten(args))
    return this.model[key]
  }

  // hasSetting(property: string): boolean {
  //   return !!this.getSettingProperty(property, false)
  // }
}
