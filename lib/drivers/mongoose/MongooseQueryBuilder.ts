/// <reference path="../../definitions/model/IModel.ts" />

import IModel = NajsEloquent.Model.IModel
import { QueryBuilder } from '../../query-builders/QueryBuilder'
import { MongooseQueryBuilderHandler } from './MongooseQueryBuilderHandler'
import { MongooseQueryExecutor } from './MongooseQueryExecutor'
import { Document, Model as MongooseModel, Query as MongooseQuery } from 'mongoose'

export class MongooseQueryBuilder<
  T extends IModel,
  H extends MongooseQueryBuilderHandler = MongooseQueryBuilderHandler
> extends QueryBuilder<T, H> {
  native(handler: (native: MongooseQuery<Document & T>) => MongooseQuery<any>) {
    const executor: MongooseQueryExecutor = this.handler.getQueryExecutor() as MongooseQueryExecutor
    return executor.native(handler)
  }

  nativeModel(): MongooseModel<Document & T> {
    const executor: MongooseQueryExecutor = this.handler.getQueryExecutor() as MongooseQueryExecutor
    return executor.getMongooseModel()
  }
}
