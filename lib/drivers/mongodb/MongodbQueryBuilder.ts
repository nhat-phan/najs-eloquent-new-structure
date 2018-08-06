/// <reference path="../../definitions/model/IModel.ts" />
import IModel = NajsEloquent.Model.IModel
import { QueryBuilder } from '../../query-builders/QueryBuilder'
import { MongodbQueryBuilderHandler } from './MongodbQueryBuilderHandler'
import { Collection } from 'mongodb'

export class MongodbQueryBuilder<
  T extends IModel,
  H extends MongodbQueryBuilderHandler = MongodbQueryBuilderHandler
> extends QueryBuilder<T, H> {
  native(
    handler: (collection: Collection, conditions: object, options?: object) => Promise<any>
  ): { execute(): Promise<any> } {
    return this.handler.getQueryExecutor().native(handler)
  }

  collection() {
    return this.handler.getQueryExecutor().getCollection()
  }
}
