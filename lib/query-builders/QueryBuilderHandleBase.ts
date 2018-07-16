/// <reference path="../definitions/model/IModel.ts" />
/// <reference path="../definitions/query-builders/IQueryBuilderHandle.ts" />
/// <reference path="../definitions/query-grammars/IBasicQuery.ts" />
/// <reference path="../definitions/query-grammars/IQuery.ts" />

import IModel = NajsEloquent.Model.IModel
import IConvention = NajsEloquent.QueryBuilder.IConvention
import IBasicQuery = NajsEloquent.QueryGrammar.IBasicQuery
import IConditionQuery = NajsEloquent.QueryGrammar.IConditionQuery
import IQueryBuilderHandle = NajsEloquent.QueryBuilder.IQueryBuilderHandle

export interface QueryBuilderHandleBase<T extends IModel = IModel> extends IQueryBuilderHandle<T> {}
export abstract class QueryBuilderHandleBase<T extends IModel = IModel> {
  protected model: T
  protected queryName: string
  protected logGroup: string
  protected used: boolean

  constructor(model: T) {
    this.model = model
    this.used = false
  }

  abstract getBasicQuery(): IBasicQuery
  abstract getConditionQuery(): IConditionQuery
  abstract getQueryConvention(): IConvention

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
}
