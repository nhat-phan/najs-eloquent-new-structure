/// <reference path="../../definitions/model/IModel.ts" />
/// <reference path="../../definitions/relations/IRelation.ts" />
/// <reference path="../../definitions/query-builders/IQueryBuilder.ts" />
import Model = NajsEloquent.Model.IModel
import ModelDefinition = NajsEloquent.Model.ModelDefinition
import RelationFetchType = NajsEloquent.Relation.RelationFetchType
import QueryBuilderInternal = NajsEloquent.QueryBuilder.QueryBuilderInternal

import { make } from 'najs-binding'
import { Relation } from '../Relation'

export abstract class HasOneOrMany<T> extends Relation<T> {
  protected rootKeyName: string

  private targetModelInstance: Model
  protected targetDefinition: ModelDefinition
  protected targetKeyName: string

  protected is1v1: boolean

  constructor(
    root: Model,
    relationName: string,
    target: ModelDefinition,
    targetKey: string,
    rootKey: string,
    is1v1: boolean
  ) {
    super(root, relationName)
    this.rootKeyName = rootKey
    this.targetDefinition = target
    this.targetKeyName = targetKey
    this.is1v1 = is1v1
  }

  protected get targetModel(): Model {
    if (!this.targetModelInstance) {
      this.targetModelInstance = make<Model>(this.targetDefinition)
    }
    return this.targetModelInstance
  }

  abstract getClassName(): string

  abstract getType(): string

  abstract executeQuery(): T | undefined | null

  getQueryBuilder(name: string | undefined): NajsEloquent.QueryBuilder.IQueryBuilder<Model> {
    const queryBuilder = this.targetModel.newQuery(name as any) as QueryBuilderInternal
    queryBuilder.handler.setRelationDataBucket(this.getDataBucket())
    return queryBuilder
  }

  collectData(): T | undefined | null {
    return undefined
  }

  async fetchData(type: RelationFetchType): Promise<T | undefined | null> {
    return undefined
  }

  isInverseOf<K>(relation: NajsEloquent.Relation.IRelation<K>): boolean {
    return false
  }
}
