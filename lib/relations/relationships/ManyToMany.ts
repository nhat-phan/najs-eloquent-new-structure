/// <reference path="../../definitions/model/IModel.ts" />
/// <reference path="../../definitions/relations/IRelationship.ts" />

// import Model = NajsEloquent.Model.IModel
// import ModelDefinition = NajsEloquent.Model.ModelDefinition
// import IQueryBuilder = NajsEloquent.QueryBuilder.IQueryBuilder
import RelationshipFetchType = NajsEloquent.Relation.RelationshipFetchType
// import QueryBuilderInternal = NajsEloquent.QueryBuilder.QueryBuilderInternal

import { register, ClassRegistry, make } from 'najs-binding'
import { Relationship } from '../Relationship'
import { RelationshipType } from '../RelationshipType'
import { NajsEloquent as NajsEloquentClasses } from '../../constants'
import { PivotModel } from './pivot/PivotModel'
import { isModel } from '../../util/helpers'
// import { make_collection } from '../../util/factory'

export class ManyToMany<T> extends Relationship<T> {
  static className: string = NajsEloquentClasses.Relation.Relationship.ManyToMany

  protected pivot: ModelDefinition
  protected pivotModelInstance: Model
  protected pivotDefinition: typeof PivotModel
  protected pivotTargetKeyName: string
  protected pivotRootKeyName: string

  constructor(
    root: Model,
    relationName: string,
    target: ModelDefinition,
    pivot: ModelDefinition,
    pivotTargetKeyName: string,
    pivotRootKeyName: string,
    targetKeyName: string,
    rootKeyName: string
  ) {
    super(root, relationName)
    this.targetDefinition = target
    this.pivot = pivot
    this.pivotTargetKeyName = pivotTargetKeyName
    this.pivotRootKeyName = pivotRootKeyName
    this.targetKeyName = targetKeyName
    this.rootKeyName = rootKeyName
  }

  getType() {
    return RelationshipType.ManyToMany
  }

  getClassName() {
    return NajsEloquentClasses.Relation.Relationship.ManyToMany
  }

  protected get pivotModel(): Model {
    if (!this.pivotModelInstance) {
      this.pivotModelInstance = this.getPivotModel()
    }
    return this.pivotModelInstance
  }

  getPivotModel(): Model {
    if (typeof this.pivot === 'string') {
      if (ClassRegistry.has(this.pivot)) {
        const instance = make<Model>(this.pivot)
        if (isModel(instance)) {
          return instance
        }
      }

      // the pivot is not a model then we should create an pivot model
      this.pivotDefinition = PivotModel.createPivotClass(this.pivot, {
        foreignKeys: [this.pivotRootKeyName, this.pivotTargetKeyName].sort() as [string, string]
      })
      return Reflect.construct(this.pivotDefinition, [])
    }

    return Reflect.construct(this.pivot, [])
  }

  collectData(): T | undefined | null {
    return undefined
  }

  // getPivotQueryBuilder(name: string | undefined): IQueryBuilder<any> {
  //   const queryBuilder = this.pivotModel.newQuery(name as any) as QueryBuilderInternal
  //   queryBuilder.handler.setRelationDataBucket(this.getDataBucket())
  //   return queryBuilder
  // }

  // getQueryBuilder(name: string | undefined): IQueryBuilder<any> {
  //   const queryBuilder = this.targetModel.newQuery(name as any) as QueryBuilderInternal
  //   queryBuilder.handler.setRelationDataBucket(this.getDataBucket())
  //   return this.applyCustomQuery(queryBuilder)
  // }

  // async fetchPivotData(type: RelationshipFetchType) {
  //   const query = this.getPivotQueryBuilder(
  //     `${this.getType()}Pivot:${this.targetModel.getModelName()}-${this.rootModel.getModelName()}`
  //   )

  //   if (type === 'lazy') {
  //     query.where(this.pivotRootKeyName, this.rootModel.getAttribute(this.rootKeyName))
  //   } else {
  //     const dataBucket = this.getDataBucket()
  //     if (!dataBucket) {
  //       return make_collection([])
  //     }

  //     const dataBuffer = dataBucket.getDataOf(this.rootModel)
  //     const reader = dataBuffer.getDataReader()
  //     const ids = dataBuffer.map(item => reader.getAttribute(item, this.rootKeyName))
  //     query.whereIn(this.pivotRootKeyName, ids)
  //   }

  //   return query.get()
  // }

  async fetchData(type: RelationshipFetchType): Promise<T | undefined | null> {
    return undefined
  }

  isInverseOf<K>(relation: NajsEloquent.Relation.IRelationship<K>): boolean {
    return false
  }
}
register(ManyToMany, NajsEloquentClasses.Relation.Relationship.ManyToMany)
