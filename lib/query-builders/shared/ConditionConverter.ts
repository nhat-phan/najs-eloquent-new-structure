/// <reference path="../../definitions/query-grammars/IConditionQuery.ts" />

import IConditionMatcherFactory = NajsEloquent.QueryBuilder.IConditionMatcherFactory

export type QueryData = {
  bool: 'and' | 'or'
  field: string
  operator: NajsEloquent.QueryGrammar.Operator
  value: any
}

export type GroupQueryData = {
  bool: 'and' | 'or'
  queries: QueryData[]
}

export type QueryConditionData = QueryData | GroupQueryData

export class ConditionConverter {
  protected queries: QueryConditionData[]
  protected matcherFactory: IConditionMatcherFactory
  protected simplify: boolean

  constructor(queries: QueryConditionData[], matcherFactory: IConditionMatcherFactory, simplify: boolean) {
    this.queries = queries
    this.matcherFactory = matcherFactory
    this.simplify = simplify
  }

  convert(): object {
    return this.convertQueries(this.queries)
  }

  protected convertQueries(conditions: QueryConditionData[]) {
    if (conditions.length === 0) {
      return {}
    }

    const result = {}

    for (let i = 0, l = conditions.length; i < l; i++) {
      // fix edge case: `query.orWhere().where()...`
      if (i === 0 && conditions[i].bool === 'or') {
        conditions[i].bool = 'and'
      }

      // always change previous statement of OR bool to OR
      if (conditions[i].bool === 'or' && conditions[i - 1].bool === 'and') {
        conditions[i - 1].bool = 'or'
      }
    }
    this.convertConditionsWithAnd(result, <any>conditions.filter(item => item['bool'] === 'and'))
    this.convertConditionsWithOr(result, <any>conditions.filter(item => item['bool'] === 'or'))
    if (!this.simplify) {
      return result
    }

    if (Object.keys(result).length === 1 && typeof result['$and'] !== 'undefined' && result['$and'].length === 1) {
      return result['$and'][0]
    }
    return result
  }

  protected hasAnyIntersectKey(a: Object, b: Object) {
    const keyOfA: string[] = Object.keys(a)
    const keyOfB: string[] = Object.keys(b)
    for (const key of keyOfB) {
      if (keyOfA.indexOf(key) !== -1) {
        return true
      }
    }
    return false
  }

  protected convertConditionsWithAnd(bucket: Object, conditions: QueryConditionData[]) {
    let result: Object | Object[] = {}
    for (const condition of conditions) {
      const query = this.convertCondition(condition)
      if (!Array.isArray(result) && this.hasAnyIntersectKey(result, query)) {
        result = [result]
      }

      if (Array.isArray(result)) {
        result.push(query)
        continue
      }
      Object.assign(result, query)
    }

    if (Array.isArray(result)) {
      Object.assign(bucket, { $and: result })
      return
    }

    const keysLength = Object.keys(result).length
    if (keysLength === 1) {
      Object.assign(bucket, result)
    }
    if (keysLength > 1) {
      Object.assign(bucket, { $and: [result] })
    }
  }

  protected convertConditionsWithOr(bucket: Object, conditions: QueryConditionData[]) {
    const result: Object[] = []
    for (const condition of conditions) {
      const query = this.convertCondition(condition)
      result.push(Object.assign({}, query))
    }

    if (result.length > 1) {
      Object.assign(bucket, { $or: result })
    }
  }

  protected convertCondition(condition: QueryConditionData): object {
    if (typeof condition['queries'] === 'undefined') {
      return this.matcherFactory.transform(this.matcherFactory.make(condition as QueryData))
    }
    const result = this.convertGroupQueryData(condition as GroupQueryData)

    if (Object.keys(result).length === 1 && typeof result['$or'] !== 'undefined' && result['$or'].length === 1) {
      return result['$or'][0]
    }

    return result
  }

  protected convertGroupQueryData(condition: GroupQueryData): object {
    if (!condition.queries || condition.queries.length === 0) {
      return {}
    }

    if (condition.queries.length === 1) {
      return this.convertCondition(<QueryData>condition.queries[0])
    }
    return this.convertNotEmptyGroupQueryData(condition)
  }

  private convertNotEmptyGroupQueryData(condition: GroupQueryData): object {
    const result: object = this.convertQueries(condition.queries)
    if (Object.keys(result).length === 0) {
      return {}
    }

    if (condition.bool === 'and') {
      if (Object.keys(result).length === 1) {
        return result
      }
      return { $and: [result] }
    }

    if (Object.keys(result).length === 1 && typeof result['$or'] !== 'undefined') {
      return result
    }
    return { $or: [result] }
  }
}
