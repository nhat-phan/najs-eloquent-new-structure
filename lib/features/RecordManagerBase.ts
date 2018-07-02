/// <reference path="../contracts/Driver.ts" />
/// <reference path="../definitions/model/IModel.ts" />
/// <reference path="../definitions/features/IRecordManager.ts" />

import { isFunction } from 'lodash'
import { array_unique } from '../util/functions'
import { snakeCase } from 'lodash'
import { plural } from 'pluralize'

/**
 * Base class of all RecordManager, handling:
 *   - getKnownAttributes() and getDynamicAttributes() accessors
 *   - finding accessors/mutators and getters/setters of model
 */
export abstract class RecordManagerBase<T> implements NajsEloquent.Feature.IRecordManager<T> {
  abstract initialize(model: NajsEloquent.Model.IModel, isGuarded: boolean, data?: T | object): void

  abstract getAttribute(model: NajsEloquent.Model.IModel, key: string): any

  abstract setAttribute<T>(model: NajsEloquent.Model.IModel, key: string, value: T): boolean

  abstract hasAttribute(model: NajsEloquent.Model.IModel, key: string): boolean

  abstract getPrimaryKeyName(model: NajsEloquent.Model.IModel): string

  abstract getClassName(): string

  getFeatureName(): string {
    return 'RecordManager'
  }

  getRecordName(model: NajsEloquent.Model.IModel): string {
    return snakeCase(plural(model.getModelName()))
  }

  getRecord(model: NajsEloquent.Model.IModel): T {
    return model['attributes']
  }

  formatAttributeName(model: NajsEloquent.Model.IModel, name: string): string {
    return snakeCase(name)
  }

  getPrimaryKey(model: NajsEloquent.Model.IModel) {
    return this.getAttribute(model, this.getPrimaryKeyName(model))
  }

  setPrimaryKey<K>(model: NajsEloquent.Model.IModel, value: K): boolean {
    return this.setAttribute(model, this.getPrimaryKeyName(model), value)
  }

  getKnownAttributes(model: NajsEloquent.Model.IModel): string[] {
    return model['sharedMetadata']['knownAttributes']
  }

  getDynamicAttributes(model: NajsEloquent.Model.IModel): NajsEloquent.Feature.DynamicAttributeSetting[] {
    return model['sharedMetadata']['dynamicAttributes']
  }

  attachPublicApi(prototype: object, bases: object[], driver: Najs.Contracts.Eloquent.Driver<any>): void {
    const knownAttributes = this.buildKnownAttributes(prototype, bases)
    const dynamicAttributes = this.buildDynamicAttributes(prototype, bases)

    Object.defineProperties(prototype['sharedMetadata'], {
      knownAttributes: {
        value: knownAttributes,
        writable: false,
        configurable: true
      },
      dynamicAttributes: {
        value: dynamicAttributes,
        writable: false,
        configurable: true
      }
    })
    this.bindAccessorsAndMutators(prototype, dynamicAttributes)
  }

  buildKnownAttributes(prototype: object, bases: object[]) {
    return array_unique(
      ['attributes', 'classSettings', 'driver', 'primaryKey'],
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

  buildDynamicAttributes(prototype: Object, bases: Object[]) {
    const dynamicAttributes = {}
    this.findGettersAndSetters(dynamicAttributes, prototype)
    this.findAccessorsAndMutators(dynamicAttributes, prototype)
    bases.forEach(basePrototype => {
      this.findGettersAndSetters(dynamicAttributes, basePrototype)
      this.findAccessorsAndMutators(dynamicAttributes, basePrototype)
    })
    return dynamicAttributes
  }

  findGettersAndSetters(dynamicAttributes: Object, prototype: Object) {
    const descriptors: Object = Object.getOwnPropertyDescriptors(prototype)
    for (const property in descriptors) {
      if (property === '__proto__') {
        continue
      }

      const getter = isFunction(descriptors[property].get)
      const setter = isFunction(descriptors[property].set)
      if (!getter && !setter) {
        continue
      }

      this.createDynamicAttributeIfNeeded(dynamicAttributes, property)
      dynamicAttributes[property].getter = getter
      dynamicAttributes[property].setter = setter
    }
  }

  createDynamicAttributeIfNeeded(bucket: Object, property: string) {
    if (!bucket[property]) {
      bucket[property] = {
        name: property,
        getter: false,
        setter: false
      }
    }
  }

  findAccessorsAndMutators(bucket: Object, prototype: any) {
    const names = Object.getOwnPropertyNames(prototype)
    const regex = new RegExp('^(get|set)([a-zA-z0-9_\\-]{1,})Attribute$', 'g')
    names.forEach(name => {
      let match
      while ((match = regex.exec(name)) != undefined) {
        // javascript RegExp has a bug when the match has length 0
        // if (match.index === regex.lastIndex) {
        //   ++regex.lastIndex
        // }
        const property: string = this.formatAttributeName(prototype, match[2])
        this.createDynamicAttributeIfNeeded(bucket, property)
        if (match[1] === 'get') {
          bucket[property].accessor = match[0]
        } else {
          bucket[property].mutator = match[0]
        }
      }
    })
  }

  bindAccessorsAndMutators(prototype: Object, dynamicAttributes: Object) {
    for (const name in dynamicAttributes) {
      const descriptor: Object | undefined = this.makeAccessorAndMutatorDescriptor(
        prototype,
        name,
        dynamicAttributes[name]
      )
      if (descriptor) {
        Object.defineProperty(prototype, name, descriptor)
      }
    }
  }

  makeAccessorAndMutatorDescriptor(
    prototype: Object,
    name: string,
    settings: NajsEloquent.Feature.DynamicAttributeSetting
  ): Object | undefined {
    // does nothing if there is a setter and a getter in there
    if (settings.getter && settings.setter) {
      return undefined
    }

    const descriptor = Object.getOwnPropertyDescriptor(prototype, name) || { configurable: true }
    if (settings.accessor && !descriptor.get) {
      descriptor.get = function() {
        return this[this['sharedMetadata']['dynamicAttributes'][name].accessor].call(this)
      }
    }

    if (settings.mutator && !descriptor.set) {
      descriptor.set = function(value: any) {
        this[this['sharedMetadata']['dynamicAttributes'][name].mutator].call(this, value)
      }
    }
    return descriptor
  }
}
