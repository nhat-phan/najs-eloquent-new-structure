/// <reference path="../../contracts/Component.ts" />
/// <reference path="../interfaces/IModel.ts" />

import { NajsEloquent } from '../../constants'
import { ClassSetting } from '../../util/ClassSetting'

export class ModelTimestamps implements Najs.Contracts.Eloquent.Component {
  static className = NajsEloquent.Model.Component.ModelTimestamps
  getClassName(): string {
    return NajsEloquent.Model.Component.ModelTimestamps
  }

  extend(prototype: Object, bases: Object[], driver: Najs.Contracts.Eloquent.Driver<any>): void {
    prototype['touch'] = ModelTimestamps.touch
    prototype['hasTimestamps'] = ModelTimestamps.hasTimestamps
    prototype['getTimestampsSetting'] = ModelTimestamps.getTimestampsSetting
  }

  static hasTimestamps(this: NajsEloquent.Model.IModel<any>) {
    return ClassSetting.of(this).read('timestamps', function(staticVersion: any, sample: any) {
      return typeof staticVersion !== 'undefined' || typeof sample !== 'undefined'
    })
  }

  static getTimestampsSetting(this: NajsEloquent.Model.IModel<any>) {}

  static touch(this: NajsEloquent.Model.IModel<any>) {
    if (this.hasTimestamps()) {
      const settings = this.getTimestampsSetting()
      if (settings) {
        this['driver'].markModified(settings.updatedAt)
      }
    }
    return this
  }
}
