/// <reference path="../contracts/Driver.ts" />

import { CREATE_SAMPLE } from '../util/ClassSetting'
import { find_base_prototypes } from '../util/functions'

/**
 * Base class of all drivers, handling:
 *   - generic initialize for makeModel()
 *   - attachPublicApi logic, ensure that the model prototype should be attached 1 time only.
 */
export abstract class DriverBase<T> implements Najs.Contracts.Eloquent.Driver<T> {
  protected attachedModels = {}

  abstract getClassName(): string

  abstract getRecordManager(): NajsEloquent.Feature.IRecordManager<T>

  abstract getFillableFeature(): NajsEloquent.Feature.IFillableFeature

  abstract getSettingFeature(): NajsEloquent.Feature.ISettingFeature

  makeModel<M extends NajsEloquent.Model.IModel>(model: M, data?: T | object | string, isGuarded?: boolean): M {
    if (data === CREATE_SAMPLE) {
      return model
    }

    this.getRecordManager().initialize(model, !!isGuarded, data as T | object | undefined)
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

  getFeatures() {
    return [
      this.getFillableFeature(),
      this.getSettingFeature(),
      // RecordManager must be attached after other features
      this.getRecordManager()
    ]
  }

  attachFeatureIfNeeded(feature: NajsEloquent.Feature.IFeature, prototype: object, bases: object[]) {
    if (typeof prototype['sharedMetadata'] === 'undefined') {
      prototype['sharedMetadata'] = {}
    }

    if (typeof prototype['sharedMetadata']['features'] === 'undefined') {
      prototype['sharedMetadata']['features'] = {}
    }

    if (typeof prototype['sharedMetadata']['features'][feature.getFeatureName()]) {
      feature.attachPublicApi(prototype, bases, this)
      prototype['sharedMetadata']['features'][feature.getFeatureName()] = true
    }
  }
}
