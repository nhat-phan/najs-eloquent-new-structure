/// <reference path="../definitions/features/IRecordManager.ts" />
/// <reference path="../definitions/features/IFillableFeature.ts" />
/// <reference path="../definitions/features/ISettingFeature.ts" />

import '../features/RecordManager'
import '../features/FillableFeature'
import '../features/SettingFeature'
import { register, make } from 'najs-binding'
import { DriverBase } from './DriverBase'
import { Record } from '../features/Record'
import { NajsEloquent } from '../constants'

export class DummyDriver<T extends Record = Record> extends DriverBase<T> {
  protected recordManager: NajsEloquent.Feature.IRecordManager<T>
  protected fillableFeature: NajsEloquent.Feature.IFillableFeature
  protected settingFeature: NajsEloquent.Feature.ISettingFeature

  constructor() {
    super()

    this.recordManager = make(NajsEloquent.Feature.RecordManager)
    this.fillableFeature = make(NajsEloquent.Feature.FillableFeature)
    this.settingFeature = make(NajsEloquent.Feature.SettingFeature)
  }

  getClassName() {
    return NajsEloquent.Driver.DummyDriver
  }

  getRecordManager() {
    return this.recordManager
  }

  getFillableFeature() {
    return this.fillableFeature
  }

  getSettingFeature() {
    return this.settingFeature
  }
}
register(DummyDriver, NajsEloquent.Driver.DummyDriver)
