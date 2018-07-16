/// <reference path="../../definitions/query-grammars/IBasicConditionQuery.ts" />
/// <reference path="../../definitions/query-builders/IConvention.ts" />
/// <reference path="../../definitions/query-builders/IConditionQueryHandle.ts" />

import SubCondition = NajsEloquent.QueryGrammar.SubCondition
import Operator = NajsEloquent.QueryGrammar.Operator
import Range = NajsEloquent.QueryGrammar.Range
import IBasicConditionQuery = NajsEloquent.QueryGrammar.IBasicConditionQuery
import IConvention = NajsEloquent.QueryBuilder.IConvention

export class ConditionQueryHandle implements NajsEloquent.QueryBuilder.IConditionQueryHandle {
  basicConditionQuery: IBasicConditionQuery
  convention: IConvention

  constructor(basicConditionQuery: IBasicConditionQuery, convention: IConvention) {
    this.basicConditionQuery = basicConditionQuery
    this.convention = convention
  }

  where(conditionBuilder: SubCondition): this
  where(field: string, value: any): this
  where(field: string, operator: Operator, value: any): this
  where(arg0: any, arg1?: any, arg2?: any): this {
    this.basicConditionQuery.where(arg0, arg1, arg2)

    return this
  }

  orWhere(conditionBuilder: SubCondition): this
  orWhere(field: string, value: any): this
  orWhere(field: string, operator: Operator, value: any): this
  orWhere(arg0: any, arg1?: any, arg2?: any): this {
    this.basicConditionQuery.where(arg0, arg1, arg2)

    return this
  }

  andWhere(arg0: any, arg1?: any, arg2?: any): this {
    this.basicConditionQuery.where(arg0, arg1, arg2)

    return this
  }

  whereNot(field: string, values: any): this {
    return this.where(field, '<>', values)
  }

  andWhereNot(field: string, values: any): this {
    return this.whereNot(field, values)
  }

  orWhereNot(field: string, values: any): this {
    return this.orWhere(field, '<>', values)
  }

  whereIn(field: string, values: Array<any>): this {
    return this.where(field, 'in', values)
  }

  andWhereIn(field: string, values: Array<any>): this {
    return this.whereIn(field, values)
  }

  orWhereIn(field: string, values: Array<any>): this {
    return this.orWhere(field, 'in', values)
  }

  whereNotIn(field: string, values: Array<any>): this {
    return this.where(field, 'not-in', values)
  }

  andWhereNotIn(field: string, values: Array<any>): this {
    return this.whereNotIn(field, values)
  }

  orWhereNotIn(field: string, values: Array<any>): this {
    return this.orWhere(field, 'not-in', values)
  }

  whereNull(field: string) {
    return this.where(field, '=', this.convention.getNullValueFor(field))
  }

  andWhereNull(field: string) {
    return this.whereNull(field)
  }

  orWhereNull(field: string) {
    return this.orWhere(field, '=', this.convention.getNullValueFor(field))
  }

  whereNotNull(field: string) {
    return this.where(field, '<>', this.convention.getNullValueFor(field))
  }

  andWhereNotNull(field: string) {
    return this.whereNotNull(field)
  }

  orWhereNotNull(field: string) {
    return this.orWhere(field, '<>', this.convention.getNullValueFor(field))
  }

  whereBetween(field: string, range: Range): this {
    return this.where(field, '>=', range[0]).where(field, '<=', range[1])
  }

  andWhereBetween(field: string, range: Range): this {
    return this.whereBetween(field, range)
  }

  orWhereBetween(field: string, range: Range): this {
    return this.orWhere(function(subQuery) {
      subQuery.where(field, '>=', range[0]).where(field, '<=', range[1])
    })
  }

  whereNotBetween(field: string, range: Range): this {
    return this.where(function(subQuery) {
      subQuery.where(field, '<', range[0]).orWhere(field, '>', range[1])
    })
  }

  andWhereNotBetween(field: string, range: Range): this {
    return this.whereNotBetween(field, range)
  }

  orWhereNotBetween(field: string, range: Range): this {
    return this.orWhere(function(subQuery) {
      subQuery.where(field, '<', range[0]).orWhere(field, '>', range[1])
    })
  }
}
