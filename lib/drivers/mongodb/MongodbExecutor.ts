/// <reference path="../../definitions/query-builders/IExecutor" />

import { make } from 'najs-binding'
import { isEmpty } from 'lodash'
import { Collection } from 'mongodb'
import { MongodbQueryLog } from './MongodbQueryLog'
import { BasicQuery } from '../../query-builders/shared/BasicQuery'
import { MongodbQueryBuilderHandler } from './MongodbQueryBuilderHandler'
import { MongodbConditionConverter } from '../../query-builders/shared/MongodbConditionConverter'

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
    this.logger.name(this.queryHandler.getQueryName())
  }

  async get(): Promise<object[]> {
    const query = this.getQuery()
    const options = this.getQueryOptions()

    const result = this.collection.find(query, options).toArray()
    return this.logRaw(query, options, 'find')
      .raw('.toArray()')
      .action('get()')
      .end(result)
  }

  async find(): Promise<object | null> {
    const query = this.getQuery()
    const options = this.getQueryOptions()

    const result = this.collection.findOne(query, options)
    return this.logRaw(query, options, 'findOne')
      .action('find()')
      .end(result)
  }

  async count(): Promise<number> {
    if (this.basicQuery.getSelect()) {
      this.basicQuery.clearSelect()
    }

    if (!isEmpty(this.basicQuery.getOrdering())) {
      this.basicQuery.clearOrdering()
    }

    const query = this.getQuery()
    const options = this.getQueryOptions()

    const result = this.collection.count(query, options)
    return this.logRaw(query, options, 'count')
      .action('count()')
      .end(result)
  }

  async update(data: Object): Promise<any> {
    return {}
  }

  async delete(): Promise<any> {}

  async restore(): Promise<any> {}

  async execute(): Promise<any> {}

  logRaw(query: object, options: object | undefined, func: string): MongodbQueryLog {
    return this.logger.raw('db.', this.collectionName, `.${func}(`, query).raw(options ? ', ' : '', options, ')')
  }

  getQuery(): object {
    if (this.queryHandler.shouldAddSoftDeleteCondition()) {
      const settings = this.queryHandler.getSoftDeletesSetting()
      this.queryHandler.getConditionQuery().whereNull(settings.deletedAt)
      this.queryHandler.markSoftDeleteState('added')
    }

    const conditions = this.basicQuery.getConditions()
    return this.logger
      .queryBuilderData('conditions', conditions)
      .query(this.resolveMongodbConditionConverter(conditions))
  }

  resolveMongodbConditionConverter(conditions: object[]) {
    return make<MongodbConditionConverter>(MongodbConditionConverter.className, [conditions])
  }

  getQueryOptions(): object | undefined {
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
