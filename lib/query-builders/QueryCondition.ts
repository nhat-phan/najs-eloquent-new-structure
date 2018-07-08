/// <reference path="../definitions/query-grammars/IBasicConditionQuery.ts" />
/// <reference path="../definitions/query-grammars/IConditionQuery.ts" />

import SubCondition = NajsEloquent.QueryGrammar.SubCondition
import Operator = NajsEloquent.QueryGrammar.Operator
import IBasicConditionQuery = NajsEloquent.QueryGrammar.IBasicConditionQuery
import IConvention = NajsEloquent.QueryBuilder.IConvention
import IConditionQueryHandle = NajsEloquent.QueryBuilder.IConditionQueryHandle

import { isFunction } from 'lodash'
import { ConditionQueryHandle } from './ConditionQueryHandle'

export class QueryCondition implements IBasicConditionQuery {
  convention: IConvention
  isSubQuery: boolean
  bool: 'and' | 'or'
  operator: Operator
  field: string
  value: string
  queries: QueryCondition[]
  conditionQueryHandle: IConditionQueryHandle

  protected constructor() {
    this.isSubQuery = false
    this.queries = []
  }

  static create(
    convention: IConvention,
    operator: 'and' | 'or',
    arg0: string | SubCondition,
    arg1: Operator | any,
    arg2: any
  ): QueryCondition {
    const condition = new QueryCondition()
    condition.convention = convention
    condition.buildQuery(operator, arg0, arg1, arg2)
    return condition
  }

  protected getConditionQueryHandle(): IConditionQueryHandle {
    return new ConditionQueryHandle(this, this.convention)
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

  protected buildQuery(bool: 'and' | 'or', arg0: string | SubCondition, arg1: Operator | any, arg2: any): this {
    let queryCondition
    if (this.isSubQuery) {
      queryCondition = new QueryCondition()
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

  protected buildSubQuery(queryCondition: QueryCondition, arg0: SubCondition) {
    // case 1
    const query = new QueryCondition()
    query.convention = this.convention
    query.isSubQuery = true
    arg0.call(undefined, query.getConditionQueryHandle())
    for (const instance of query.queries) {
      queryCondition.queries.push(instance)
    }
    query.isSubQuery = false
    return this
  }

  where(conditionBuilder: SubCondition): this
  where(field: string, value: any): this
  where(field: string, operator: Operator, value: any): this
  where(arg0: any, arg1?: any, arg2?: any): this {
    return this.buildQuery('and', arg0, arg1, arg2)
  }

  orWhere(conditionBuilder: SubCondition): this
  orWhere(field: string, value: any): this
  orWhere(field: string, operator: Operator, value: any): this
  orWhere(arg0: any, arg1?: any, arg2?: any): this {
    return this.buildQuery('or', arg0, arg1, arg2)
  }
}
