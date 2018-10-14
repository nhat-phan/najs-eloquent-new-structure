/// <reference path="../../definitions/model/IModel.ts" />
/// <reference path="../../definitions/relations/IRelationship.ts" />
/// <reference path="../../definitions/data/IDataCollector.ts" />
/// <reference path="../../definitions/query-builders/IQueryBuilder.ts" />

import Model = NajsEloquent.Model.IModel
import ModelDefinition = NajsEloquent.Model.ModelDefinition
import RelationshipFetchType = NajsEloquent.Relation.RelationshipFetchType
import IRelationshipExecutor = NajsEloquent.Relation.IRelationshipExecutor
import IQueryBuilder = NajsEloquent.QueryBuilder.IQueryBuilder
import QueryBuilderInternal = NajsEloquent.QueryBuilder.QueryBuilderInternal

import { Relationship } from '../Relationship'
// import { RelationshipType } from '../RelationshipType'
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

  abstract getExecutor(): IRelationshipExecutor<T>

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
    return this.getExecutor().executeCollector(collector)
  }

  async fetchData(type: RelationshipFetchType): Promise<T | undefined | null> {
    const query = this.getQueryBuilder(`${this.getType()}:${this.targetModel.getModelName()}`)

    if (type === 'lazy') {
      query.where(this.targetKeyName, this.rootModel.getAttribute(this.rootKeyName))
    } else {
      const dataBucket = this.getDataBucket()
      if (!dataBucket) {
        return this.getExecutor().getEmptyValue()
      }

      const dataBuffer = dataBucket.getDataOf(this.rootModel)
      const reader = dataBuffer.getDataReader()
      const ids = dataBuffer.map(item => reader.getAttribute(item, this.rootKeyName))
      query.whereIn(this.targetKeyName, ids)
    }

    return this.getExecutor().executeQuery(query)
  }

  isInverseOf<K>(relationship: NajsEloquent.Relation.IRelationship<K>): boolean {
    return false
    // if (!(relationship instanceof HasOneOrMany)) {
    //   console.log('a')
    //   return false
    // }

    // if (!this.isInverseOfTypeMatched(relationship)) {
    //   console.log('b')
    //   return false
    // }

    // console.log('c')
    // return (
    //   this.rootModel.getModelName() === relationship.targetModel.getModelName() &&
    //   this.rootKeyName === relationship.targetKeyName &&
    //   this.targetModel.getModelName() === relationship.rootModel.getModelName() &&
    //   this.targetKeyName === relationship.rootKeyName
    // )
  }

  // isInverseOfTypeMatched(relationship: HasOneOrMany<any>) {
  //   const thisType = this.getType()
  //   const comparedType = relationship.getType()

  //   if (thisType !== RelationshipType.BelongsTo && comparedType !== RelationshipType.BelongsTo) {
  //     return false
  //   }

  //   if (thisType === RelationshipType.BelongsTo) {
  //     return comparedType === RelationshipType.HasMany || comparedType === RelationshipType.HasOne
  //   }

  //   return thisType === RelationshipType.HasMany || thisType === RelationshipType.HasOne
  // }
}
