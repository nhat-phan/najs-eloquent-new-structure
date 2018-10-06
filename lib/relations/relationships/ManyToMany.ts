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

  protected pivotModel: PivotModel
  protected pivotDefinition: typeof PivotModel
  protected pivotTargetKeyName: string
  protected pivotRootKeyName: string

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
