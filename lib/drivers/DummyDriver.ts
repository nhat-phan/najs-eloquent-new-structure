/// <reference path="../definitions/features/IRecordManager.ts" />

import '../features/RecordManager'
import { register, make } from 'najs-binding'
import { DriverBase } from './DriverBase'
import { Record } from '../features/Record'
import { NajsEloquent } from '../constants'

export class DummyDriver<T extends Record = Record> extends DriverBase<T> {
  protected recordManager: NajsEloquent.Feature.IRecordManager<T>

  constructor() {
    super()

    this.recordManager = make(NajsEloquent.Feature.RecordManager)
  }

  getClassName() {
    return NajsEloquent.Driver.DummyDriver
  }

  getRecordManager() {
    return this.recordManager
  }
}
register(DummyDriver, NajsEloquent.Driver.DummyDriver)
