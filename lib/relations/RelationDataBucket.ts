/// <reference path="../definitions/relations/IRelationDataBucket.ts" />
/// <reference path="../definitions/collect.js/index.d.ts" />

import Model = NajsEloquent.Model.IModel
import IRelationDataBucket = NajsEloquent.Relation.IRelationDataBucket
import Autoload = Najs.Contracts.Autoload
import { register, make, getClassName } from 'najs-binding'
import { NajsEloquent as NajsEloquentClasses } from '../constants'
import { make_collection } from '../util/factory'
import { relationFeatureOf } from '../util/accessors'
import { GenericData } from '../util/GenericData'

export class RelationDataBucket<T = {}> implements Autoload, IRelationDataBucket<T> {
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
    return NajsEloquentClasses.Relation.RelationDataBucket
  }

  add(model: Model): this {
    this.getRecords(model).put(model.getPrimaryKey(), model.getRecord())
    return this
  }

  makeModel<M extends Model = Model>(model: M, record: T): M {
    const instance = make<M>(getClassName(model), [record, false])
    relationFeatureOf(instance).setDataBucket(instance, this)
    return instance
  }

  getRecords<M extends Model = Model>(model: M): CollectJs.Collection<T> {
    return this.bucket[this.createKey(model)].records
  }

  getMetadata(model: Model): GenericData {
    return this.bucket[this.createKey(model)].metadata
  }

  createKey(model: Model): string {
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
register(RelationDataBucket, NajsEloquentClasses.Relation.RelationDataBucket)
