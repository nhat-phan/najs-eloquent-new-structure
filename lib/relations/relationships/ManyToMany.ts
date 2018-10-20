/// <reference path="../../definitions/model/IModel.ts" />
/// <reference path="../../definitions/relations/IRelationship.ts" />

// import Model = NajsEloquent.Model.IModel
// import ModelDefinition = NajsEloquent.Model.ModelDefinition
import RelationshipFetchType = NajsEloquent.Relation.RelationshipFetchType

import { Relationship } from '../Relationship'
import { RelationshipType } from '../RelationshipType'
import { NajsEloquent as NajsEloquentClasses } from '../../constants'
import { PivotModel } from './pivot/PivotModel'

export class ManyToMany<T> extends Relationship<T> {
  static className: string = NajsEloquentClasses.Relation.Relationship.ManyToMany

  protected pivot: ModelDefinition
  protected pivotModel: PivotModel
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
