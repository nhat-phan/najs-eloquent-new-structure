/// <reference path="../../definitions/model/IModel.ts" />
/// <reference path="../../definitions/model/IEloquent.ts" />
/// <reference path="../../definitions/query-builders/IQueryBuilder.ts" />

import Model = NajsEloquent.Model.IModel
import QueryBuilder = NajsEloquent.QueryBuilder.IQueryBuilder

export const EloquentPublicApi: NajsEloquent.Model.IEloquent<any, any> = {
  queryName(this: Model, name: string): QueryBuilder<any, any> {
    return this.newQuery(name)
  },

  select(this: Model, ...fields: Array<string | string[]>): QueryBuilder<any, any> {
    return this.newQuery().select(...fields)
  },

  limit(this: Model, record: number): QueryBuilder<any, any> {
    return this.newQuery().limit(record)
  },

  orderBy(this: Model, field: string, direction?: any): QueryBuilder<any, any> {
    return this.newQuery().orderBy(field, direction)
  },

  orderByAsc(this: Model, field: string): QueryBuilder<any, any> {
    return this.newQuery().orderByAsc(field)
  },

  orderByDesc(this: Model, field: string): QueryBuilder<any, any> {
    return this.newQuery().orderByDesc(field)
  },

  where(this: Model, arg1: any, arg2?: any, arg3?: any): QueryBuilder<any, any> {
    return this.newQuery().where(arg1, arg2, arg3)
  },

  whereNot(this: Model, field: string, value: any): QueryBuilder<any, any> {
    return this.newQuery().whereNot(field, value)
  },

  whereIn(this: Model, field: string, values: Array<any>): QueryBuilder<any, any> {
    return this.newQuery().whereIn(field, values)
  },

  whereNotIn(this: Model, field: string, values: Array<any>): QueryBuilder<any, any> {
    return this.newQuery().whereNotIn(field, values)
  },

  whereNull(this: Model, field: string): QueryBuilder<any, any> {
    return this.newQuery().whereNull(field)
  },

  whereNotNull(this: Model, field: string): QueryBuilder<any, any> {
    return this.newQuery().whereNotNull(field)
  },

  whereBetween(this: Model, field: string, range: [any, any]): QueryBuilder<any, any> {
    return this.newQuery().whereBetween(field, range)
  },

  whereNotBetween(this: Model, field: string, range: [any, any]): QueryBuilder<any, any> {
    return this.newQuery().whereNotBetween(field, range)
  },

  withTrashed(this: Model): QueryBuilder<any, any> {
    return this.newQuery().withTrashed()
  },

  onlyTrashed(this: Model): QueryBuilder<any, any> {
    return this.newQuery().onlyTrashed()
  },

  first(this: Model, id?: any): Promise<any> {
    return this.newQuery().first(id)
  },

  find(this: Model, id?: any): Promise<any> {
    return this.newQuery().find(id)
  },

  get(this: Model): Promise<any> {
    return this.newQuery().get(...arguments)
  },

  all(this: Model): Promise<any> {
    return this.newQuery().all()
  },

  count(this: Model): Promise<number> {
    return this.newQuery().count()
  },

  pluck(this: Model, valueKey: string, indexKey?: any): Promise<object> {
    return this.newQuery().pluck(valueKey, indexKey)
  },

  findById(this: Model, id: any): Promise<any> {
    return this.newQuery().findById(id)
  },

  findOrFail(this: Model, id: any): Promise<any> {
    return this.newQuery().findOrFail(id)
  },

  firstOrFail(this: Model, id: any): Promise<any> {
    return this.newQuery().firstOrFail(id)
  }
}
