/// <reference path="../../contracts/Component.ts" />
/// <reference path="../interfaces/IModel.ts" />

import { NajsEloquent } from '../../constants'

export class Attribute implements Najs.Contracts.Eloquent.Component {
  getClassName(): string {
    return NajsEloquent.Model.Component.Attribute
  }

  extend(prototype: Object): void {
    prototype['hasAttribute'] = Attribute.hasAttribute
    prototype['getAttribute'] = Attribute.getAttribute
    prototype['setAttribute'] = Attribute.setAttribute
    prototype['getPrimaryKey'] = Attribute.getPrimaryKey
    prototype['setPrimaryKey'] = Attribute.setPrimaryKey
    prototype['getPrimaryKeyName'] = Attribute.getPrimaryKeyName
  }

  static hasAttribute(this: NajsEloquent.Model.IModel<any>, key: string): boolean {
    if (typeof this['knownAttributes'] === 'undefined') {
      Attribute.buildKnownAttributes(this)
    }
    if (this['knownAttributes'].indexOf(key) !== -1) {
      return true
    }
    return this['driver'].hasAttribute(key)
  }

  static buildKnownAttributes(model: NajsEloquent.Model.IModel<any>) {
    model['knownAttributes'] = Array.from(
      new Set(Object.getOwnPropertyNames(model).concat(Object.getOwnPropertyNames(Object.getPrototypeOf(model))))
    )
  }

  static getAttribute(this: NajsEloquent.Model.IModel<any>, key: string): any {
    return this['driver'].getAttribute(key)
  }

  static setAttribute(this: NajsEloquent.Model.IModel<any>, key: string, value: any) {
    this['driver'].setAttribute(key, value)

    return this
  }

  static getPrimaryKey(this: NajsEloquent.Model.IModel<any>): any {
    return this['driver'].getAttribute(this.getPrimaryKeyName())
  }

  static setPrimaryKey(this: NajsEloquent.Model.IModel<any>, id: any) {
    this['driver'].setAttribute(this.getPrimaryKeyName(), id)

    return this
  }

  static getPrimaryKeyName(this: NajsEloquent.Model.IModel<any>): string {
    return this['driver'].getPrimaryKeyName()
  }
}
