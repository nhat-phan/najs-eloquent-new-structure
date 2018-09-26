/// <reference path="../../definitions/model/IModel.ts" />

// import IModel = NajsEloquent.Model.IModel
import { QueryBuilder } from '../../query-builders/QueryBuilder'
import { MongodbQueryExecutor } from './MongodbQueryExecutor'
import { MongodbQueryBuilderHandler } from './MongodbQueryBuilderHandler'
import { Collection } from 'mongodb'

export class MongodbQueryBuilder<
  T,
  H extends MongodbQueryBuilderHandler = MongodbQueryBuilderHandler
> extends QueryBuilder<T, H> {
  native(
    handler: (collection: Collection, conditions: object, options?: object) => Promise<any>
  ): { execute(): Promise<any> } {
    const queryExecutor: MongodbQueryExecutor = this.handler.getQueryExecutor() as MongodbQueryExecutor
    return queryExecutor.native(handler)
  }

  collection() {
    const queryExecutor: MongodbQueryExecutor = this.handler.getQueryExecutor() as MongodbQueryExecutor
    return queryExecutor.getCollection()
  }
}
