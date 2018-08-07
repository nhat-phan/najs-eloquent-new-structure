/// <reference path="../definitions/relations/IRelationDataBucket.ts" />
/// <reference path="../definitions/collect.js/index.d.ts" />
import Autoload = Najs.Contracts.Autoload
import { register, make, getClassName } from 'najs-binding'
import { NajsEloquent } from '../constants'
import { make_collection } from '../util/factory'

export class RelationDataBucket<T = {}> implements Autoload, NajsEloquent.Relation.IRelationDataBucket<T> {
  protected bucket: { [key in string]: CollectJs.Collection<T> }

  constructor() {
    this.bucket = {}
  }

  getClassName(): string {
    return NajsEloquent.Relation.RelationDataBucket
  }

  gather(model: NajsEloquent.Model.IModel): this {
    const key: string = this.createKeyForModel(model)

    this.bucket[key].put(model.getPrimaryKey(), model.getRecord())

    return this
  }

  makeModel<M extends NajsEloquent.Model.IModel = NajsEloquent.Model.IModel>(model: M, record: T): M {
    const instance = make<NajsEloquent.Model.ModelInternal>(getClassName(model), [record, false])
    // TODO: fix here, use RelationFeature instead of export the attribute out of instance
    instance.relationDataBucket = this
    return instance as any
  }

  getRecords<M extends NajsEloquent.Model.IModel = NajsEloquent.Model.IModel>(model: M): CollectJs.Collection<T> {
    return this.bucket[this.createKeyForModel(model)]
  }

  createKeyForModel<M extends NajsEloquent.Model.IModel = NajsEloquent.Model.IModel>(model: M): string {
    const key = model.getRecordName()
    if (typeof this.bucket[key] === 'undefined') {
      this.bucket[key] = make_collection<T>({} as any)
    }
    return key
  }
}
register(RelationDataBucket, NajsEloquent.Relation.RelationDataBucket)
