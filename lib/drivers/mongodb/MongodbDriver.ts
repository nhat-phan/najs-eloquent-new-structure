/// <reference path="../../definitions/model/IModel.ts" />
/// <reference path="../../definitions/query-builders/IQueryBuilder.ts" />
/// <reference path="../../definitions/features/IRecordManager.ts" />

import '../../features/RecordManager'
import { register, make } from 'najs-binding'
import { DriverBase } from '../DriverBase'
import { Record } from '../../features/Record'
import { NajsEloquent } from '../../constants'
import { MongodbQueryBuilder } from './MongodbQueryBuilder'
import { MongodbQueryBuilderHandler } from './MongodbQueryBuilderHandler'

export class MongodbDriver<T extends Record = Record> extends DriverBase<T> {
  protected recordManager: NajsEloquent.Feature.IRecordManager<T>

  constructor() {
    super()

    this.recordManager = make(NajsEloquent.Feature.RecordManager)
  }

  getClassName() {
    return NajsEloquent.Driver.MongodbDriver
  }

  getRecordManager() {
    return this.recordManager
  }

  newQuery<M extends NajsEloquent.Model.IModel>(model: M): MongodbQueryBuilder<M, MongodbQueryBuilderHandler> {
    return new MongodbQueryBuilder(new MongodbQueryBuilderHandler(model))
  }
}
register(MongodbDriver, NajsEloquent.Driver.MongodbDriver)