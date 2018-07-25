/// <reference path="../definitions/model/IModel.ts" />
/// <reference path="../definitions/query-builders/IQueryBuilder.ts" />
import IModel = NajsEloquent.Model.IModel
import IQueryBuilder = NajsEloquent.QueryBuilder.IQueryBuilder

import { Query } from './mixin/Query'
import { ConditionQuery } from './mixin/ConditionQuery'
import { ExecuteQuery } from './mixin/ExecuteQuery'
import { AdvancedQuery } from './mixin/AdvancedQuery'
import { QueryBuilderHandleBase } from './QueryBuilderHandleBase'

export interface QueryBuilder<T extends IModel, Handle extends QueryBuilderHandleBase = QueryBuilderHandleBase>
  extends IQueryBuilder<T, Handle> {}
export class QueryBuilder<T extends IModel, Handle extends QueryBuilderHandleBase = QueryBuilderHandleBase> {
  protected handler: Handle

  constructor(handler: Handle) {
    this.handler = handler
  }
}
Object.assign(QueryBuilder.prototype, Query, ConditionQuery, ExecuteQuery, AdvancedQuery)
