/// <reference path="../../definitions/driver/IExecutorFactory.ts" />
/// <reference path="../../definitions/features/IRecordExecutor.ts" />
/// <reference path="../../definitions/query-builders/IQueryExecutor.ts" />

import IModel = NajsEloquent.Model.IModel
import IQueryBuilderHandler = NajsEloquent.QueryBuilder.IQueryBuilderHandler
import { register } from 'najs-binding'
import { Document, Model as MongooseModel } from 'mongoose'
import { MongooseRecordExecutor } from './MongooseRecordExecutor'
import { MongooseQueryExecutor } from './MongooseQueryExecutor'
import { MongodbQueryLog } from './../mongodb/MongodbQueryLog'
import { MongooseProviderFacade } from '../../facades/global/MongooseProviderFacade'
import { MongooseQueryBuilderHandler } from './MongooseQueryBuilderHandler'
import { NajsEloquent as NajsEloquentClasses } from '../../constants'

export class MongooseExecutorFactory implements NajsEloquent.Driver.IExecutorFactory {
  static className: string = NajsEloquentClasses.Driver.Mongoose.MongooseExecutorFactory

  getClassName() {
    return NajsEloquentClasses.Driver.Mongoose.MongooseExecutorFactory
  }

  makeRecordExecutor<T extends Document>(model: IModel, document: T): MongooseRecordExecutor {
    return new MongooseRecordExecutor(model, document, this.makeLogger())
  }

  makeQueryExecutor(handler: IQueryBuilderHandler): MongooseQueryExecutor {
    return new MongooseQueryExecutor(
      handler as MongooseQueryBuilderHandler,
      this.getMongooseModel(handler.getModel()),
      this.makeLogger()
    )
  }

  getMongooseModel(model: IModel): MongooseModel<any> {
    return MongooseProviderFacade.getMongooseInstance().model(model.getModelName())
  }

  makeLogger(): MongodbQueryLog {
    return new MongodbQueryLog()
  }
}
register(MongooseExecutorFactory, NajsEloquentClasses.Driver.Mongoose.MongooseExecutorFactory, true, true)
