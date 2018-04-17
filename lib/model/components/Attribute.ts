/// <reference path="../../contracts/Component.ts" />
/// <reference path="../interfaces/IModel.ts" />

import { NajsEloquent } from '../../constants'

export class Attribute implements Najs.Contracts.Eloquent.Component {
  getClassName(): string {
    return NajsEloquent.Model.Component.Attribute
  }

  extend(prototype: Object, eloquentPrototype: Object): void {
    prototype['getAttribute'] = Attribute.getAttribute
    prototype['setAttribute'] = Attribute.setAttribute
    prototype['getPrimaryKey'] = Attribute.getPrimaryKey
    prototype['setPrimaryKey'] = Attribute.setPrimaryKey
    prototype['getPrimaryKeyName'] = Attribute.getPrimaryKeyName
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
