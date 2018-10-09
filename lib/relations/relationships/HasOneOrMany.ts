/// <reference path="../../definitions/model/IModel.ts" />
/// <reference path="../../definitions/relations/IRelationship.ts" />
/// <reference path="../../definitions/data/IDataCollector.ts" />
/// <reference path="../../definitions/query-builders/IQueryBuilder.ts" />
import Model = NajsEloquent.Model.IModel
import ModelDefinition = NajsEloquent.Model.ModelDefinition
import RelationshipFetchType = NajsEloquent.Relation.RelationshipFetchType
import IQueryBuilder = NajsEloquent.QueryBuilder.IQueryBuilder
import QueryBuilderInternal = NajsEloquent.QueryBuilder.QueryBuilderInternal
import IDataCollector = NajsEloquent.Data.IDataCollector

import { Relationship } from '../Relationship'
import { DataConditionMatcher } from '../../data/DataConditionMatcher'

export abstract class HasOneOrMany<T> extends Relationship<T> {
  constructor(root: Model, relationName: string, target: ModelDefinition, targetKey: string, rootKey: string) {
    super(root, relationName)
    this.rootKeyName = rootKey
    this.targetDefinition = target
    this.targetKeyName = targetKey
  }

  abstract getClassName(): string

  abstract getType(): string

  abstract executeQuery(queryBuilder: IQueryBuilder<any>): Promise<T | undefined | null>

  abstract executeCollector(collector: IDataCollector<any>): T | undefined | null

  abstract getEmptyValue(): T | undefined

  getQueryBuilder(name: string | undefined): IQueryBuilder<any> {
    const queryBuilder = this.targetModel.newQuery(name as any) as QueryBuilderInternal
    queryBuilder.handler.setRelationDataBucket(this.getDataBucket())
    return queryBuilder
  }

  collectData(): T | undefined | null {
    const dataBucket = this.getDataBucket()
    if (!dataBucket) {
      return undefined
    }

    const dataBuffer = dataBucket.getDataOf(this.targetModel)
    const collector = dataBuffer.getCollector()
    const rootKey = this.rootModel.getAttribute(this.rootKeyName)

    collector.filterBy({
      $and: [new DataConditionMatcher(this.targetKeyName, '=', rootKey, dataBuffer.getDataReader())]
    })
    return this.executeCollector(collector)
  }

  async fetchData(type: RelationshipFetchType): Promise<T | undefined | null> {
    const query = this.getQueryBuilder(`${this.getType()}:${this.targetModel.getModelName()}`)

    if (type === 'lazy') {
      query.where(this.targetKeyName, this.rootModel.getAttribute(this.rootKeyName))
    } else {
      const dataBucket = this.getDataBucket()
      if (!dataBucket) {
        return this.getEmptyValue()
      }

      const dataBuffer = dataBucket.getDataOf(this.rootModel)
      const reader = dataBuffer.getDataReader()
      const ids = dataBuffer.map(item => reader.getAttribute(item, this.rootKeyName))
      query.whereIn(this.targetKeyName, ids)
    }

    return this.executeQuery(query)
  }

  isInverseOf<K>(relation: NajsEloquent.Relation.IRelationship<K>): boolean {
    return false
  }
}