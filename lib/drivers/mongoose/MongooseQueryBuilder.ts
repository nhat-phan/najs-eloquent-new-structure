/// <reference path="../../definitions/model/IModel.ts" />

import IModel = NajsEloquent.Model.IModel
import { QueryBuilder } from '../../query-builders/QueryBuilder'
import { MongooseQueryBuilderHandler } from './MongooseQueryBuilderHandler'

export class MongooseQueryBuilder<
  T extends IModel,
  H extends MongooseQueryBuilderHandler = MongooseQueryBuilderHandler
> extends QueryBuilder<T, H> {}
