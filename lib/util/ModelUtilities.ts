import { flatten } from 'lodash'

export class ModelUtilities {
  static pushToUniqueArraySetting(model: Object, key: string, args: ArrayLike<any>) {
    const setting: string[] = model[key] || []
    model[key] = Array.from(new Set(setting.concat(flatten(args))))
    return model[key]
  }
}
