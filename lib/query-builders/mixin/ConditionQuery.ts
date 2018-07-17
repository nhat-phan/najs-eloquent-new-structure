/// <reference path="../QueryBuilder.ts" />
/// <reference path="../../definitions/query-grammars/IConditionQuery.ts" />
import QueryBuilder = NajsEloquent.QueryBuilder.IQueryBuilder
import Range = NajsEloquent.QueryGrammar.Range

export const ConditionQuery: NajsEloquent.QueryGrammar.IConditionQuery = {
  where(this: QueryBuilder, arg0?: any, arg1?: any, arg2?: any) {
    this['handler'].getConditionQuery().where(arg0, arg1, arg2)

    return this
  },

  orWhere(this: QueryBuilder, arg0?: any, arg1?: any, arg2?: any) {
    this['handler'].getConditionQuery().orWhere(arg0, arg1, arg2)

    return this
  },

  andWhere(this: QueryBuilder, arg0?: any, arg1?: any, arg2?: any) {
    this['handler'].getConditionQuery().andWhere(arg0, arg1, arg2)

    return this
  },

  whereNot(this: QueryBuilder, field: string, value: any) {
    this['handler'].getConditionQuery().whereNot(field, value)

    return this
  },

  andWhereNot(this: QueryBuilder, field: string, value: any) {
    this['handler'].getConditionQuery().andWhereNot(field, value)

    return this
  },

  orWhereNot(this: QueryBuilder, field: string, value: any) {
    this['handler'].getConditionQuery().orWhereNot(field, value)

    return this
  },

  whereIn(this: QueryBuilder, field: string, values: Array<any>) {
    this['handler'].getConditionQuery().whereIn(field, values)

    return this
  },

  andWhereIn(this: QueryBuilder, field: string, values: Array<any>) {
    this['handler'].getConditionQuery().andWhereIn(field, values)

    return this
  },

  orWhereIn(this: QueryBuilder, field: string, values: Array<any>) {
    this['handler'].getConditionQuery().orWhereIn(field, values)

    return this
  },

  whereNotIn(this: QueryBuilder, field: string, values: Array<any>) {
    this['handler'].getConditionQuery().whereNotIn(field, values)

    return this
  },

  andWhereNotIn(this: QueryBuilder, field: string, values: Array<any>) {
    this['handler'].getConditionQuery().andWhereNotIn(field, values)

    return this
  },

  orWhereNotIn(this: QueryBuilder, field: string, values: Array<any>) {
    this['handler'].getConditionQuery().orWhereNotIn(field, values)

    return this
  },

  whereNull(this: QueryBuilder, field: string) {
    this['handler'].getConditionQuery().whereNull(field)

    return this
  },

  andWhereNull(this: QueryBuilder, field: string) {
    this['handler'].getConditionQuery().andWhereNull(field)

    return this
  },

  orWhereNull(this: QueryBuilder, field: string) {
    this['handler'].getConditionQuery().orWhereNull(field)

    return this
  },

  whereNotNull(this: QueryBuilder, field: string) {
    this['handler'].getConditionQuery().whereNotNull(field)

    return this
  },

  andWhereNotNull(this: QueryBuilder, field: string) {
    this['handler'].getConditionQuery().andWhereNotNull(field)

    return this
  },

  orWhereNotNull(this: QueryBuilder, field: string) {
    this['handler'].getConditionQuery().orWhereNotNull(field)

    return this
  },

  whereBetween(this: QueryBuilder, field: string, range: Range) {
    this['handler'].getConditionQuery().whereBetween(field, range)

    return this
  },

  andWhereBetween(this: QueryBuilder, field: string, range: Range) {
    this['handler'].getConditionQuery().andWhereBetween(field, range)

    return this
  },

  orWhereBetween(this: QueryBuilder, field: string, range: Range) {
    this['handler'].getConditionQuery().orWhereBetween(field, range)

    return this
  },

  whereNotBetween(this: QueryBuilder, field: string, range: Range) {
    this['handler'].getConditionQuery().whereNotBetween(field, range)

    return this
  },

  andWhereNotBetween(this: QueryBuilder, field: string, range: Range) {
    this['handler'].getConditionQuery().andWhereNotBetween(field, range)

    return this
  },

  orWhereNotBetween(this: QueryBuilder, field: string, range: Range) {
    this['handler'].getConditionQuery().orWhereNotBetween(field, range)

    return this
  }
}
