/// <reference path="../../definitions/query-builders/IQueryExecutor" />

import { isEmpty } from 'lodash'
import { Collection } from 'mongodb'
import { MongodbQueryLog } from './MongodbQueryLog'
import { ExecutorBase } from '../ExecutorBase'
import { BasicQuery } from '../../query-builders/shared/BasicQuery'
import { MongodbQueryBuilderHandler } from './MongodbQueryBuilderHandler'
import { ExecutorUtils } from '../../query-builders/shared/ExecutorUtils'
import * as Moment from 'moment'

export class MongodbQueryExecutor extends ExecutorBase implements NajsEloquent.QueryBuilder.IQueryExecutor {
  protected logger: MongodbQueryLog
  protected collection: Collection
  protected collectionName: string
  protected basicQuery: BasicQuery
  protected queryHandler: MongodbQueryBuilderHandler
  protected nativeHandlePromise: any

  constructor(queryHandler: MongodbQueryBuilderHandler, collection: Collection, logger: MongodbQueryLog) {
    super()
    this.queryHandler = queryHandler
    this.basicQuery = queryHandler.getBasicQuery()
    this.collection = collection
    this.collectionName = collection.collectionName
    this.logger = logger
    this.logger.name(this.queryHandler.getQueryName())
  }

  async get(): Promise<object[]> {
    const query = this.makeQuery()
    const options = this.makeQueryOptions()

    const result = this.shouldExecute() ? await this.collection.find(query, options).toArray() : []
    return this.logRaw(query, options, 'find')
      .raw('.toArray()')
      .action('get')
      .end(result)
  }

  async first(): Promise<object | null> {
    const query = this.makeQuery()
    const options = this.makeQueryOptions()

    const result = this.shouldExecute() ? await this.collection.findOne(query, options) : {}
    return this.logRaw(query, options, 'findOne')
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

    const query = this.makeQuery()
    const options = this.makeQueryOptions()

    const result = this.shouldExecute() ? await this.collection.countDocuments(query, options) : 0
    return this.logRaw(query, options, 'countDocuments')
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

    const result = this.shouldExecute()
      ? await this.collection.updateMany(query, data).then(function(response) {
          return response.result
        })
      : {}
    return this.logger
      .raw('db.', this.collectionName, '.updateMany(', query, ', ', data, ')')
      .action('update')
      .end(result)
  }

  async delete(): Promise<any> {
    if (!this.queryHandler.isUsed()) {
      return { n: 0, ok: 1 }
    }

    const query = this.makeQuery()
    if (isEmpty(query)) {
      return { n: 0, ok: 1 }
    }

    const result = this.shouldExecute()
      ? await this.collection.deleteMany(query).then(function(response) {
          return response.result
        })
      : {}
    return this.logger
      .raw('db.', this.collectionName, '.deleteMany(', query, ')')
      .action('delete')
      .end(result)
  }

  async restore(): Promise<any> {
    if (!this.queryHandler.hasSoftDeletes()) {
      return { n: 0, nModified: 0, ok: 1 }
    }

    const query = this.makeQuery()
    if (isEmpty(query)) {
      return { n: 0, nModified: 0, ok: 1 }
    }

    const fieldName = this.queryHandler.getSoftDeletesSetting().deletedAt
    const data = {
      $set: { [fieldName]: this.queryHandler.getQueryConvention().getNullValueFor(fieldName) }
    }

    const result = this.shouldExecute()
      ? await this.collection.updateMany(query, data).then(function(response) {
          return response.result
        })
      : {}
    return this.logger
      .raw('db.', this.collectionName, '.updateMany(', query, ', ', data, ')')
      .action('restore')
      .end(result)
  }

  native(
    handler: (collection: Collection, conditions: object, options?: object) => Promise<any>
  ): { execute(): Promise<any> } {
    const query = this.makeQuery()
    const options = this.makeQueryOptions()
    this.nativeHandlePromise = handler(this.collection, query, options)
    return this
  }

  async execute(): Promise<any> {
    if (this.nativeHandlePromise) {
      return this.nativeHandlePromise.then((response: any) => {
        this.nativeHandlePromise = undefined
        return response.result || response
      })
    }
    return this.get()
  }

  getCollection() {
    return this.collection
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

  logRaw(query: object, options: object | undefined, func: string): MongodbQueryLog {
    return this.logger.raw('db.', this.collectionName, `.${func}(`, query).raw(options ? ', ' : '', options, ')')
  }
}
