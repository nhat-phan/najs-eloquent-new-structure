/// <reference path="../../definitions/model/IModel.ts" />
/// <reference path="../../definitions/query-builders/IQueryBuilder.ts" />
/// <reference path="../../definitions/features/IRecordManager.ts" />

import '../RecordManager'
import { register, make } from 'najs-binding'
import { DriverBase } from '../DriverBase'
import { Record } from '../Record'
import { NajsEloquent } from '../../constants'
import { MongodbQueryBuilderFactory } from './MongodbQueryBuilderFactory'
import { MongodbExecutorFactory } from './MongodbExecutorFactory'

export class MongodbDriver<T extends Record = Record> extends DriverBase<T> {
  protected recordManager: NajsEloquent.Feature.IRecordManager<T>
  static Name = 'mongodb'

  constructor() {
    super()

    this.recordManager = make(NajsEloquent.Feature.RecordManager, [make(MongodbExecutorFactory.className)])
  }

  getClassName() {
    return NajsEloquent.Driver.MongodbDriver
  }

  getRecordManager() {
    return this.recordManager
  }

  makeQueryBuilderFactory() {
    return make<MongodbQueryBuilderFactory>(MongodbQueryBuilderFactory.className)
  }
}
register(MongodbDriver, NajsEloquent.Driver.MongodbDriver)
