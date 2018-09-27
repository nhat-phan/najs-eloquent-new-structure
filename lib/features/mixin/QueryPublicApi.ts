/// <reference path="../../definitions/model/IModel.ts" />
/// <reference path="../../definitions/model/IModelQuery.ts" />
/// <reference path="../../definitions/query-builders/IQueryBuilder.ts" />

import Model = NajsEloquent.Model.IModel
import IQueryBuilder = NajsEloquent.QueryBuilder.IQueryBuilder

export const QueryPublicApi: NajsEloquent.Model.IModelQuery = {
  queryName(this: Model, name: string): IQueryBuilder<any> {
    return this.newQuery(name)
  },

  setLogGroup(this: Model, group: string): IQueryBuilder<any> {
    const query = this.newQuery()
    return query.setLogGroup.apply(query, arguments)
  },

  select(this: Model, ...fields: Array<string | string[]>): IQueryBuilder<any> {
    const query = this.newQuery()
    return query.select.apply(query, arguments)
  },

  limit(this: Model, record: number): IQueryBuilder<any> {
    const query = this.newQuery()
    return query.limit.apply(query, arguments)
  },

  orderBy(this: Model, field: string, direction?: any): IQueryBuilder<any> {
    const query = this.newQuery()
    return query.orderBy.apply(query, arguments)
  },

  orderByAsc(this: Model, field: string): IQueryBuilder<any> {
    const query = this.newQuery()
    return query.orderByAsc.apply(query, arguments)
  },

  orderByDesc(this: Model, field: string): IQueryBuilder<any> {
    const query = this.newQuery()
    return query.orderByDesc.apply(query, arguments)
  },

  where(this: Model, arg1: any, arg2?: any, arg3?: any): IQueryBuilder<any> {
    const query = this.newQuery()
    return query.where.apply(query, arguments)
  },

  whereNot(this: Model, field: string, value: any): IQueryBuilder<any> {
    const query = this.newQuery()
    return query.whereNot.apply(query, arguments)
  },

  whereIn(this: Model, field: string, values: Array<any>): IQueryBuilder<any> {
    const query = this.newQuery()
    return query.whereIn.apply(query, arguments)
  },

  whereNotIn(this: Model, field: string, values: Array<any>): IQueryBuilder<any> {
    const query = this.newQuery()
    return query.whereNotIn.apply(query, arguments)
  },

  whereNull(this: Model, field: string): IQueryBuilder<any> {
    const query = this.newQuery()
    return query.whereNull.apply(query, arguments)
  },

  whereNotNull(this: Model, field: string): IQueryBuilder<any> {
    const query = this.newQuery()
    return query.whereNotNull.apply(query, arguments)
  },

  whereBetween(this: Model, field: string, range: [any, any]): IQueryBuilder<any> {
    const query = this.newQuery()
    return query.whereBetween.apply(query, arguments)
  },

  whereNotBetween(this: Model, field: string, range: [any, any]): IQueryBuilder<any> {
    const query = this.newQuery()
    return query.whereNotBetween.apply(query, arguments)
  },

  withTrashed(this: Model): IQueryBuilder<any> {
    const query = this.newQuery()
    return query.withTrashed.apply(query, arguments)
  },

  onlyTrashed(this: Model): IQueryBuilder<any> {
    const query = this.newQuery()
    return query.onlyTrashed.apply(query, arguments)
  },

  first(this: Model, id?: any): Promise<any> {
    const query = this.newQuery()
    return query.first.apply(query, arguments)
  },

  find(this: Model, id?: any): Promise<any> {
    const query = this.newQuery()
    return query.find.apply(query, arguments)
  },

  get(this: Model): Promise<any> {
    const query = this.newQuery()
    return query.get.apply(query, arguments)
  },

  all(this: Model): Promise<any> {
    const query = this.newQuery()
    return query.all.apply(query, arguments)
  },

  count(this: Model): Promise<number> {
    const query = this.newQuery()
    return query.count.apply(query, arguments)
  },

  pluck(this: Model, valueKey: string, indexKey?: any): Promise<object> {
    const query = this.newQuery()
    return query.pluck.apply(query, arguments)
  },

  findById(this: Model, id: any): Promise<any> {
    const query = this.newQuery()
    return query.findById.apply(query, arguments)
  },

  findOrFail(this: Model, id: any): Promise<any> {
    const query = this.newQuery()
    return query.findOrFail.apply(query, arguments)
  },

  firstOrFail(this: Model, id: any): Promise<any> {
    const query = this.newQuery()
    return query.firstOrFail.apply(query, arguments)
  }
}
