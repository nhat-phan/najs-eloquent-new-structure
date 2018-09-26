/// <reference path="../../definitions/model/IModel.ts" />
/// <reference path="../../definitions/query-builders/IQueryBuilder.ts" />
/// <reference path="../../definitions/query-builders/IQueryBuilderFactory.ts" />

import { register } from 'najs-binding'
import { NajsEloquent as NajsEloquentClasses } from '../../constants'
import { MongodbQueryBuilder } from './MongodbQueryBuilder'
import { MongodbQueryBuilderHandler } from './MongodbQueryBuilderHandler'

export class MongodbQueryBuilderFactory implements NajsEloquent.QueryBuilder.IQueryBuilderFactory {
  static className: string = NajsEloquentClasses.Driver.Mongodb.MongodbQueryBuilderFactory

  getClassName() {
    return NajsEloquentClasses.Driver.Mongodb.MongodbQueryBuilderFactory
  }

  make(model: NajsEloquent.Model.IModel): MongodbQueryBuilder<any> {
    return new MongodbQueryBuilder(new MongodbQueryBuilderHandler(model))
  }
}
register(MongodbQueryBuilderFactory, NajsEloquentClasses.Driver.Mongodb.MongodbQueryBuilderFactory, true, true)
