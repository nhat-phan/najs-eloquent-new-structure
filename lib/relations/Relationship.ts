/// <reference path="../definitions/model/IModel.ts" />
/// <reference path="../definitions/relations/IRelationship.ts" />

import IModel = NajsEloquent.Model.IModel
import ModelDefinition = NajsEloquent.Model.ModelDefinition
import IRelationship = NajsEloquent.Relation.IRelationship
import RelationshipFetchType = NajsEloquent.Relation.RelationshipFetchType
import IRelationDataBucket = NajsEloquent.Relation.IRelationDataBucket
import IRelationData = NajsEloquent.Relation.IRelationData

import { make } from 'najs-binding'
import { flatten } from 'lodash'
import { relationFeatureOf } from '../util/accessors'
import { RelationUtilities as Utils } from './RelationUtilities'
import { array_unique } from '../util/functions'
import { RelationNotFoundInNewInstanceError } from '../errors/RelationNotFoundInNewInstanceError'
import { isModel, distinctModelByClassInCollection } from '../util/helpers'

export abstract class Relationship<T> implements IRelationship<T> {
  protected name: string
  protected chains: string[]

  // Root information
  protected rootModel: IModel
  protected rootKeyName: string

  // Target information
  private targetModelInstance: IModel
  protected targetDefinition: ModelDefinition
  protected get targetModel(): IModel {
    if (!this.targetModelInstance) {
      this.targetModelInstance = make<IModel>(this.targetDefinition)
    }
    return this.targetModelInstance
  }
  protected targetKeyName: string

  constructor(rootModel: IModel, name: string) {
    this.rootModel = rootModel
    this.name = name
    this.chains = []
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
  abstract fetchData(type: RelationshipFetchType): Promise<T | undefined | null>

  abstract isInverseOf<K>(relation: IRelationship<K>): boolean

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
    this.chains = array_unique(this.chains, flatten(arguments).filter(item => item !== ''))

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

  async loadData(type: 'lazy' | 'eager') {
    const relationData = this.getRelationData().setLoadType(type)
    const result = await this.fetchData(type)

    if (type === 'lazy') {
      relationData.setData(result)
    } else {
      Utils.markLoadedInDataBucket(this, this.rootModel, this.name)
    }
    return this.loadChains(result)
  }

  async loadChains(result: any) {
    if (!result || !this.chains || this.chains.length === 0) {
      return result
    }

    if (isModel(result)) {
      await (result as Model).load(this.chains)
      return result
    }

    const models = distinctModelByClassInCollection(result)
    if (models.length > 0) {
      await Promise.all(models.map(model => model.load(this.chains)))
    }

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
