/// <reference path="../contracts/Driver.ts" />
/// <reference path="../definitions/features/ISettingFeature.ts" />
/// <reference path="../definitions/features/IFillableFeature.ts" />
/// <reference path="../definitions/features/ISerializationFeature.ts" />

import '../features/FillableFeature'
import '../features/SettingFeature'
import '../features/SerializationFeature'
import { make } from 'najs-binding'
import { CREATE_SAMPLE } from '../util/ClassSetting'
import { find_base_prototypes } from '../util/functions'
import { NajsEloquent } from '../constants'

/**
 * Base class of all drivers, handling:
 *   - generic initialize for makeModel()
 *   - make common/share features
 *   - attachPublicApi logic, ensure that the model prototype should be attached 1 time only.
 */
export abstract class DriverBase<T> implements Najs.Contracts.Eloquent.Driver<T> {
  protected attachedModels: object
  protected settingFeature: NajsEloquent.Feature.ISettingFeature
  protected fillableFeature: NajsEloquent.Feature.IFillableFeature
  protected serializationFeature: NajsEloquent.Feature.ISerializationFeature

  constructor() {
    this.attachedModels = {}
    this.settingFeature = make(NajsEloquent.Feature.SettingFeature)
    this.fillableFeature = make(NajsEloquent.Feature.FillableFeature)
    this.serializationFeature = make(NajsEloquent.Feature.SerializationFeature)
  }

  abstract getClassName(): string

  abstract getRecordManager(): NajsEloquent.Feature.IRecordManager<T>

  getSettingFeature() {
    return this.settingFeature
  }

  getFillableFeature() {
    return this.fillableFeature
  }

  getSerializationFeature() {
    return this.serializationFeature
  }

  makeModel<M extends NajsEloquent.Model.IModel>(model: M, data?: T | object | string, isGuarded: boolean = true): M {
    if (data === CREATE_SAMPLE) {
      return model
    }

    this.getRecordManager().initialize(model, isGuarded, data as T | object | undefined)
    this.attachPublicApiIfNeeded(model)

    return model
  }

  attachPublicApiIfNeeded(model: NajsEloquent.Model.IModel) {
    if (typeof this.attachedModels[model.getModelName()] !== 'undefined') {
      return
    }

    const prototype = Object.getPrototypeOf(model)
    const bases = find_base_prototypes(prototype, Object.prototype)

    this.attachedModels[model.getModelName()] = {
      prototype: prototype,
      bases: bases
    }

    const features = this.getFeatures()
    for (const feature of features) {
      this.attachFeatureIfNeeded(feature, prototype, bases)
    }
  }

  getSharedFeatures(): NajsEloquent.Feature.IFeature[] {
    return [this.getFillableFeature(), this.getSettingFeature()]
  }

  getCustomFeatures(): NajsEloquent.Feature.IFeature[] {
    return []
  }

  getFeatures(): NajsEloquent.Feature.IFeature[] {
    return ([] as NajsEloquent.Feature.IFeature[]).concat(this.getSharedFeatures(), this.getCustomFeatures(), [
      // RecordManager must be attached after other features
      this.getRecordManager()
    ])
  }

  attachFeatureIfNeeded(feature: NajsEloquent.Feature.IFeature, prototype: object, bases: object[]) {
    if (typeof prototype['sharedMetadata'] === 'undefined') {
      prototype['sharedMetadata'] = {}
    }

    if (typeof prototype['sharedMetadata']['features'] === 'undefined') {
      prototype['sharedMetadata']['features'] = {}
    }

    if (!prototype['sharedMetadata']['features'][feature.getFeatureName()]) {
      feature.attachPublicApi(prototype, bases, this)
      prototype['sharedMetadata']['features'][feature.getFeatureName()] = true
    }
  }
}
