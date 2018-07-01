/// <reference path="../definitions/model/IModel.ts" />
/// <reference path="../definitions/model/IModelFillable.ts" />
/// <reference path="../definitions/features/IFillableFeature.ts" />
/// <reference path="../definitions/features/ISettingFeature.ts" />

import { pick } from 'lodash'
import { register } from 'najs-binding'
import { FillablePublicApi } from './FillablePublicApi'
import { NajsEloquent } from '../constants'

export class FillableFeature {
  attachPublicApi(prototype: object, bases: object[], driver: Najs.Contracts.Eloquent.Driver<any>): void {
    Object.assign(prototype, FillablePublicApi)
  }

  getFeatureName(): string {
    return 'Fillable'
  }

  getClassName(): string {
    return NajsEloquent.Feature.FillableFeature
  }

  getSettingFeature(model: NajsEloquent.Model.IModel): NajsEloquent.Feature.ISettingFeature {
    return model.getDriver().getSettingFeature()
  }

  getFillable(model: NajsEloquent.Model.IModel): string[] {
    return this.getSettingFeature(model).getArrayUniqueSetting(model, 'fillable', [])
  }

  getGuarded(model: NajsEloquent.Model.IModel): string[] {
    return this.getSettingFeature(model).getArrayUniqueSetting(model, 'guarded', ['*'])
  }

  markFillable(model: NajsEloquent.Model.IModel, keys: ArrayLike<Array<string | string[]>>): void {
    return this.getSettingFeature(model).pushToUniqueArraySetting(model, 'fillable', keys)
  }

  markGuarded(model: NajsEloquent.Model.IModel, keys: ArrayLike<Array<string | string[]>>): void {
    return this.getSettingFeature(model).pushToUniqueArraySetting(model, 'guarded', keys)
  }

  isFillable(model: NajsEloquent.Model.IModel, keys: ArrayLike<Array<string | string[]>>): boolean {
    return this.getSettingFeature(model).isInWhiteList(model, keys, this.getFillable(model), this.getGuarded(model))
  }

  isGuarded(model: NajsEloquent.Model.IModel, keys: ArrayLike<Array<string | string[]>>): boolean {
    return this.getSettingFeature(model).isInBlackList(model, keys, this.getGuarded(model))
  }

  fill(model: NajsEloquent.Model.IModel, data: Object): void {
    const fillable = this.getFillable(model)
    const guarded = this.getGuarded(model)

    const attributes = fillable.length > 0 ? pick(data, fillable) : data
    const settingFeature = model.getDriver().getSettingFeature()
    const recordManager = model.getDriver().getRecordManager()

    for (const key in attributes) {
      if (settingFeature.isKeyInWhiteList(model, key, fillable, guarded)) {
        recordManager.setAttribute(model, key, attributes[key])
      }
    }
  }

  forceFill(model: NajsEloquent.Model.IModel, data: Object): void {
    const recordManager = model.getDriver().getRecordManager()
    for (const key in data) {
      recordManager.setAttribute(model, key, data[key])
    }
  }
}
register(FillableFeature, NajsEloquent.Feature.FillableFeature)
