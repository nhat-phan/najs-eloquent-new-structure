/// <reference path="../../definitions/query-builders/IConditionMatcher.ts" />

import Operator = NajsEloquent.QueryGrammar.Operator
import IConditionMatcher = NajsEloquent.QueryBuilder.IConditionMatcher

import { set } from 'lodash'

export class MongodbConditionMatcher implements IConditionMatcher<any> {
  protected condition: object

  constructor(field: string, operator: Operator, value: any) {
    this.condition = this.buildNativeCondition(field, operator, value)
  }

  buildNativeCondition(field: string, operator: Operator, value: any) {
    if (typeof value === 'undefined') {
      return {}
    }

    switch (operator) {
      case '==':
        return set({}, field, value)

      case '!=':
      case '<>':
        return set({}, field, { $ne: value })

      case '<':
        return set({}, field, { $lt: value })

      case '<=':
      case '=<':
        return set({}, field, { $lte: value })

      case '>':
        return set({}, field, { $gt: value })

      case '>=':
      case '=>':
        return set({}, field, { $gte: value })

      case 'in':
        return set({}, field, { $in: value })

      case 'not-in':
        return set({}, field, { $nin: value })

      case '=':
      default:
        return set({}, field, value)
    }
  }

  isMatch(record: any): boolean {
    throw new Error('This class builds a condition for native matcher, please do not use isMatch() function.')
  }

  getCondition(): object {
    return this.condition
  }
}
