/// <reference path="../../definitions/driver/IExecutorFactory.ts" />
/// <reference path="../../definitions/features/IRecordExecutor.ts" />
/// <reference path="../../definitions/query-builders/IQueryExecutor.ts" />

import ModelInternal = NajsEloquent.Model.ModelInternal
import IQueryBuilderHandler = NajsEloquent.QueryBuilder.IQueryBuilderHandler

import { Collection } from 'mongodb'
import { MongodbRecordExecutor } from './MongodbRecordExecutor'
import { MongodbQueryExecutor } from './MongodbQueryExecutor'
import { MongodbProviderFacade } from '../../facades/global/MongodbProviderFacade'
import { MongodbQueryLog } from './MongodbQueryLog'

export class MongodbExecutorFactory implements NajsEloquent.Driver.IExecutorFactory<any> {
  makeRecordExecutor(model: ModelInternal, record: any): MongodbRecordExecutor<any> {
    return new MongodbRecordExecutor(model, record, this.getCollection(model), this.makeLogger())
  }

  makeQueryExecutor(handler: IQueryBuilderHandler): MongodbQueryExecutor {
    return {} as any
  }

  getCollection(model: ModelInternal): Collection {
    return MongodbProviderFacade.getDatabase().collection(model.getRecordName())
  }

  makeLogger(): MongodbQueryLog {
    return new MongodbQueryLog()
  }
}
