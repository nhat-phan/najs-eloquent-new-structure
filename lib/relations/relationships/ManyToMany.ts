/// <reference path="../../definitions/collect.js/index.d.ts" />
/// <reference path="../../definitions/model/IModel.ts" />
/// <reference path="../../definitions/data/IDataReader.ts" />
/// <reference path="../../definitions/relations/IRelationship.ts" />
/// <reference path="../../definitions/relations/IRelationDataBucket.ts" />
/// <reference path="../../definitions/relations/IManyToManyRelationship.ts" />

import Model = NajsEloquent.Model.IModel
import ModelDefinition = NajsEloquent.Model.ModelDefinition
import RelationshipFetchType = NajsEloquent.Relation.RelationshipFetchType
import IRelationDataBucket = NajsEloquent.Relation.IRelationDataBucket
import IManyToMany = NajsEloquent.Relation.IManyToManyRelationship
import Collection = CollectJs.Collection

// import { flatten } from 'lodash'
import { register } from 'najs-binding'
import { ManyToManyBase } from './ManyToManyBase'
import { RelationshipType } from '../RelationshipType'
import { NajsEloquent as NajsEloquentClasses } from '../../constants'
import { PivotModel } from './pivot/PivotModel'
// import { isModel, isCollection } from '../../util/helpers'
import { ModelEvent } from '../../model/ModelEvent'
import { RelationUtilities } from '../RelationUtilities'
import { make_collection } from '../../util/factory'
import { DataConditionMatcher } from '../../data/DataConditionMatcher'

export class ManyToMany<T extends Model> extends ManyToManyBase<T> implements IManyToMany<T> {
  static className: string = NajsEloquentClasses.Relation.Relationship.ManyToMany

  protected pivot: ModelDefinition
  protected pivotModelInstance: Model
  protected pivotDefinition: typeof PivotModel
  protected pivotTargetKeyName: string
  protected pivotRootKeyName: string

  getType() {
    return RelationshipType.ManyToMany
  }

  getClassName() {
    return NajsEloquentClasses.Relation.Relationship.ManyToMany
  }

  collectPivotData(dataBucket: IRelationDataBucket): object {
    const rootPrimaryKey = this.rootModel.getAttribute(this.rootKeyName)
    if (!rootPrimaryKey) {
      return {}
    }

    const dataBuffer = dataBucket.getDataOf(this.pivotModel)
    const reader = dataBuffer.getDataReader()
    const raw = dataBuffer
      .getCollector()
      .filterBy({
        $and: [new DataConditionMatcher(this.pivotRootKeyName, '=', rootPrimaryKey, reader)]
      })
      .exec()

    const pivotTargetKeyName = this.pivotTargetKeyName
    return raw.reduce(function(memo, item) {
      const targetPrimaryKey = reader.getAttribute(item, pivotTargetKeyName) as any
      memo[targetPrimaryKey.toString()] = item
      return memo
    }, {})
  }

  collectData(): Collection<T> | undefined | null {
    const dataBucket = this.getDataBucket()
    if (!dataBucket) {
      return make_collection<T>([])
    }

    const pivotData = this.collectPivotData(dataBucket)

    const dataBuffer = dataBucket.getDataOf(this.targetModel)
    const reader = dataBuffer.getDataReader()
    const collector = dataBuffer.getCollector().filterBy({
      $and: [new DataConditionMatcher(this.targetKeyName, 'in', Object.keys(pivotData), reader)]
    })
    const pivotModel = this.pivotModel

    return make_collection(collector.exec(), item => {
      const instance = dataBucket.makeModel(this.targetModel, item)
      const targetPrimaryKey = (reader.getAttribute(item, this.targetKeyName) as any).toString()
      instance['pivot'] = dataBucket.makeModel(pivotModel, pivotData[targetPrimaryKey])
      return instance
    }) as any
  }

  async fetchPivotData(type: RelationshipFetchType): Promise<CollectJs.Collection<Model>> {
    const name = `${this.getType()}Pivot:${this.targetModel.getModelName()}-${this.rootModel.getModelName()}`
    if (type === 'lazy') {
      return this.newPivotQuery(name).get()
    }

    const dataBucket = this.getDataBucket()
    if (!dataBucket) {
      return make_collection<Model>([])
    }

    const query = this.newPivotQuery(name, true)
    const ids = RelationUtilities.getAttributeListInDataBucket(dataBucket, this.rootModel, this.rootKeyName)
    return query.whereIn(this.pivotRootKeyName, ids).get()
  }

  async fetchData(type: RelationshipFetchType): Promise<Collection<T> | undefined | null> {
    const pivotData = await this.fetchPivotData(type)

    const queryName = `${this.getType()}:${this.targetModel.getModelName()}-${this.rootModel.getModelName()}`
    const query = this.getQueryBuilder(queryName)
    const targetKeysInPivot = pivotData.map(item => item.getAttribute(this.pivotTargetKeyName)).all()

    return query.whereIn(this.targetKeyName, targetKeysInPivot).get()
  }

  async attach(id: string): Promise<this> {
    const result = this.attachByTargetId(id)
    if (typeof result === 'undefined') {
      return this
    }

    await result
    return this
  }

  // flattenArguments(...models: Array<T | T[] | CollectJs.Collection<T>>): T[] {
  //   return flatten(
  //     models.map(item => {
  //       return isCollection(item) ? (item as CollectJs.Collection<T>).all() : (item as T | T[])
  //     })
  //   )
  // }
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

    const rootPrimaryKey = this.rootModel.getAttribute(this.rootKeyName)
    if (rootPrimaryKey) {
      pivot.setAttribute(this.pivotRootKeyName, rootPrimaryKey)
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
