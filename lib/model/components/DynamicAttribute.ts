/// <reference path="../../contracts/Component.ts" />
/// <reference path="../interfaces/IModel.ts" />

import { NajsEloquent } from '../../constants'
import { array_unique } from '../../util/functions'
import { isFunction } from 'lodash'

export class DynamicAttribute implements Najs.Contracts.Eloquent.Component {
  getClassName(): string {
    return NajsEloquent.Model.Component.DynamicAttribute
  }

  extend(prototype: Object, bases: Object[], driver: Najs.Contracts.Eloquent.Driver<any>): void {
    prototype['hasAttribute'] = DynamicAttribute.hasAttribute
    Object.defineProperties(prototype, {
      knownAttributes: {
        value: DynamicAttribute.buildKnownAttributes(prototype, bases),
        writable: false
      },
      dynamicAttributes: {
        value: DynamicAttribute.buildDynamicAttributes(prototype, bases, driver),
        writable: false
      }
    })
  }

  static hasAttribute(this: NajsEloquent.Model.IModel<any>, key: string): boolean {
    return this['knownAttributes'].indexOf(key) !== -1 || this['driver'].hasAttribute(key)
  }

  static buildDynamicAttributes(prototype: Object, bases: Object[], driver: Najs.Contracts.Eloquent.Driver<any>) {
    const dynamicAttributes = {}
    this.findGettersAndSetters(dynamicAttributes, prototype)
    this.findAccessorsAndMutators(dynamicAttributes, prototype, driver)
    bases.forEach(basePrototype => {
      this.findGettersAndSetters(dynamicAttributes, basePrototype)
      this.findAccessorsAndMutators(dynamicAttributes, basePrototype, driver)
    })
    return dynamicAttributes
  }

  static findGettersAndSetters(dynamicAttributes: Object, prototype: Object) {
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

  static findAccessorsAndMutators(bucket: Object, prototype: any, driver: Najs.Contracts.Eloquent.Driver<any>) {
    const names = Object.getOwnPropertyNames(prototype)
    const regex = new RegExp('^(get|set)([a-zA-z0-9_\\-]{1,})Attribute$', 'g')
    names.forEach(name => {
      let match
      while ((match = regex.exec(name)) != undefined) {
        // javascript RegExp has a bug when the match has length 0
        // if (match.index === regex.lastIndex) {
        //   ++regex.lastIndex
        // }
        const property: string = driver.formatAttributeName(match[2])
        this.createDynamicAttributeIfNeeded(bucket, property)
        if (match[1] === 'get') {
          bucket[property].accessor = match[0]
        } else {
          bucket[property].mutator = match[0]
        }
      }
    })
  }

  static createDynamicAttributeIfNeeded(bucket: Object, property: string) {
    if (!bucket[property]) {
      bucket[property] = {
        name: property,
        getter: false,
        setter: false
      }
    }
  }

  static buildKnownAttributes(prototype: Object, bases: Object[]) {
    return array_unique(
      ['knownAttributes', 'dynamicAttributes'],
      ['fillable', 'guarded'],
      ['visible', 'hidden'],
      ['timestamps'],
      ['softDeletes'],
      Object.getOwnPropertyNames(prototype),
      ...bases.map(base => Object.getOwnPropertyNames(base))
    )
  }
}
