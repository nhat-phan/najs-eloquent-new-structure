/// <reference path="../../../definitions/data/IDataCollector.ts" />
/// <reference path="../../../definitions/model/IModel.ts" />
/// <reference path="../../../definitions/relations/IRelationshipExecutor.ts" />
/// <reference path="../../../definitions/relations/IRelationDataBucket.ts" />
/// <reference path="../../../definitions/query-builders/IQueryBuilder.ts" />
/// <reference path="../../../definitions/collect.js/index.d.ts" />

import IModel = NajsEloquent.Model.IModel
import IQueryBuilder = NajsEloquent.QueryBuilder.IQueryBuilder
import IDataCollector = NajsEloquent.Data.IDataCollector
import IRelationDataBucket = NajsEloquent.Relation.IRelationDataBucket
import Collection = CollectJs.Collection

import { make_collection } from '../../../util/factory'

export class ManyRowsExecutor<T> implements NajsEloquent.Relation.IRelationshipExecutor<Collection<T>> {
  protected dataBucket: IRelationDataBucket
  protected targetModel: IModel

  constructor(dataBucket: IRelationDataBucket, targetModel: IModel) {
    this.dataBucket = dataBucket
    this.targetModel = targetModel
  }

  async executeQuery(queryBuilder: IQueryBuilder<T>): Promise<Collection<T> | undefined | null> {
    return queryBuilder.get() as any
  }

  executeCollector(collector: IDataCollector<any>): Collection<T> | undefined | null {
    return this.dataBucket.makeCollection(this.targetModel, collector.exec()) as any
  }

  getEmptyValue(): Collection<T> | undefined {
    return make_collection<T>([])
  }
}
