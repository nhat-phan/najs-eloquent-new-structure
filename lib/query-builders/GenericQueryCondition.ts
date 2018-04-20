/// <reference path="interfaces/IQueryConvention.ts" />
/// <reference path="interfaces/IConditionQuery.ts" />

import { isFunction } from 'lodash'

export const QueryConditionHelpers = {
  whereBetween(query: NajsEloquent.QueryBuilder.IConditionQuery, field: string, range: [any, any]): any {
    return query.where(field, '>=', range[0]).where(field, '<=', range[1])
  },

  subQueryWhereBetween(field: string, range: [any, any]): any {
    return function(subQuery: NajsEloquent.QueryBuilder.IConditionQuery) {
      QueryConditionHelpers.whereBetween(subQuery, field, range)
    }
  },

  whereNotBetween(query: NajsEloquent.QueryBuilder.IConditionQuery, field: string, range: [any, any]): any {
    return query.where(field, '<', range[0]).orWhere(field, '>', range[1])
  },

  subQueryWhereNotBetween(field: string, range: [any, any]): any {
    return function(subQuery: NajsEloquent.QueryBuilder.IConditionQuery) {
      QueryConditionHelpers.whereNotBetween(subQuery, field, range)
    }
  }
}

export class GenericQueryCondition implements NajsEloquent.QueryBuilder.IConditionQuery {
  convention: NajsEloquent.QueryBuilder.IQueryConvention
  isSubQuery: boolean
  bool: 'and' | 'or'
  operator: NajsEloquent.QueryBuilder.Operator
  field: string
  value: string
  queries: GenericQueryCondition[]

  protected constructor() {
    this.isSubQuery = false
    this.queries = []
  }

  static create(
    convention: NajsEloquent.QueryBuilder.IQueryConvention,
    operator: 'and' | 'or',
    arg0: string | NajsEloquent.QueryBuilder.SubCondition,
    arg1: NajsEloquent.QueryBuilder.Operator | any,
    arg2: any
  ): GenericQueryCondition {
    const condition = new GenericQueryCondition()
    condition.convention = convention
    condition.buildQuery(operator, arg0, arg1, arg2)
    return condition
  }

  toObject(): Object {
    const result: Object = {
      bool: this.bool
    }
    if (this.queries.length > 0) {
      result['queries'] = []
      for (const subQuery of this.queries) {
        result['queries'].push(subQuery.toObject())
      }
    } else {
      result['operator'] = this.operator
      result['field'] = this.field
      result['value'] = this.value
    }
    return result
  }

  protected buildQuery(
    bool: 'and' | 'or',
    arg0: string | NajsEloquent.QueryBuilder.SubCondition,
    arg1: NajsEloquent.QueryBuilder.Operator | any,
    arg2: any
  ): this {
    let queryCondition
    if (this.isSubQuery) {
      queryCondition = new GenericQueryCondition()
      this.queries.push(queryCondition)
    } else {
      queryCondition = this
    }

    queryCondition.bool = bool
    if (isFunction(arg0)) {
      return this.buildSubQuery(queryCondition, arg0)
    }

    queryCondition.field = this.convention.formatFieldName(arg0)
    if (typeof arg2 === 'undefined') {
      // case 2
      queryCondition.operator = '='
      queryCondition.value = arg1
    } else {
      // case 3
      queryCondition.operator = arg1
      queryCondition.value = arg2
    }
    return this
  }

  protected buildSubQuery(queryCondition: GenericQueryCondition, arg0: Function) {
    // case 1
    const query = new GenericQueryCondition()
    query.convention = this.convention
    query.isSubQuery = true
    arg0.call(undefined, query)
    for (const instance of query.queries) {
      queryCondition.queries.push(instance)
    }
    query.isSubQuery = false
    return this
  }

  where(conditionBuilder: NajsEloquent.QueryBuilder.SubCondition): this
  where(field: string, value: any): this
  where(field: string, operator: NajsEloquent.QueryBuilder.Operator, value: any): this
  where(arg0: any, arg1?: any, arg2?: any): this {
    return this.buildQuery('and', arg0, arg1, arg2)
  }

  orWhere(conditionBuilder: NajsEloquent.QueryBuilder.SubCondition): this
  orWhere(field: string, value: any): this
  orWhere(field: string, operator: NajsEloquent.QueryBuilder.Operator, value: any): this
  orWhere(arg0: any, arg1?: any, arg2?: any): this {
    return this.buildQuery('or', arg0, arg1, arg2)
  }

  andWhere(conditionBuilder: NajsEloquent.QueryBuilder.SubCondition): this
  andWhere(field: string, value: any): this
  andWhere(field: string, operator: NajsEloquent.QueryBuilder.Operator, value: any): this
  andWhere(arg0: any, arg1?: any, arg2?: any): this {
    return this.where(arg0, arg1, arg2)
  }

  whereNot(field: string, values: any): this {
    return this.buildQuery('and', field, '<>', values)
  }

  andWhereNot(field: string, values: any): this {
    return this.whereNot(field, values)
  }

  orWhereNot(field: string, values: any): this {
    return this.buildQuery('or', field, '<>', values)
  }

  whereIn(field: string, values: Array<any>): this {
    return this.buildQuery('and', field, 'in', values)
  }

  andWhereIn(field: string, values: Array<any>): this {
    return this.whereIn(field, values)
  }

  orWhereIn(field: string, values: Array<any>): this {
    return this.buildQuery('or', field, 'in', values)
  }

  whereNotIn(field: string, values: Array<any>): this {
    return this.buildQuery('and', field, 'not-in', values)
  }

  andWhereNotIn(field: string, values: Array<any>): this {
    return this.whereNotIn(field, values)
  }

  orWhereNotIn(field: string, values: Array<any>): this {
    return this.buildQuery('or', field, 'not-in', values)
  }

  whereNull(field: string) {
    return this.buildQuery('and', field, '=', this.convention.getNullValueFor(field))
  }

  andWhereNull(field: string) {
    return this.whereNull(field)
  }

  orWhereNull(field: string) {
    return this.buildQuery('or', field, '=', this.convention.getNullValueFor(field))
  }

  whereNotNull(field: string) {
    return this.buildQuery('and', field, '<>', this.convention.getNullValueFor(field))
  }

  andWhereNotNull(field: string) {
    return this.whereNotNull(field)
  }

  orWhereNotNull(field: string) {
    return this.buildQuery('or', field, '<>', this.convention.getNullValueFor(field))
  }

  whereBetween(field: string, range: [any, any]): this {
    return QueryConditionHelpers.whereBetween(this, field, range)
  }

  andWhereBetween(field: string, range: [any, any]): this {
    return this.whereBetween(field, range)
  }

  orWhereBetween(field: string, range: [any, any]): this {
    return this.orWhere(QueryConditionHelpers.subQueryWhereBetween(field, range))
  }

  whereNotBetween(field: string, range: [any, any]): this {
    return this.where(QueryConditionHelpers.subQueryWhereNotBetween(field, range))
  }

  andWhereNotBetween(field: string, range: [any, any]): this {
    return this.whereNotBetween(field, range)
  }

  orWhereNotBetween(field: string, range: [any, any]): this {
    return this.orWhere(QueryConditionHelpers.subQueryWhereNotBetween(field, range))
  }
}
