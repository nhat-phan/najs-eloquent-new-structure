/// <reference path="../../definitions/query-builders/IQueryExecutor" />

import { isEmpty } from 'lodash'
import { MongodbQueryLog } from '../mongodb/MongodbQueryLog'
import { BasicQuery } from '../../query-builders/shared/BasicQuery'
import { MongooseQueryBuilderHandler } from './MongooseQueryBuilderHandler'
import { Model as MongooseModel, Query as MongooseQuery } from 'mongoose'
import { ExecutorUtils } from '../../query-builders/shared/ExecutorUtils'

export class MongooseQueryExecutor implements NajsEloquent.QueryBuilder.IQueryExecutor {
  protected logger: MongodbQueryLog
  protected mongooseModel: MongooseModel<any>
  protected mongooseQuery: MongooseQuery<any> | undefined
  protected hasMongooseQuery: boolean
  protected modelName: string
  protected basicQuery: BasicQuery
  protected queryHandler: MongooseQueryBuilderHandler
  protected nativeHandlePromise: any

  constructor(queryHandler: MongooseQueryBuilderHandler, mongooseModel: MongooseModel<any>, logger: MongodbQueryLog) {
    this.queryHandler = queryHandler
    this.basicQuery = queryHandler.getBasicQuery()
    this.mongooseModel = mongooseModel
    this.modelName = mongooseModel.modelName || this.queryHandler.getModel().getModelName()
    this.logger = logger
    this.logger.name(this.queryHandler.getQueryName())
  }

  async get(): Promise<object[]> {
    const query = this.createQuery(false)
    const result = await query.exec()
    return this.logger
      .raw('.exec()')
      .action('get')
      .end(result)
  }

  async first(): Promise<object | null> {
    const query = this.createQuery(true)
    const result = await query.exec()
    return this.logger
      .raw('.exec()')
      .action('first')
      .end(result)
  }

  async count(): Promise<number> {
    if (this.basicQuery.getSelect()) {
      this.basicQuery.clearSelect()
    }
    if (!isEmpty(this.basicQuery.getOrdering())) {
      this.basicQuery.clearOrdering()
    }

    const query = this.createQuery(false)
    const result = await query.count().exec()
    return this.logger
      .raw('.count().exec()')
      .action('count')
      .end(result)
  }

  async update(data: Object): Promise<any> {
    const conditions = this.basicQuery.getConditions()
    const query = ExecutorUtils.convertConditionsToMongodbQuery(conditions)
    const mongooseQuery = this.mongooseModel.update(query, data, {
      multi: true
    })
    const result = await mongooseQuery.exec()
    return this.logger
      .action('update')
      .raw(this.modelName)
      .raw(`.update(${JSON.stringify(query)}, ${JSON.stringify(data)}, {"multi": true})`)
      .raw('.exec()')
      .end(result)
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

  // -------------------------------------------------------------------------------------------------------------------

  getMongooseQuery(isFindOne: boolean): MongooseQuery<any> {
    if (!this.hasMongooseQuery) {
      const conditions = this.basicQuery.getConditions()
      const query = ExecutorUtils.convertConditionsToMongodbQuery(conditions)
      this.mongooseQuery = isFindOne ? this.mongooseModel.findOne(query) : this.mongooseModel.find(query)

      this.logger.raw(this.modelName).raw(isFindOne ? '.findOne(' : '.find(', query, ')')
      this.hasMongooseQuery = true
    }
    return this.mongooseQuery!
  }

  passSelectToQuery(query: MongooseQuery<any>) {
    const select = this.basicQuery.getSelect()
    if (typeof select !== 'undefined' && select.length > 0) {
      const fields = select.join(' ')
      query.select(fields)
      this.logger.raw(`.select("${fields}")`)
    }
  }

  passLimitToQuery(query: MongooseQuery<any>) {
    const limit = this.basicQuery.getLimit()
    if (limit) {
      query.limit(limit)
      this.logger.raw(`.limit(${limit})`)
    }
  }

  passOrderingToQuery(query: MongooseQuery<any>) {
    const ordering = this.basicQuery.getOrdering()

    if (ordering && !isEmpty(ordering)) {
      const sort: Object = Object.keys(ordering).reduce((memo, key) => {
        memo[key] = ordering[key] === 'asc' ? 1 : -1
        return memo
      }, {})

      query.sort(sort)
      this.logger.raw('.sort(', sort, ')')
    }
  }

  createQuery(findOne: boolean) {
    const mongooseQuery = this.getMongooseQuery(findOne)
    this.passSelectToQuery(mongooseQuery)
    this.passLimitToQuery(mongooseQuery)
    this.passOrderingToQuery(mongooseQuery)
    return mongooseQuery
  }
}
