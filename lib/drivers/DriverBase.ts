/// <reference types="najs-event" />
/// <reference path="../contracts/Driver.ts" />
/// <reference path="../definitions/features/ISettingFeature.ts" />
/// <reference path="../definitions/features/IEventFeature.ts" />
/// <reference path="../definitions/features/IFillableFeature.ts" />
/// <reference path="../definitions/features/ISerializationFeature.ts" />
/// <reference path="../definitions/features/ITimestampsFeature.ts" />
/// <reference path="../definitions/query-builders/IQueryBuilder.ts" />

import IModel = NajsEloquent.Model.IModel
import IQueryBuilder = NajsEloquent.QueryBuilder.IQueryBuilder

import '../features/SettingFeature'
import '../features/EventFeature'
import '../features/FillableFeature'
import '../features/SerializationFeature'
import '../features/TimestampsFeature'
import '../features/SoftDeletesFeature'
import { make } from 'najs-binding'
import { EventEmitterFactory } from 'najs-event'
import { CREATE_SAMPLE } from '../util/ClassSetting'
import { find_base_prototypes } from '../util/functions'
import { NajsEloquent as NajsEloquentClasses } from '../constants'

/**
 * Base class of all drivers, handling:
 *   - generic initialize for makeModel()
 *   - make common/share features
 *   - attachPublicApi logic, ensure that the model prototype should be attached 1 time only.
 */
export abstract class DriverBase<T> implements Najs.Contracts.Eloquent.Driver<T> {
  protected attachedModels: object
  protected settingFeature: NajsEloquent.Feature.ISettingFeature
  protected eventFeature: NajsEloquent.Feature.IEventFeature
  protected fillableFeature: NajsEloquent.Feature.IFillableFeature
  protected serializationFeature: NajsEloquent.Feature.ISerializationFeature
  protected timestampsFeature: NajsEloquent.Feature.ITimestampsFeature
  protected softDeletesFeature: NajsEloquent.Feature.ISoftDeletesFeature
  protected static globalEventEmitter: Najs.Contracts.Event.AsyncEventEmitter

  constructor() {
    this.attachedModels = {}
    this.settingFeature = make(NajsEloquentClasses.Feature.SettingFeature)
    this.eventFeature = make(NajsEloquentClasses.Feature.EventFeature)
    this.fillableFeature = make(NajsEloquentClasses.Feature.FillableFeature)
    this.serializationFeature = make(NajsEloquentClasses.Feature.SerializationFeature)
    this.timestampsFeature = make(NajsEloquentClasses.Feature.TimestampsFeature)
    this.softDeletesFeature = make(NajsEloquentClasses.Feature.SoftDeletesFeature)

    if (typeof DriverBase.globalEventEmitter === 'undefined') {
      DriverBase.globalEventEmitter = EventEmitterFactory.create(true)
    }
  }

  abstract getClassName(): string

  abstract getRecordManager(): NajsEloquent.Feature.IRecordManager<T>

  abstract newQuery<M extends IModel>(model: M, name?: string): IQueryBuilder<M>

  getSettingFeature() {
    return this.settingFeature
  }

  getEventFeature() {
    return this.eventFeature
  }

  getFillableFeature() {
    return this.fillableFeature
  }

  getSerializationFeature() {
    return this.serializationFeature
  }

  getTimestampsFeature() {
    return this.timestampsFeature
  }

  getSoftDeletesFeature() {
    return this.softDeletesFeature
  }

  getGlobalEventEmitter() {
    return DriverBase.globalEventEmitter
  }

  makeModel<M extends IModel>(model: M, data?: T | object | string, isGuarded: boolean = true): M {
    if (data === CREATE_SAMPLE) {
      return model
    }

    this.getRecordManager().initialize(model, isGuarded, data as T | object | undefined)
    this.attachPublicApiIfNeeded(model)

    return model
  }

  attachPublicApiIfNeeded(model: IModel) {
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
    return [
      this.getSettingFeature(),
      this.getEventFeature(),
      this.getFillableFeature(),
      this.getSerializationFeature(),
      this.getTimestampsFeature(),
      this.getSoftDeletesFeature()
    ]
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
