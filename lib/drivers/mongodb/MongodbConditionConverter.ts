/// <reference path="../../definitions/query-grammars/IConditionQuery.ts" />

import { QueryConditionData, ConditionConverter } from '../../query-builders/shared/ConditionConverter'
import { IAutoload, register, make } from 'najs-binding'
import { NajsEloquent } from '../../constants'
import { MongodbConditionMatcherFactory } from './MongodbConditionMatcherFactory'

// TODO: use BasicQueryConverter instead
export class MongodbConditionConverter extends ConditionConverter implements IAutoload {
  static className: string = NajsEloquent.QueryBuilder.MongodbConditionConverter

  constructor(queryConditions: QueryConditionData[]) {
    super(queryConditions, make<MongodbConditionMatcherFactory>(MongodbConditionMatcherFactory.className), true)
  }

  getClassName() {
    return NajsEloquent.QueryBuilder.MongodbConditionConverter
  }
}
register(MongodbConditionConverter, NajsEloquent.QueryBuilder.MongodbConditionConverter)
