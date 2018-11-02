/// <reference path="../definitions/model/IModel.ts" />
/// <reference path="../definitions/features/ISerializationFeature.ts" />

import Model = NajsEloquent.Model.IModel

import { register } from 'najs-binding'
import { FeatureBase } from './FeatureBase'
import { SerializationPublicApi } from './mixin/SerializationPublicApi'
import { NajsEloquent as NajsEloquentClasses } from '../constants'
// import { isModel, isCollection } from '../util/helpers'

export class SerializationFeature extends FeatureBase implements NajsEloquent.Feature.ISerializationFeature {
  getPublicApi(): object {
    return SerializationPublicApi
  }

  getFeatureName(): string {
    return 'Serialization'
  }

  getClassName(): string {
    return NajsEloquentClasses.Feature.SerializationFeature
  }

  getVisible(model: Model): string[] {
    return this.useSettingFeatureOf(model).getArrayUniqueSetting(model, 'visible', [])
  }

  getHidden(model: Model): string[] {
    return this.useSettingFeatureOf(model).getArrayUniqueSetting(model, 'hidden', [])
  }

  markVisible(model: Model, keys: ArrayLike<Array<string | string[]>>): void {
    return this.useSettingFeatureOf(model).pushToUniqueArraySetting(model, 'visible', keys)
  }

  markHidden(model: Model, keys: ArrayLike<Array<string | string[]>>): void {
    return this.useSettingFeatureOf(model).pushToUniqueArraySetting(model, 'hidden', keys)
  }

  isVisible(model: Model, keys: ArrayLike<Array<string | string[]>>): boolean {
    return this.useSettingFeatureOf(model).isInWhiteList(model, keys, this.getVisible(model), this.getHidden(model))
  }

  isHidden(model: Model, keys: ArrayLike<Array<string | string[]>>): boolean {
    return this.useSettingFeatureOf(model).isInBlackList(model, keys, this.getHidden(model))
  }

  attributesToObject(model: Model): object {
    return this.applyVisibleAndHiddenFor(model, this.useRecordManagerOf(model).toObject(model))
  }

  applyVisibleAndHiddenFor(model: Model, data: object) {
    const visible = this.getVisible(model),
      hidden = this.getHidden(model)

    const settingFeature = this.useSettingFeatureOf(model)
    return Object.getOwnPropertyNames(data).reduce((memo, name) => {
      if (settingFeature.isKeyInWhiteList(model, name, visible, hidden)) {
        memo[name] = data[name]
      }
      return memo
    }, {})

    // if (includeRelationsData) {
    //   const loaded = this.useRelationFeatureOf(model).getLoadedRelations(model)
    //   for (const name of loaded) {
    //     const relationData = this.useRelationFeatureOf(model)
    //       .findDataByName(model, name)
    //       .getData()

    //     if (isModel(relationData)) {
    //       data[name] = (relationData as Model).toJson()
    //       continue
    //     }

    //     if (isCollection(relationData)) {
    //       data[name] = (relationData as any).map((item: any) => item.toJson()).all()
    //     }
    //   }
    // }
  }

  toObject(model: Model): object {
    // TODO: remove this logic
    return this.useRecordManagerOf(model).toObject(model)
  }

  toJson(model: Model, replacer?: (key: string, value: any) => any, space?: string | number): string {
    return JSON.stringify(this.toObject(model), replacer, space)
  }
}
register(SerializationFeature, 'NajsEloquent.Feature.SerializationFeature')
