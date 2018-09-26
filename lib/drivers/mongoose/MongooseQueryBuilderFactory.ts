/// <reference path="../../definitions/model/IModel.ts" />
/// <reference path="../../definitions/query-builders/IQueryBuilder.ts" />
/// <reference path="../../definitions/query-builders/IQueryBuilderFactory.ts" />

import { register } from 'najs-binding'
import { NajsEloquent as NajsEloquentClasses } from '../../constants'
import { MongooseQueryBuilder } from './MongooseQueryBuilder'
import { MongooseQueryBuilderHandler } from './MongooseQueryBuilderHandler'

export class MongooseQueryBuilderFactory implements NajsEloquent.QueryBuilder.IQueryBuilderFactory {
  static className: string = NajsEloquentClasses.Driver.Mongoose.MongooseQueryBuilderFactory

  getClassName() {
    return NajsEloquentClasses.Driver.Mongoose.MongooseQueryBuilderFactory
  }

  make(model: NajsEloquent.Model.IModel): MongooseQueryBuilder<any> {
    return new MongooseQueryBuilder(new MongooseQueryBuilderHandler(model))
  }
}
register(MongooseQueryBuilderFactory, NajsEloquentClasses.Driver.Mongoose.MongooseQueryBuilderFactory, true, true)
