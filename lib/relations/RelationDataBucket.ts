/// <reference path="../definitions/relations/IRelationDataBucket.ts" />
/// <reference path="../definitions/collect.js/index.d.ts" />
import Autoload = Najs.Contracts.Autoload
import { register, make, getClassName } from 'najs-binding'
import { NajsEloquent } from '../constants'
import { make_collection } from '../util/factory'

function relationFeatureOf(model: NajsEloquent.Model.IModel) {
  return model.getDriver().getRelationFeature()
}

export class RelationDataBucket<T = {}> implements Autoload, NajsEloquent.Relation.IRelationDataBucket<T> {
  protected bucket: { [key in string]: CollectJs.Collection<T> }

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
    const key = relationFeatureOf(model).createKeyForDataBucket(model)
    if (typeof this.bucket[key] === 'undefined') {
      this.bucket[key] = make_collection<T>({} as any)
    }
    return this.bucket[key]
  }
}
register(RelationDataBucket, NajsEloquent.Relation.RelationDataBucket)
