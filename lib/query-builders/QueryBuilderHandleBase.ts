/// <reference path="../definitions/model/IModel.ts" />
/// <reference path="../definitions/query-builders/IConvention.ts" />
/// <reference path="../definitions/query-builders/IExecutor.ts" />
/// <reference path="../definitions/query-builders/IQueryBuilderHandle.ts" />
/// <reference path="../definitions/query-grammars/IBasicQuery.ts" />
/// <reference path="../definitions/query-grammars/IQuery.ts" />

import IModel = NajsEloquent.Model.IModel
import IExecutor = NajsEloquent.QueryBuilder.IExecutor
import IConvention = NajsEloquent.QueryBuilder.IConvention
import IBasicQuery = NajsEloquent.QueryGrammar.IBasicQuery
import IConditionQuery = NajsEloquent.QueryGrammar.IConditionQuery
import IQueryBuilderHandle = NajsEloquent.QueryBuilder.IQueryBuilderHandle

export abstract class QueryBuilderHandleBase implements IQueryBuilderHandle {
  protected model: IModel
  protected queryName: string
  protected logGroup: string
  protected used: boolean
  protected softDeleteState: 'should-add' | 'should-not-add' | 'added'

  constructor(model: IModel) {
    this.model = model
    this.used = false
    this.softDeleteState = 'should-add'
  }

  abstract getBasicQuery(): IBasicQuery
  abstract getConditionQuery(): IConditionQuery
  abstract getQueryConvention(): IConvention
  abstract getQueryExecutor(): IExecutor

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

  getLogGroup(): string {
    return this.logGroup
  }

  setLogGroup(group: string): void {
    this.logGroup = group
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

  markSoftDeleteState(state: 'should-add' | 'should-not-add' | 'added'): void {
    this.softDeleteState = state
  }

  shouldAddSoftDeleteCondition(): boolean {
    return this.softDeleteState === 'should-add' && this.hasSoftDeletes()
  }

  createCollection(result: object[]): any {
    return {}
  }

  createInstance(result: object): any {
    return {}
  }
}
