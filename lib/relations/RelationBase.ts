/// <reference path="../definitions/model/IModel.ts" />
/// <reference path="../definitions/relations/IRelation.ts" />

import IModel = NajsEloquent.Model.IModel
import IRelation = NajsEloquent.Relation.IRelation
import IRelationDataBucket = NajsEloquent.Relation.IRelationDataBucket
import RelationData = NajsEloquent.Relation.RelationData

import { RelationState } from './RelationState'
import { relationFeatureOf } from '../util/accessors'
import { RelationUtilities } from './RelationUtilities'

export abstract class RelationBase<T> {
  protected name: string
  protected rootModel: IModel
  protected utils: RelationUtilities<T>

  constructor(rootModel: IModel, name: string, utilities?: RelationUtilities<T>) {
    this.rootModel = rootModel
    this.name = name
    this.utils = utilities || new RelationUtilities(this)
  }

  abstract getClassName(): string

  abstract getType(): string

  abstract buildData(): T | undefined | null

  abstract lazyLoad(): Promise<T | undefined | null>

  abstract eagerLoad(): Promise<T | undefined | null>

  abstract isInverseOf<K>(relation: IRelation<K>): boolean

  getRelationData(): RelationData<T> {
    return <any>{}
  }

  isLoaded(): boolean {
    return (
      this.getRelationData().state === RelationState.Loaded ||
      this.utils.isRelationLoadedInDataBucket(this.rootModel, this.name)
    )
  }

  getData(): T | undefined | null {
    if (this.isLoaded()) {
      return undefined
    }

    const relationData = this.getRelationData()
    if (relationData.state === RelationState.Built) {
      return relationData.data
    }

    // TODO: here
    return undefined
  }

  async load(): Promise<T | undefined | null> {
    const relationData = this.getRelationData()
    if (relationData.state === RelationState.Built) {
      return relationData.data
    }

    // here
    return undefined
  }

  getDataBucket(): IRelationDataBucket | undefined {
    return relationFeatureOf(this.rootModel).getDataBucket(this.rootModel)
  }
}
