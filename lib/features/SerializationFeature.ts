/// <reference path="../definitions/model/IModel.ts" />
/// <reference path="../definitions/relations/IRelationship.ts" />
/// <reference path="../definitions/features/ISerializationFeature.ts" />

import Model = NajsEloquent.Model.IModel

import { register } from 'najs-binding'
import { FeatureBase } from './FeatureBase'
import { SerializationPublicApi } from './mixin/SerializationPublicApi'
import { NajsEloquent as NajsEloquentClasses } from '../constants'
import { isModel, isCollection } from '../util/helpers'

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

  attributesToObject(model: Model, shouldApplyVisibleAndHidden: boolean = true): object {
    const data = this.useRecordManagerOf(model).toObject(model)
    return shouldApplyVisibleAndHidden ? this.applyVisibleAndHiddenFor(model, data) : data
  }

  relationDataToObject(model: Model, data: any, chains: string[], relationName: string, formatName: boolean) {
    if (isModel(data)) {
      return this.useSerializationFeatureOf(data as Model).toObject(data as Model, chains, formatName)
    }

    if (isCollection(data)) {
      return data
        .map((nextModel: Model) => {
          return this.useSerializationFeatureOf(nextModel).toObject(nextModel, chains, formatName)
        })
        .all()
    }

    return this.useRelationFeatureOf(model).getEmptyValueForSerializedRelation(model, relationName)
  }

  relationsToObject(
    model: Model,
    names: string[] | undefined,
    formatName: boolean,
    shouldApplyVisibleAndHidden: boolean = true
  ): object {
    const relations = typeof names === 'undefined' ? model.getLoadedRelations() : model.getRelations(names)
    const data = relations.reduce((memo, relation) => {
      const relationName = relation.getName()
      const name = formatName ? model.formatAttributeName(relationName) : relationName
      memo[name] = this.relationDataToObject(model, relation.getData(), relation.getChains(), relationName, formatName)
      return memo
    }, {})

    return shouldApplyVisibleAndHidden ? this.applyVisibleAndHiddenFor(model, data) : data
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
  }

  toObject(model: Model, relations: string[] | undefined, formatName: boolean): object {
    const data = Object.assign(
      {},
      this.attributesToObject(model, false),
      this.relationsToObject(model, relations, formatName, false)
    )
    return this.applyVisibleAndHiddenFor(model, data)
  }

  toJson(model: Model, replacer?: (key: string, value: any) => any, space?: string | number): string {
    return JSON.stringify(this.toObject(model, undefined, true), replacer, space)
  }
}
register(SerializationFeature, 'NajsEloquent.Feature.SerializationFeature')
