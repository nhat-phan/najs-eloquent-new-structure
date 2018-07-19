/// <reference path="../definitions/query-builders/IQueryBuilder.ts" />
import IQueryBuilder = NajsEloquent.QueryBuilder.IQueryBuilder

import { Query } from './mixin/Query'
import { ConditionQuery } from './mixin/ConditionQuery'
import { SoftDeleteQuery } from './mixin/SoftDeleteQuery'
import { QueryBuilderHandleBase } from './QueryBuilderHandleBase'

export interface QueryBuilder<T extends QueryBuilderHandleBase = QueryBuilderHandleBase> extends IQueryBuilder<T> {}
export class QueryBuilder<T extends QueryBuilderHandleBase = QueryBuilderHandleBase> {
  protected handler: T

  constructor(handler: T) {
    this.handler = handler
  }
}
Object.assign(QueryBuilder.prototype, Query, ConditionQuery, SoftDeleteQuery)
