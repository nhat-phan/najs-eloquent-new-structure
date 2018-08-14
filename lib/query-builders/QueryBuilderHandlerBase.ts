/// <reference path="../definitions/model/IModel.ts" />
/// <reference path="../definitions/features/ISoftDeletesFeature.ts" />
/// <reference path="../definitions/features/ITimestampsFeature.ts" />
/// <reference path="../definitions/query-builders/IConvention.ts" />
/// <reference path="../definitions/query-builders/IQueryExecutor.ts" />
/// <reference path="../definitions/query-builders/IQueryBuilderHandler.ts" />
/// <reference path="../definitions/query-grammars/IBasicQuery.ts" />
/// <reference path="../definitions/query-grammars/IQuery.ts" />

import IModel = NajsEloquent.Model.IModel
import IExecutorFactory = NajsEloquent.Driver.IExecutorFactory
import IQueryExecutor = NajsEloquent.QueryBuilder.IQueryExecutor
import IConvention = NajsEloquent.QueryBuilder.IConvention
import IBasicQuery = NajsEloquent.QueryGrammar.IBasicQuery
import IConditionQuery = NajsEloquent.QueryGrammar.IConditionQuery
import IQueryBuilderHandler = NajsEloquent.QueryBuilder.IQueryBuilderHandler
import { make_collection } from '../util/factory'

export abstract class QueryBuilderHandlerBase implements IQueryBuilderHandler {
  protected model: IModel
  protected executorFactory: IExecutorFactory
  protected queryName: string
  protected logGroup: string
  protected used: boolean
  protected softDeleteState: 'should-add' | 'should-not-add' | 'added'

  constructor(model: IModel, executorFactory: IExecutorFactory) {
    this.model = model
    this.executorFactory = executorFactory
    this.used = false
    this.softDeleteState = 'should-add'
  }

  abstract getBasicQuery(): IBasicQuery
  abstract getConditionQuery(): IConditionQuery
  abstract getQueryConvention(): IConvention

  getQueryExecutor(): IQueryExecutor {
    return this.executorFactory.makeQueryExecutor(this)
  }

  getModel(): IModel {
    return this.model
  }

  getPrimaryKeyName(): string {
    return this.model.getPrimaryKeyName()
  }

  setQueryName(name: string): void {
    this.queryName = name
  }

  getQueryName(): string {
    return this.queryName
  }

  setLogGroup(group: string): void {
    this.logGroup = group
  }

  getLogGroup(): string {
    return this.logGroup
  }

  markUsed(): void {
    this.used = true
  }

  isUsed(): boolean {
    return this.used
  }

  hasSoftDeletes(): boolean {
    return this.model
      .getDriver()
      .getSoftDeletesFeature()
      .hasSoftDeletes(this.model)
  }

  getSoftDeletesSetting(): NajsEloquent.Feature.ISoftDeletesSetting {
    return this.model
      .getDriver()
      .getSoftDeletesFeature()
      .getSoftDeletesSetting(this.model)
  }

  hasTimestamps(): boolean {
    return this.model
      .getDriver()
      .getTimestampsFeature()
      .hasTimestamps(this.model)
  }

  getTimestampsSetting(): NajsEloquent.Feature.ITimestampsSetting {
    return this.model
      .getDriver()
      .getTimestampsFeature()
      .getTimestampsSetting(this.model)
  }

  markSoftDeleteState(state: 'should-add' | 'should-not-add' | 'added'): void {
    this.softDeleteState = state
  }

  getSoftDeleteState(): string {
    return this.softDeleteState
  }

  shouldAddSoftDeleteCondition(): boolean {
    return this.softDeleteState === 'should-add' && this.hasSoftDeletes()
  }

  createCollection(result: object[]) {
    return make_collection(result, item => this.createInstance(item))
  }

  createInstance(result: object): IModel {
    const relationFeature = this.model.getDriver().getRelationFeature()
    const bucket = relationFeature.getDataBucket(this.model) || relationFeature.makeDataBucket(this.model)
    const model = bucket.makeModel(this.model, result)
    bucket.add(model)
    return model
  }
}
