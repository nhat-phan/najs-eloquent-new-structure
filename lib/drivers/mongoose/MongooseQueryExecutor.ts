/// <reference path="../../definitions/query-builders/IQueryExecutor" />

// import { isEmpty } from 'lodash'
import { MongodbQueryLog } from '../mongodb/MongodbQueryLog'
import { BasicQuery } from '../../query-builders/shared/BasicQuery'
import { MongooseQueryBuilderHandler } from './MongooseQueryBuilderHandler'
import { Model as MongooseModel } from 'mongoose'
// import { ExecutorUtils } from '../../query-builders/shared/ExecutorUtils'
// import * as Moment from 'moment'

export class MongooseQueryExecutor implements NajsEloquent.QueryBuilder.IQueryExecutor {
  protected logger: MongodbQueryLog
  protected mongooseModel: MongooseModel<any>
  protected basicQuery: BasicQuery
  protected queryHandler: MongooseQueryBuilderHandler
  protected nativeHandlePromise: any

  constructor(queryHandler: MongooseQueryBuilderHandler, mongooseModel: MongooseModel<any>, logger: MongodbQueryLog) {
    this.queryHandler = queryHandler
    this.basicQuery = queryHandler.getBasicQuery()
    this.mongooseModel = mongooseModel
    this.logger = logger
    this.logger.name(this.queryHandler.getQueryName())
  }

  async get(): Promise<object[]> {
    return {} as any
  }

  async first(): Promise<object | null> {
    return {} as any
  }

  async count(): Promise<number> {
    return {} as any
  }

  async update(data: Object): Promise<any> {
    return {} as any
  }

  async delete(): Promise<any> {
    return {} as any
  }

  async restore(): Promise<any> {
    return {} as any
  }

  async execute(): Promise<any> {
    return {} as any
  }
}
