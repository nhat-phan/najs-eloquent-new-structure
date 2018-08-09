/// <reference path="../definitions/model/IModel.ts" />
/// <reference path="../definitions/relations/IRelation.ts" />

import IModel = NajsEloquent.Model.IModel
import IRelation = NajsEloquent.Relation.IRelation
import IRelationDataBucket = NajsEloquent.Relation.IRelationDataBucket
import IRelationData = NajsEloquent.Relation.IRelationData

import { flatten } from 'lodash'
import { relationFeatureOf } from '../util/accessors'
import { RelationUtilities as Utils } from './RelationUtilities'
import { array_unique } from '../util/functions'

export abstract class Relation<T> {
  protected name: string
  protected rootModel: IModel
  protected loadChains: string[]

  constructor(rootModel: IModel, name: string) {
    this.rootModel = rootModel
    this.name = name
    this.loadChains = []
  }

  abstract getClassName(): string

  abstract getType(): string

  abstract buildData(): T | undefined | null

  abstract lazyLoad(): Promise<T | undefined | null>

  abstract eagerLoad(): Promise<T | undefined | null>

  abstract isInverseOf<K>(relation: IRelation<K>): boolean

  getName() {
    return this.name
  }

  getRelationData(): IRelationData<T> {
    return relationFeatureOf(this.rootModel).findDataByName<T>(this.rootModel, this.name)
  }

  getDataBucket(): IRelationDataBucket | undefined {
    return relationFeatureOf(this.rootModel).getDataBucket(this.rootModel)
  }

  with(...relations: Array<string | string[]>): this {
    this.loadChains = array_unique(this.loadChains, flatten(arguments).filter(item => item !== ''))

    return this
  }

  isLoaded(): boolean {
    return this.getRelationData().isLoaded() || Utils.isLoadedInDataBucket(this, this.rootModel, this.name)
  }

  getData(): T | undefined | null {
    // if (this.isLoaded()) {
    //   return undefined
    // }

    // const relationData = this.getRelationData()
    // if (relationData.isBuilt()) {
    //   return relationData.getData()
    // }

    // TODO: here
    return undefined
  }

  async load(): Promise<T | undefined | null> {
    // const relationData = this.getRelationData()
    // if (relationData.isBuilt()) {
    //   return relationData.getData()
    // }

    // here
    return undefined
  }
}
