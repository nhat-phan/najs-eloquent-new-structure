/// <reference path="../../contracts/MemoryDataSource.ts" />
import MemoryDataSource = Najs.Contracts.Eloquent.MemoryDataSource

import { make } from 'najs-binding'
import { RecordConditionMatcherFactory } from '../RecordConditionMatcherFactory'
import { BasicQueryConverter } from '../../query-builders/shared/BasicQueryConverter'
import { Record } from '../Record'
import { ExecutorBase } from '../ExecutorBase'
import { MemoryQueryLog } from './MemoryQueryLog'
import { MemoryQueryBuilderHandler } from './MemoryQueryBuilderHandler'
import { BasicQuery } from '../../query-builders/shared/BasicQuery'
import { ExecutorUtils } from '../../query-builders/shared/ExecutorUtils'
// import { QueryBuilderHandlerBase } from '../../query-builders/QueryBuilderHandlerBase'

export class MemoryQueryExecutor extends ExecutorBase {
  protected queryHandler: MemoryQueryBuilderHandler
  protected dataSource: MemoryDataSource<Record>
  protected basicQuery: BasicQuery
  protected logger: MemoryQueryLog

  constructor(queryHandler: MemoryQueryBuilderHandler, dataSource: MemoryDataSource<Record>, logger: MemoryQueryLog) {
    super()
    this.queryHandler = queryHandler
    this.dataSource = dataSource
    this.basicQuery = queryHandler.getBasicQuery()
    this.logger = logger.name(this.queryHandler.getQueryName())
  }

  async get(): Promise<object[]> {
    await this.dataSource.read()
    // const conditions = this.getFilterConditions()
    if (this.shouldExecute()) {
      // const records = this.dataSource.filter(item => this.filter.isMatch(item, conditions))

      // return records
    }
    return []
    // const result = this.shouldExecute() ? await this.collection.find(query, options).toArray() : []
    // return this.logRaw(query, options, 'find')
    //   .raw('.toArray()')
    //   .action('get')
    //   .end(result)
  }

  getFilterConditions(): object {
    ExecutorUtils.addSoftDeleteConditionIfNeeded(this.queryHandler)

    const converter = new BasicQueryConverter(
      this.basicQuery,
      make<RecordConditionMatcherFactory>(RecordConditionMatcherFactory.className)
    )
    return converter.getConvertedQuery()
    // return this.logger.queryBuilderData('conditions', this.basicQuery.getRawConditions())
    // .query(ExecutorUtils.convertConditionsToMongodbQuery(conditions))
  }

  logRaw(query: object, options: object | undefined, func: string): MemoryQueryLog {
    return this.logger.raw('db.', `.${func}(`, query).raw(options ? ', ' : '', options, ')')
  }
}
