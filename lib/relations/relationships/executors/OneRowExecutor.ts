/// <reference path="../../../definitions/data/IDataCollector.ts" />
/// <reference path="../../../definitions/model/IModel.ts" />
/// <reference path="../../../definitions/relations/IRelationshipExecutor.ts" />
/// <reference path="../../../definitions/relations/IRelationDataBucket.ts" />
/// <reference path="../../../definitions/query-builders/IQueryBuilder.ts" />

import IModel = NajsEloquent.Model.IModel
import IQueryBuilder = NajsEloquent.QueryBuilder.IQueryBuilder
import IDataCollector = NajsEloquent.Data.IDataCollector
import IRelationDataBucket = NajsEloquent.Relation.IRelationDataBucket

export class OneRowExecutor<T> implements NajsEloquent.Relation.IRelationshipExecutor<T> {
  protected dataBucket: IRelationDataBucket
  protected targetModel: IModel

  constructor(dataBucket: IRelationDataBucket, targetModel: IModel) {
    this.dataBucket = dataBucket
    this.targetModel = targetModel
  }

  async executeQuery(queryBuilder: IQueryBuilder<T>): Promise<T | undefined | null> {
    return queryBuilder.first() as any
  }

  executeCollector(collector: IDataCollector<any>): T | undefined | null {
    collector.limit(1)
    const result = collector.exec()
    if (result.length === 0) {
      return undefined
    }
    return this.dataBucket.makeModel(this.targetModel, result[0]) as any
  }

  getEmptyValue(): T | undefined {
    return undefined
  }
}
