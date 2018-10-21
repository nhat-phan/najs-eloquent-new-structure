/// <reference path="../../definitions/model/IModel.ts" />
/// <reference path="../../definitions/relations/IRelationship.ts" />

// import Model = NajsEloquent.Model.IModel
// import ModelDefinition = NajsEloquent.Model.ModelDefinition
import RelationshipFetchType = NajsEloquent.Relation.RelationshipFetchType

import { register, ClassRegistry, make } from 'najs-binding'
import { Relationship } from '../Relationship'
import { RelationshipType } from '../RelationshipType'
import { NajsEloquent as NajsEloquentClasses } from '../../constants'
import { PivotModel } from './pivot/PivotModel'
import { isModel } from '../../util/helpers'

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

  async fetchData(type: RelationshipFetchType): Promise<T | undefined | null> {
    return undefined
  }

  isInverseOf<K>(relation: NajsEloquent.Relation.IRelationship<K>): boolean {
    return false
  }
}
register(ManyToMany, NajsEloquentClasses.Relation.Relationship.ManyToMany)
