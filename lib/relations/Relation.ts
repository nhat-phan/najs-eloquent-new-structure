/// <reference path="../definitions/model/IModel.ts" />
/// <reference path="../definitions/relations/IRelation.ts" />

import IModel = NajsEloquent.Model.IModel
import IRelation = NajsEloquent.Relation.IRelation
import RelationFetchType = NajsEloquent.Relation.RelationFetchType
import IRelationDataBucket = NajsEloquent.Relation.IRelationDataBucket
import IRelationData = NajsEloquent.Relation.IRelationData

import { flatten } from 'lodash'
import { relationFeatureOf } from '../util/accessors'
import { RelationUtilities as Utils } from './RelationUtilities'
import { array_unique } from '../util/functions'
import { RelationNotFoundInNewInstanceError } from '../errors/RelationNotFoundInNewInstanceError'
// import { isModel, isCollection } from '../util/helpers'

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

  /**
   * Collect data from RelationDataBucket.
   */
  abstract collectData(): T | undefined | null

  /**
   * Fetch data from database or data source.
   */
  abstract fetchData(type: RelationFetchType): Promise<T | undefined | null>

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
    if (!this.isLoaded()) {
      return undefined
    }

    const relationData = this.getRelationData()
    if (relationData.hasData()) {
      return relationData.getData()
    }

    return this.markInverseRelationsToLoaded(relationData.setData(this.collectData()))
  }

  markInverseRelationsToLoaded<T>(result: T): T {
    // TODO: implementation needed
    // if (!result) {
    //   return result
    // }

    // if (isModel(result)) {
    // }

    // if (isCollection(result)) {
    // }

    return result
  }

  async lazyLoad(): Promise<T | undefined | null> {
    return this.loadData('lazy')
  }

  async eagerLoad(): Promise<T | undefined | null> {
    return this.loadData('eager')
  }

  protected async loadData(type: 'lazy' | 'eager') {
    // const relationData = this.getRelationData().setLoadType(type)
    this.getRelationData().setLoadType(type)

    const result = await this.fetchData(type)

    // return this.loadChainRelations(result)
    // return type === 'lazy' ? relationData.setData(result) : result
    return result
  }

  async load(): Promise<T | undefined | null> {
    if (this.isLoaded()) {
      return this.getData()
    }

    const dataBucket = this.getDataBucket()
    if (!dataBucket) {
      if (this.rootModel.isNew()) {
        throw new RelationNotFoundInNewInstanceError(this.name, this.rootModel.getModelName())
      }

      return await this.lazyLoad()
    }

    return await this.eagerLoad()
  }
}
