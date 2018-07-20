/// <reference path="../definitions/model/IModel.ts" />
/// <reference path="../definitions/features/ISerializationFeature.ts" />

import { register } from 'najs-binding'
import { FeatureBase } from './FeatureBase'
import { SerializationPublicApi } from './mixin/SerializationPublicApi'
import { NajsEloquent } from '../constants'

export class SerializationFeature extends FeatureBase implements NajsEloquent.Feature.ISerializationFeature {
  getPublicApi(): object {
    return SerializationPublicApi
  }

  getFeatureName(): string {
    return 'Serialization'
  }

  getClassName(): string {
    return NajsEloquent.Feature.SerializationFeature
  }

  getVisible(model: NajsEloquent.Model.IModel): string[] {
    return this.useSettingFeatureOf(model).getArrayUniqueSetting(model, 'visible', [])
  }

  getHidden(model: NajsEloquent.Model.IModel): string[] {
    return this.useSettingFeatureOf(model).getArrayUniqueSetting(model, 'hidden', [])
  }

  markVisible(model: NajsEloquent.Model.IModel, keys: ArrayLike<Array<string | string[]>>): void {
    return this.useSettingFeatureOf(model).pushToUniqueArraySetting(model, 'visible', keys)
  }

  markHidden(model: NajsEloquent.Model.IModel, keys: ArrayLike<Array<string | string[]>>): void {
    return this.useSettingFeatureOf(model).pushToUniqueArraySetting(model, 'hidden', keys)
  }

  isVisible(model: NajsEloquent.Model.IModel, keys: ArrayLike<Array<string | string[]>>): boolean {
    return this.useSettingFeatureOf(model).isInWhiteList(model, keys, this.getVisible(model), this.getHidden(model))
  }

  isHidden(model: NajsEloquent.Model.IModel, keys: ArrayLike<Array<string | string[]>>): boolean {
    return this.useSettingFeatureOf(model).isInBlackList(model, keys, this.getHidden(model))
  }

  toObject(model: NajsEloquent.Model.IModel): object {
    return this.useRecordManagerOf(model).toObject(model)
  }

  toJson(model: NajsEloquent.Model.IModel): object {
    const data = this.toObject(model),
      visible = this.getVisible(model),
      hidden = this.getHidden(model)

    const settingFeature = this.useSettingFeatureOf(model)
    return Object.getOwnPropertyNames(data).reduce((memo, name) => {
      if (settingFeature.isKeyInWhiteList(model, name, visible, hidden)) {
        memo[name] = data[name]
      }
      return memo
    }, {})
  }
}
register(SerializationFeature, 'NajsEloquent.Feature.SerializationFeature')
