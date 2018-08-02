/// <reference path="../../definitions/query-builders/IExecutor" />

import { isEmpty } from 'lodash'
import { Collection } from 'mongodb'
import { MongodbQueryLog } from './MongodbQueryLog'
import { BasicQuery } from '../../query-builders/shared/BasicQuery'
import { MongodbQueryBuilderHandler } from './MongodbQueryBuilderHandler'
import { MongodbProviderFacade } from '../../facades/global/MongodbProviderFacade'
import { ExecutorUtils } from '../../query-builders/shared/ExecutorUtils'
import * as Moment from 'moment'

export class MongodbExecutor implements NajsEloquent.QueryBuilder.IExecutor {
  protected logger: MongodbQueryLog
  protected basicQuery: BasicQuery
  protected queryHandler: MongodbQueryBuilderHandler
  protected collection: Collection
  protected collectionName: string

  constructor(queryHandler: MongodbQueryBuilderHandler, basicQuery: BasicQuery, logger: MongodbQueryLog) {
    this.queryHandler = queryHandler
    this.basicQuery = basicQuery
    this.logger = logger
    this.collectionName = this.queryHandler.getModel().getRecordName()
    this.collection = MongodbProviderFacade.getDatabase().collection(this.collectionName)
    this.logger.name(this.queryHandler.getQueryName())
  }

  async get(): Promise<object[]> {
    const query = this.makeQuery()
    const options = this.makeQueryOptions()

    const result = await this.collection.find(query, options).toArray()
    return this.logRaw(query, options, 'find')
      .raw('.toArray()')
      .action('get')
      .end(result)
  }

  async find(): Promise<object | null> {
    const query = this.makeQuery()
    const options = this.makeQueryOptions()

    const result = await this.collection.findOne(query, options)
    return this.logRaw(query, options, 'findOne')
      .action('find')
      .end(result)
  }

  async count(): Promise<number> {
    if (this.basicQuery.getSelect()) {
      this.basicQuery.clearSelect()
    }
    if (!isEmpty(this.basicQuery.getOrdering())) {
      this.basicQuery.clearOrdering()
    }

    const query = this.makeQuery()
    const options = this.makeQueryOptions()

    const result = await this.collection.count(query, options)
    return this.logRaw(query, options, 'count')
      .action('count')
      .end(result)
  }

  async update(data: Object): Promise<any> {
    const query = this.makeQuery()

    if (this.queryHandler.hasTimestamps()) {
      if (typeof data['$set'] === 'undefined') {
        data['$set'] = {}
      }
      data['$set'][this.queryHandler.getTimestampsSetting().updatedAt] = Moment().toDate()
    }

    const result = await this.collection.updateMany(query, data).then(function(response) {
      return response.result
    })
    return this.logger
      .raw('db.', this.collection.collectionName, '.updateMany(', query, ', ', data, ')')
      .action('update')
      .end(result)
  }

  async delete(): Promise<any> {
    // if (!this.queryHandler.isUsed()) {
    //   return Promise.resolve({ n: 0, ok: 1 })
    // }
    // const query = this.makeQuery()
    // if (isEmpty(query)) {
    //   return Promise.resolve({ n: 0, ok: 1 })
    // }
    // const result = await this.collection.deleteMany(query).then(function(response) {
    //   return response.result
    // })
    // return this.logger
    //   .raw('db.', this.collection.collectionName, '.deleteMany(', query, ')')
    //   .action('delete')
    //   .end(result)
  }

  async restore(): Promise<any> {}

  async execute(): Promise<any> {}

  logRaw(query: object, options: object | undefined, func: string): MongodbQueryLog {
    return this.logger.raw('db.', this.collectionName, `.${func}(`, query).raw(options ? ', ' : '', options, ')')
  }

  makeQuery(): object {
    ExecutorUtils.addSoftDeleteConditionIfNeeded(this.queryHandler)

    const conditions = this.basicQuery.getConditions()
    return this.logger
      .queryBuilderData('conditions', conditions)
      .query(ExecutorUtils.convertConditionsToMongodbQuery(conditions))
  }

  makeQueryOptions(): object | undefined {
    const options = {}

    const limit = this.basicQuery.getLimit()
    if (limit) {
      options['limit'] = limit
      this.logger.queryBuilderData('limit', limit)
    }

    const ordering = this.basicQuery.getOrdering()
    if (ordering && !isEmpty(ordering)) {
      this.logger.queryBuilderData('ordering', ordering)
      options['sort'] = Object.keys(ordering).reduce((memo: any[], key) => {
        memo.push([key, ordering[key] === 'asc' ? 1 : -1])
        return memo
      }, [])
    }

    const selected = this.basicQuery.getSelect()
    if (!isEmpty(selected)) {
      this.logger.queryBuilderData('select', selected)
      options['projection'] = selected!.reduce((memo: object, key) => {
        memo[key] = 1
        return memo
      }, {})
    }

    return this.logger.options(isEmpty(options) ? undefined : options)
  }
}
