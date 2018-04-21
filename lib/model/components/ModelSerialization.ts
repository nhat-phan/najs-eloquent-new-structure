/// <reference path="../../contracts/Component.ts" />
/// <reference path="../interfaces/IModel.ts" />

import { register } from 'najs-binding'
import { NajsEloquent } from '../../constants'
import { ModelUtilities } from '../../util/ModelUtilities'

export class ModelSerialization implements Najs.Contracts.Eloquent.Component {
  static className = NajsEloquent.Model.Component.ModelSerialization
  getClassName(): string {
    return NajsEloquent.Model.Component.ModelSerialization
  }

  extend(prototype: Object, bases: Object[], driver: Najs.Contracts.Eloquent.Driver<any>): void {
    prototype['getVisible'] = ModelSerialization.getVisible
    prototype['getHidden'] = ModelSerialization.getHidden
    prototype['markVisible'] = ModelSerialization.markVisible
    prototype['markHidden'] = ModelSerialization.markHidden
    prototype['isVisible'] = ModelSerialization.isVisible
    prototype['isHidden'] = ModelSerialization.isHidden
    prototype['toObject'] = ModelSerialization.toObject
    prototype['toJSON'] = ModelSerialization.toJSON
    prototype['toJson'] = ModelSerialization.toJSON
  }

  static getVisible(this: NajsEloquent.Model.IModel<any>): string[] {
    return ModelUtilities.readArrayUniqueSetting(this, 'visible', [])
  }

  static getHidden(this: NajsEloquent.Model.IModel<any>): string[] {
    return ModelUtilities.readArrayUniqueSetting(this, 'hidden', [])
  }

  static markVisible(this: NajsEloquent.Model.IModel<any>) {
    ModelUtilities.pushToUniqueArraySetting(this, 'visible', arguments)
    return this
  }

  static markHidden(this: NajsEloquent.Model.IModel<any>) {
    ModelUtilities.pushToUniqueArraySetting(this, 'hidden', arguments)
    return this
  }

  static isVisible(this: NajsEloquent.Model.IModel<any>, key: string): boolean {
    return ModelUtilities.isVisible(this, key)
  }

  static isHidden(this: NajsEloquent.Model.IModel<any>, key: string): boolean {
    return ModelUtilities.isInBlackList(key, this.getHidden())
  }

  static toObject(this: NajsEloquent.Model.IModel<any>, data: Object): Object {
    return this['driver'].toObject()
  }

  static toJSON(this: NajsEloquent.Model.IModel<any>): Object {
    const data = this.toObject(),
      visible = this.getVisible(),
      hidden = this.getHidden()

    return Object.getOwnPropertyNames(data).reduce((memo, name) => {
      if (ModelUtilities.isInWhiteList(this, name, visible, hidden)) {
        memo[name] = data[name]
      }
      return memo
    }, {})
  }
}
register(ModelSerialization)
