/// <reference path="../../../definitions/data/IDataCollector.ts" />
/// <reference path="../../../definitions/relations/IRelationDataBucket.ts" />
/// <reference path="../../../definitions/query-builders/IConditionMatcher.ts" />
/// <reference path="../../../definitions/query-builders/IQueryBuilder.ts" />

import IDataCollector = NajsEloquent.Data.IDataCollector
import IDataReader = NajsEloquent.Data.IDataReader
import IConditionMatcher = NajsEloquent.QueryBuilder.IConditionMatcher
import IQueryBuilder = NajsEloquent.QueryBuilder.IQueryBuilder
import IRelationDataBucket = NajsEloquent.Relation.IRelationDataBucket

import { DataConditionMatcher } from '../../../data/DataConditionMatcher'
import { HasManyExecutor } from './HasManyExecutor'
import { Relationship } from '../../Relationship'

export class MorphManyExecutor<T> extends HasManyExecutor<T> {
  protected targetMorphType: string
  protected targetMorphTypeName: string

  constructor(dataBucket: IRelationDataBucket, targetModel: IModel, targetMorphTypeName: string) {
    super(dataBucket, targetModel)
    this.targetMorphType = Relationship.findMorphType(this.targetModel)
    this.targetMorphTypeName = targetMorphTypeName
  }

  setCollector(collector: IDataCollector<any>, conditions: IConditionMatcher<any>[], reader: IDataReader<any>): this {
    conditions.unshift(new DataConditionMatcher(this.targetMorphTypeName, '=', this.targetMorphType, reader))

    return super.setCollector(collector, conditions, reader)
  }

  setQuery(query: IQueryBuilder<any>): this {
    query.where(this.targetMorphTypeName, '=', this.targetMorphType)

    return super.setQuery(query)
  }
}
