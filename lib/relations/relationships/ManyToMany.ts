/// <reference path="../../definitions/model/IModel.ts" />
/// <reference path="../../definitions/relations/IRelationship.ts" />
/// <reference path="../../definitions/relations/IManyToManyRelationship.ts" />

import Model = NajsEloquent.Model.IModel
import ModelDefinition = NajsEloquent.Model.ModelDefinition
import RelationshipFetchType = NajsEloquent.Relation.RelationshipFetchType
import IManyToManyRelationship = NajsEloquent.Relation.IManyToManyRelationship
import IQueryBuilder = NajsEloquent.QueryBuilder.IQueryBuilder
import QueryBuilderInternal = NajsEloquent.QueryBuilder.QueryBuilderInternal

// import { flatten } from 'lodash'
import { register, ClassRegistry, make } from 'najs-binding'
import { Relationship } from '../Relationship'
import { RelationshipType } from '../RelationshipType'
import { NajsEloquent as NajsEloquentClasses } from '../../constants'
import { PivotModel } from './pivot/PivotModel'
import { isModel } from '../../util/helpers'
// import { isModel, isCollection } from '../../util/helpers'
import { ModelEvent } from '../../model/ModelEvent'
// import { RelationUtilities } from '../RelationUtilities'
// import { make_collection } from '../../util/factory'

export class ManyToMany<T extends Model> extends Relationship<T> implements IManyToManyRelationship<T> {
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
      this.pivotModelInstance = this.newPivot()
    }
    return this.pivotModelInstance
  }

  collectData(): T | undefined | null {
    return undefined
  }

  // async fetchPivotData(type: RelationshipFetchType): Promise<CollectJs.Collection<Model>> {
  //   const query = this.newPivotQuery(
  //     `${this.getType()}Pivot:${this.targetModel.getModelName()}-${this.rootModel.getModelName()}`
  //   )

  //   if (type === 'lazy') {
  //     query.where(this.pivotRootKeyName, this.rootModel.getAttribute(this.rootKeyName))
  //   } else {
  //     const dataBucket = this.getDataBucket()
  //     if (!dataBucket) {
  //       return make_collection<Model>([])
  //     }

  //     const ids = RelationUtilities.getAttributeListInDataBucket(dataBucket, this.rootModel, this.rootKeyName)
  //     query.whereIn(this.pivotRootKeyName, ids)
  //   }

  //   return query.get()
  // }

  // getQueryBuilder(name: string | undefined): IQueryBuilder<any> {
  //   const queryBuilder = this.targetModel.newQuery(name as any) as QueryBuilderInternal
  //   queryBuilder.handler.setRelationDataBucket(this.getDataBucket())
  //   return this.applyCustomQuery(queryBuilder)
  // }

  async fetchData(type: RelationshipFetchType): Promise<T | undefined | null> {
    // const pivotData = await this.fetchPivotData(type)

    // console.log(pivotData.map(item => item.toObject()))
    // return pivotData as any
    return {} as any
  }

  isInverseOf<K>(relation: NajsEloquent.Relation.IRelationship<K>): boolean {
    return false
  }

  newPivot(data?: object, isGuarded?: boolean): Model {
    if (typeof this.pivot === 'string') {
      if (ClassRegistry.has(this.pivot)) {
        const instance = make<Model>(this.pivot)
        if (isModel(instance)) {
          return instance
        }
      }

      // the pivot is not a model then we should create an pivot model
      this.pivotDefinition = PivotModel.createPivotClass(this.pivot, {
        name: this.pivot,
        foreignKeys: [this.pivotRootKeyName, this.pivotTargetKeyName].sort() as [string, string]
      })
      return Reflect.construct(this.pivotDefinition, Array.from(arguments))
    }

    return Reflect.construct(this.pivot, Array.from(arguments))
  }

  newPivotQuery(name?: string): IQueryBuilder<Model> {
    const queryBuilder = this.pivotModel.newQuery(name as any) as QueryBuilderInternal
    queryBuilder.handler.setRelationDataBucket(this.getDataBucket())
    return queryBuilder
  }

  // flattenArguments(...models: Array<T | T[] | CollectJs.Collection<T>>): T[] {
  //   return flatten(
  //     models.map(item => {
  //       return isCollection(item) ? (item as CollectJs.Collection<T>).all() : (item as T | T[])
  //     })
  //   )
  // }

  async attach(id: string): Promise<this> {
    const result = this.attachByTargetId(id)
    if (typeof result === 'undefined') {
      return this
    }

    await result
    return this
  }

  // attach(...models: Array<T | T[] | CollectJs.Collection<T>>) {
  //   const attachedModels = this.flattenArguments.apply(this, arguments)

  //   attachedModels.forEach(function(model: T) {
  //     if (model.isNew()) {
  //       // model.once(ModelEvent.Saved, async function() {
  //       // })
  //     }
  //   })
  // }

  attachByTargetId(targetId: string): Promise<any> | undefined {
    const pivot = this.newPivot()
    pivot.setAttribute(this.pivotTargetKeyName, targetId)

    const primaryKey = this.rootModel.getAttribute(this.rootKeyName)
    if (primaryKey) {
      pivot.setAttribute(this.pivotRootKeyName, primaryKey)
      return pivot.save()
    }

    this.rootModel.once(ModelEvent.Saved, async () => {
      pivot.setAttribute(this.pivotRootKeyName, this.rootModel.getAttribute(this.rootKeyName))
      await pivot.save()
    })
    return undefined
  }
}
register(ManyToMany, NajsEloquentClasses.Relation.Relationship.ManyToMany)
