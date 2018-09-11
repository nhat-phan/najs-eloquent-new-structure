/// <reference path="../../definitions/query-builders/IConditionMatcher.ts" />

import IConditionMatcherFactory = NajsEloquent.QueryBuilder.IConditionMatcherFactory
import QueryData = NajsEloquent.QueryBuilder.QueryData

import { register } from 'najs-binding'
import { MongodbConditionMatcher } from './MongodbConditionMatcher'
import { NajsEloquent as NajsEloquentClasses } from '../../constants'

export class MongodbConditionMatcherFactory implements IConditionMatcherFactory {
  static className: string = NajsEloquentClasses.Driver.Mongodb.MongodbConditionMatcherFactory

  getClassName() {
    return NajsEloquentClasses.Driver.Mongodb.MongodbConditionMatcherFactory
  }

  make(data: QueryData): MongodbConditionMatcher {
    return new MongodbConditionMatcher(data.field, data.operator, data.value)
  }

  transform(matcher: MongodbConditionMatcher): object {
    return matcher.getCondition()
  }
}
register(MongodbConditionMatcherFactory, NajsEloquentClasses.Driver.Mongodb.MongodbConditionMatcherFactory, true, true)
