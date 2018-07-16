/// <reference path="../QueryBuilder.ts" />
/// <reference path="../../definitions/query-grammars/IQuery.ts" />
import QueryBuilder = NajsEloquent.QueryBuilder.IQueryBuilder

export const Query: NajsEloquent.QueryGrammar.IQuery = {
  select(this: QueryBuilder, ...fields: Array<string | string[]>) {
    this['handler'].getBasicQuery().select(...fields)

    return this
  },

  limit(this: QueryBuilder, record: number) {
    this['handler'].getBasicQuery().limit(record)

    return this
  },

  orderBy(this: QueryBuilder, field: string, direction?: 'asc' | 'desc') {
    this['handler'].getBasicQuery().orderBy(field, direction!)

    return this
  },

  queryName(this: QueryBuilder, name: string) {
    this['handler'].setQueryName(name)

    return this
  },

  setLogGroup(this: QueryBuilder, group: string) {
    this['handler'].setLogGroup(group)

    return this
  },

  orderByAsc(this: QueryBuilder, field: string) {
    return this.orderBy(field, 'asc')
  },

  orderByDesc(this: QueryBuilder, field: string) {
    return this.orderBy(field, 'desc')
  }
}
