/// <reference path="../../definitions/driver/IExecutorFactory.ts" />
/// <reference path="../../definitions/features/IRecordExecutor.ts" />
/// <reference path="../../definitions/query-builders/IQueryExecutor.ts" />

import IModel = NajsEloquent.Model.IModel
import IQueryBuilderHandler = NajsEloquent.QueryBuilder.IQueryBuilderHandler

import { register } from 'najs-binding'
import { Collection } from 'mongodb'
import { Record } from '../Record'
import { NajsEloquent as NajsEloquentClasses } from '../../constants'
import { MongodbRecordExecutor } from './MongodbRecordExecutor'
import { MongodbQueryExecutor } from './MongodbQueryExecutor'
import { MongodbProviderFacade } from '../../facades/global/MongodbProviderFacade'
import { MongodbQueryBuilderHandler } from './MongodbQueryBuilderHandler'
import { MongodbQueryLog } from './MongodbQueryLog'

export class MongodbExecutorFactory implements NajsEloquent.Driver.IExecutorFactory {
  static className: string = NajsEloquentClasses.Driver.Mongodb.MongodbExecutorFactory

  makeRecordExecutor<T extends Record>(model: IModel, record: T): MongodbRecordExecutor {
    return new MongodbRecordExecutor(model, record, this.getCollection(model), this.makeLogger())
  }

  makeQueryExecutor(handler: IQueryBuilderHandler): MongodbQueryExecutor {
    return new MongodbQueryExecutor(
      handler as MongodbQueryBuilderHandler,
      this.getCollection(handler.getModel()),
      this.makeLogger()
    )
  }

  getClassName() {
    return NajsEloquentClasses.Driver.Mongodb.MongodbExecutorFactory
  }

  getCollection(model: IModel): Collection {
    return MongodbProviderFacade.getDatabase().collection(model.getRecordName())
  }

  makeLogger(): MongodbQueryLog {
    return new MongodbQueryLog()
  }
}
register(MongodbExecutorFactory, NajsEloquentClasses.Driver.Mongodb.MongodbExecutorFactory, true, true)
