/// <reference path="../definitions/relations/IRelationDataBucket.ts" />
/// <reference path="../definitions/collect.js/index.d.ts" />

import Autoload = Najs.Contracts.Autoload
import { register, make, getClassName } from 'najs-binding'
import { NajsEloquent } from '../constants'
import { make_collection } from '../util/factory'
import { relationFeatureOf } from '../util/accessors'
import { GenericData } from '../util/GenericData'

export class RelationDataBucket<T = {}> implements Autoload, NajsEloquent.Relation.IRelationDataBucket<T> {
  protected bucket: {
    [key in string]: {
      records: CollectJs.Collection<T>
      metadata: GenericData
    }
  }

  constructor() {
    this.bucket = {}
  }

  getClassName(): string {
    return NajsEloquent.Relation.RelationDataBucket
  }

  add(model: NajsEloquent.Model.IModel): this {
    this.getRecords(model).put(model.getPrimaryKey(), model.getRecord())
    return this
  }

  makeModel<M extends NajsEloquent.Model.IModel = NajsEloquent.Model.IModel>(model: M, record: T): M {
    const instance = make<M>(getClassName(model), [record, false])
    relationFeatureOf(instance).setDataBucket(instance, this)
    return instance
  }

  getRecords<M extends NajsEloquent.Model.IModel = NajsEloquent.Model.IModel>(model: M): CollectJs.Collection<T> {
    return this.bucket[this.createKey(model)].records
  }

  getMetadata(model: NajsEloquent.Model.IModel): GenericData {
    return this.bucket[this.createKey(model)].metadata
  }

  createKey(model: NajsEloquent.Model.IModel): string {
    const key = relationFeatureOf(model).createKeyForDataBucket(model)
    if (typeof this.bucket[key] === 'undefined') {
      this.bucket[key] = {
        records: make_collection<T>({} as any),
        metadata: new GenericData({})
      }
    }
    return key
  }
}
register(RelationDataBucket, NajsEloquent.Relation.RelationDataBucket)
