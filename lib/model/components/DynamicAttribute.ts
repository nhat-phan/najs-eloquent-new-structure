/// <reference path="../../contracts/Component.ts" />
/// <reference path="../interfaces/IModel.ts" />

import { NajsEloquent } from '../../constants'
import { array_unique } from '../../util/functions'

export class DynamicAttribute implements Najs.Contracts.Eloquent.Component {
  getClassName(): string {
    return NajsEloquent.Model.Component.Attribute
  }

  extend(prototype: Object, eloquentPrototype: Object): void {
    prototype['hasAttribute'] = DynamicAttribute.hasAttribute
  }

  static hasAttribute(this: NajsEloquent.Model.IModel<any>, key: string): boolean {
    if (typeof this['knownAttributes'] === 'undefined') {
      DynamicAttribute.buildKnownAttributes(this)
    }
    if (this['knownAttributes'].indexOf(key) !== -1) {
      return true
    }
    return this['driver'].hasAttribute(key)
  }

  static buildKnownAttributes(model: NajsEloquent.Model.IModel<any>) {
    model['knownAttributes'] = array_unique(
      Object.getOwnPropertyNames(model),
      Object.getOwnPropertyNames(Object.getPrototypeOf(model))
    )
  }
}
