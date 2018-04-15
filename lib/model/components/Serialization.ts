/// <reference path="../../contracts/Component.ts" />
/// <reference path="../interfaces/IModel.ts" />

import { register } from 'najs-binding'
import { NajsEloquent } from '../../constants'
import { ClassSetting } from '../../util/ClassSetting'
import { SettingType } from '../../util/SettingType'
import { ModelUtilities } from '../../util/ModelUtilities'

export class Serialization implements Najs.Contracts.Eloquent.Component {
  getClassName(): string {
    return NajsEloquent.Model.Component.Serialization
  }

  extend(prototype: Object): void {
    prototype['getVisible'] = Serialization.getVisible
    prototype['getHidden'] = Serialization.getHidden
    prototype['markVisible'] = Serialization.markVisible
    prototype['markHidden'] = Serialization.markHidden
    prototype['isVisible'] = Serialization.isVisible
    prototype['isHidden'] = Serialization.isHidden
    prototype['toObject'] = Serialization.toObject
    prototype['toJSON'] = Serialization.toJSON
    prototype['toJson'] = Serialization.toJSON
  }

  static getVisible(this: NajsEloquent.Model.IModel<any>): string[] {
    return ClassSetting.of(this).read('visible', SettingType.arrayUnique([], []))
  }

  static getHidden(this: NajsEloquent.Model.IModel<any>): string[] {
    return ClassSetting.of(this).read('hidden', SettingType.arrayUnique([], []))
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
    return ModelUtilities.isInWhiteList(this, key, this.getVisible(), this.getHidden())
  }

  static isHidden(this: NajsEloquent.Model.IModel<any>, key: string): boolean {
    return ModelUtilities.isInBlackList(this, key, this.getHidden())
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
register(Serialization)
