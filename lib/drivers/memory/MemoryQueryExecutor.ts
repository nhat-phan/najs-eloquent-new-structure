/// <reference path="../../contracts/MemoryDataSource.ts" />
import MemoryDataSource = Najs.Contracts.Eloquent.MemoryDataSource

import { isEmpty } from 'lodash'
import { make } from 'najs-binding'
import { RecordConditionMatcherFactory } from '../RecordConditionMatcherFactory'
import { BasicQueryConverter } from '../../query-builders/shared/BasicQueryConverter'
import { Record } from '../Record'
import { ExecutorBase } from '../ExecutorBase'
import { MemoryQueryLog, IUpdateRecordInfo } from './MemoryQueryLog'
import { MemoryQueryBuilderHandler } from './MemoryQueryBuilderHandler'
import { BasicQuery } from '../../query-builders/shared/BasicQuery'
import { ExecutorUtils } from '../../query-builders/shared/ExecutorUtils'
import { RecordCollector } from '../RecordCollector'
import * as Moment from 'moment'

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
    const collector = this.makeCollector()
    const result = this.shouldExecute() ? await this.collectResult(collector) : []
    return this.logger
      .raw('.exec()')
      .action('get')
      .end(result)
  }

  async first(): Promise<object | undefined> {
    const collector = this.makeCollector().limit(1)
    const result = this.shouldExecute() ? await this.collectResult(collector) : undefined
    this.logger
      .raw('.limit(1).exec()')
      .action('first')
      .end(result ? result[0] : undefined)

    return result && result.length > 0 ? result[0] : undefined
  }

  async count(): Promise<number> {
    if (this.basicQuery.getSelect()) {
      this.basicQuery.clearSelect()
    }
    if (!isEmpty(this.basicQuery.getOrdering())) {
      this.basicQuery.clearOrdering()
    }

    const collector = this.makeCollector()
    const result = this.shouldExecute() ? await this.collectResult(collector) : []
    return this.logger
      .raw('.exec()')
      .action('count')
      .end(result.length)
  }

  async update(data: object): Promise<any> {
    const collector = this.makeCollector()
    const records = this.shouldExecute() ? await this.collectResult(collector) : []

    if (this.queryHandler.hasTimestamps()) {
      data[this.queryHandler.getTimestampsSetting().updatedAt] = Moment().toDate()
    }

    if (records.length === 0) {
      return this.logger
        .raw('.exec() >> empty, do nothing')
        .action('update')
        .end(true)
    }

    this.logger.raw('.exec() >> update records >> dataSource.write()').action('update')
    for (const record of records) {
      const info = this.getUpdateRecordInfo(record, data)
      if (info.modified) {
        this.dataSource.push(record)
      }
      this.logger.updateRecordInfo(info)
    }
    return this.logger.end(await this.dataSource.write())
  }

  getUpdateRecordInfo(record: Record, data: object): IUpdateRecordInfo {
    const info: IUpdateRecordInfo = {
      origin: Object.assign({}, record.toObject()),
      modified: false,
      updated: record.toObject()
    }

    record.clearModified()
    for (const name in data) {
      record.setAttribute(name, data[name])
    }
    info.modified = record.getModified().length > 0
    return info
  }

  async collectResult(collector: RecordCollector): Promise<Record[]> {
    await this.dataSource.read()

    return collector.exec()
  }

  makeCollector() {
    const collector = RecordCollector.use(this.dataSource)
    this.logger
      .dataSource(this.dataSource)
      .raw(`RecordCollector.use(MemoryDataSourceProvider.create("${this.queryHandler.getModel().getModelName()}"))`)

    const limit = this.basicQuery.getLimit()
    if (limit) {
      collector.limit(limit)
      this.logger.queryBuilderData('limit', limit).raw('.limit(', limit, ')')
    }

    const ordering = Array.from(this.basicQuery.getOrdering().entries())
    if (ordering && ordering.length > 0) {
      collector.orderBy(ordering)
      this.logger.queryBuilderData('ordering', ordering).raw('.orderBy(', JSON.stringify(ordering), ')')
    }

    const selected = this.basicQuery.getSelect()
    if (!isEmpty(selected)) {
      collector.select(selected!)
      this.logger.queryBuilderData('select', selected).raw('.select(', selected, ')')
    }

    const conditions = this.getFilterConditions()
    if (!isEmpty(conditions)) {
      collector.filterBy(conditions)
      this.logger.queryBuilderData('conditions', this.basicQuery.getRawConditions()).raw('.filterBy(', conditions, ')')
    }

    return collector
  }

  getFilterConditions(): object {
    ExecutorUtils.addSoftDeleteConditionIfNeeded(this.queryHandler)

    const converter = new BasicQueryConverter(
      this.basicQuery,
      make<RecordConditionMatcherFactory>(RecordConditionMatcherFactory.className)
    )
    return converter.getConvertedQuery()
  }
}
