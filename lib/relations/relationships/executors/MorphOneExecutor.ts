/// <reference path="../../../definitions/data/IDataCollector.ts" />
/// <reference path="../../../definitions/relations/IRelationDataBucket.ts" />
/// <reference path="../../../definitions/query-builders/IConditionMatcher.ts" />
/// <reference path="../../../definitions/query-builders/IQueryBuilder.ts" />

import IDataCollector = NajsEloquent.Data.IDataCollector
import IDataReader = NajsEloquent.Data.IDataReader
import IConditionMatcher = NajsEloquent.QueryBuilder.IConditionMatcher
import IQueryBuilder = NajsEloquent.QueryBuilder.IQueryBuilder
import IRelationDataBucket = NajsEloquent.Relation.IRelationDataBucket

import { DataConditionMatcher } from './../../../data/DataConditionMatcher'
import { HasOneExecutor } from './HasOneExecutor'

export class MorphOneExecutor<T> extends HasOneExecutor<T> {
  protected morphTypeValue: string
  protected targetMorphTypeName: string

  constructor(dataBucket: IRelationDataBucket, targetModel: IModel, targetMorphTypeName: string, typeValue: string) {
    super(dataBucket, targetModel)
    this.morphTypeValue = typeValue
    this.targetMorphTypeName = targetMorphTypeName
  }

  setCollector(collector: IDataCollector<any>, conditions: IConditionMatcher<any>[], reader: IDataReader<any>): this {
    conditions.unshift(new DataConditionMatcher(this.targetMorphTypeName, '=', this.morphTypeValue, reader))

    return super.setCollector(collector, conditions, reader)
  }

  setQuery(query: IQueryBuilder<any>): this {
    query.where(this.targetMorphTypeName, this.morphTypeValue)

    return super.setQuery(query)
  }
}
