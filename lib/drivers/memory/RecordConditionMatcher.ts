/// <reference path="../../definitions/query-builders/IConditionMatcher.ts" />

import IConditionMatcher = NajsEloquent.QueryBuilder.IConditionMatcher
import ConditionMatcherOperator = NajsEloquent.QueryBuilder.ConditionMatcherOperator

import * as Lodash from 'lodash'
import { Record } from '../Record'

export class RecordConditionMatcher implements IConditionMatcher<Record> {
  protected field: string
  protected operator: ConditionMatcherOperator
  protected value: any

  constructor(field: string, operator: ConditionMatcherOperator, value: any) {
    this.field = field
    this.operator = operator
    this.value = value
  }

  isEqual(record: Record): boolean {
    return Lodash.eq(record.getAttribute(this.field), this.value)
  }

  isLessThan(record: Record): boolean {
    return Lodash.lt(record.getAttribute(this.field), this.value)
  }

  isLessThanOrEqual(record: Record): boolean {
    return Lodash.lte(record.getAttribute(this.field), this.value)
  }

  isGreaterThan(record: Record): boolean {
    return Lodash.gt(record.getAttribute(this.field), this.value)
  }

  isGreaterThanOrEqual(record: Record): boolean {
    return Lodash.gte(record.getAttribute(this.field), this.value)
  }

  isInArray(record: Record): boolean {
    return Lodash.includes(this.value, record.getAttribute(this.field))
  }

  isMatch(record: Record): boolean {
    switch (this.operator) {
      case '=':
        return this.isEqual(record)

      case '!=':
        return !this.isEqual(record)

      case '<':
        return this.isLessThan(record)

      case '<=':
        return this.isLessThanOrEqual(record)

      case '>':
        return this.isGreaterThan(record)

      case '>=':
        return this.isGreaterThanOrEqual(record)

      case 'in':
        return this.isInArray(record)

      case 'not-in':
        return !this.isInArray(record)

      default:
        return false
    }
  }
}
