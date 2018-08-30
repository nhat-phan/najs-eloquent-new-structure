/// <reference path="../../definitions/model/IModel.ts" />
/// <reference path="../../definitions/query-builders/IQueryBuilder.ts" />
/// <reference path="../../definitions/features/IRecordManager.ts" />

import './MongooseDocumentManager'
import { register, make } from 'najs-binding'
import { DriverBase } from '../DriverBase'
import { Document } from 'mongoose'
import { NajsEloquent } from '../../constants'
import { MongooseQueryBuilder } from './MongooseQueryBuilder'
import { MongooseQueryBuilderHandler } from './MongooseQueryBuilderHandler'
import { MongooseExecutorFactory } from './MongooseExecutorFactory'

export class MongooseDriver<T extends Document = Document> extends DriverBase<T> {
  protected documentManager: NajsEloquent.Feature.IRecordManager<T>
  static Name = 'mongoose'

  constructor() {
    super()

    this.documentManager = make(NajsEloquent.Driver.Mongoose.MongooseDocumentManager, [
      make(MongooseExecutorFactory.className)
    ])
  }

  getClassName() {
    return NajsEloquent.Driver.MongooseDriver
  }

  getRecordManager() {
    return this.documentManager
  }

  newQuery<M extends NajsEloquent.Model.IModel>(model: M): MongooseQueryBuilder<M, MongooseQueryBuilderHandler> {
    return new MongooseQueryBuilder(new MongooseQueryBuilderHandler(model))
  }
}
register(MongooseDriver, NajsEloquent.Driver.MongooseDriver)
