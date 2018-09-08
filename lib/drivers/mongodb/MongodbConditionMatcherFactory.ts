/// <reference path="../../definitions/query-builders/IConditionMatcher.ts" />

import IConditionMatcherFactory = NajsEloquent.QueryBuilder.IConditionMatcherFactory
import ConditionMatcherOperator = NajsEloquent.QueryBuilder.ConditionMatcherOperator

import { MongodbConditionMatcher } from './MongodbConditionMatcher'

export class MongodbConditionMatcherFactory implements IConditionMatcherFactory {
  make(field: string, operator: ConditionMatcherOperator, value: any): MongodbConditionMatcher {
    return new MongodbConditionMatcher(field, operator, value)
  }
}
