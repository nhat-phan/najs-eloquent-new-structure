/// <reference path="../definitions/model/IModel.ts" />
/// <reference path="../definitions/features/IFillableFeature.ts" />

import { pick } from 'lodash'
import { register } from 'najs-binding'
import { FeatureBase } from './FeatureBase'
import { FillablePublicApi } from './FillablePublicApi'
import { NajsEloquent } from '../constants'

export class FillableFeature extends FeatureBase implements NajsEloquent.Feature.IFillableFeature {
  attachPublicApi(prototype: object, bases: object[], driver: Najs.Contracts.Eloquent.Driver<any>): void {
    Object.assign(prototype, FillablePublicApi)
  }

  getFeatureName(): string {
    return 'Fillable'
  }

  getClassName(): string {
    return NajsEloquent.Feature.FillableFeature
  }

  getFillable(model: NajsEloquent.Model.IModel): string[] {
    return this.useSettingFeatureOf(model).getArrayUniqueSetting(model, 'fillable', [])
  }

  getGuarded(model: NajsEloquent.Model.IModel): string[] {
    return this.useSettingFeatureOf(model).getArrayUniqueSetting(model, 'guarded', ['*'])
  }

  markFillable(model: NajsEloquent.Model.IModel, keys: ArrayLike<Array<string | string[]>>): void {
    return this.useSettingFeatureOf(model).pushToUniqueArraySetting(model, 'fillable', keys)
  }

  markGuarded(model: NajsEloquent.Model.IModel, keys: ArrayLike<Array<string | string[]>>): void {
    return this.useSettingFeatureOf(model).pushToUniqueArraySetting(model, 'guarded', keys)
  }

  isFillable(model: NajsEloquent.Model.IModel, keys: ArrayLike<Array<string | string[]>>): boolean {
    return this.useSettingFeatureOf(model).isInWhiteList(model, keys, this.getFillable(model), this.getGuarded(model))
  }

  isGuarded(model: NajsEloquent.Model.IModel, keys: ArrayLike<Array<string | string[]>>): boolean {
    return this.useSettingFeatureOf(model).isInBlackList(model, keys, this.getGuarded(model))
  }

  fill(model: NajsEloquent.Model.IModel, data: object): void {
    const fillable = this.getFillable(model)
    const guarded = this.getGuarded(model)

    const attributes = fillable.length > 0 ? pick(data, fillable) : data
    const settingFeature = this.useSettingFeatureOf(model)
    const recordManager = this.useRecordManagerOf(model)

    for (const key in attributes) {
      if (settingFeature.isKeyInWhiteList(model, key, fillable, guarded)) {
        recordManager.setAttribute(model, key, attributes[key])
      }
    }
  }

  forceFill(model: NajsEloquent.Model.IModel, data: object): void {
    const recordManager = model.getDriver().getRecordManager()
    for (const key in data) {
      recordManager.setAttribute(model, key, data[key])
    }
  }
}
register(FillableFeature, NajsEloquent.Feature.FillableFeature)
