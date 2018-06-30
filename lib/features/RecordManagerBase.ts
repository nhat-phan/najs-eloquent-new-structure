/// <reference path="../contracts/Driver.ts" />
/// <reference path="../definitions/model/IModel.ts" />
/// <reference path="../definitions/features/IRecordManager.ts" />

import { array_unique } from '../util/functions'

/**
 * Base class of all RecordManager, handling:
 *   - getKnownAttributes() and getDynamicAttributes() accessors
 *   - finding accessors/mutators and getters/setters of model
 */
export abstract class RecordManagerBase<T> implements NajsEloquent.Feature.IRecordManager<T> {
  abstract initialize(model: NajsEloquent.Model.IModel, isGuarded: boolean, data?: T | object): this

  abstract getRecordName(model: NajsEloquent.Model.IModel): string

  abstract getRecord(model: NajsEloquent.Model.IModel): T

  abstract getAttribute(model: NajsEloquent.Model.IModel, key: string): any

  abstract setAttribute<T>(model: NajsEloquent.Model.IModel, key: string, value: T): boolean

  abstract getPrimaryKey(model: NajsEloquent.Model.IModel): any

  abstract setPrimaryKey<K>(model: NajsEloquent.Model.IModel, value: K): this

  abstract getPrimaryKeyName(model: NajsEloquent.Model.IModel): string

  abstract hasAttribute(model: NajsEloquent.Model.IModel, key: string): boolean

  abstract getFeatureName(): string

  abstract getClassName(): string

  getKnownAttributes(model: NajsEloquent.Model.IModel): string[] {
    return model['sharedMetadata']['knownAttributes']
  }

  getDynamicAttributes(model: NajsEloquent.Model.IModel): NajsEloquent.Feature.DynamicAttributeSetting[] {
    return model['sharedMetadata']['dynamicAttributes']
  }

  attachPublicApi(prototype: object, bases: object[], driver: Najs.Contracts.Eloquent.Driver<any>): void {}

  buildKnownAttributes(prototype: object, bases: object[]) {
    return array_unique(
      ['knownAttributes', 'dynamicAttributes', 'attributes', 'classSettings', 'driver'],
      ['relationDataBucket', 'relationsMap', 'relations'],
      ['eventEmitter'],
      ['fillable', 'guarded'],
      ['visible', 'hidden'],
      ['timestamps'],
      ['softDeletes'],
      Object.getOwnPropertyNames(prototype),
      ...bases.map(base => Object.getOwnPropertyNames(base))
    )
  }
}
