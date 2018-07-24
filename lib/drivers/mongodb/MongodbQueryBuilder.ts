/// <reference path="../../definitions/model/IModel.ts" />
import IModel = NajsEloquent.Model.IModel
import { QueryBuilder } from '../../query-builders/QueryBuilder'
import { MongodbQueryBuilderHandle } from './MongodbQueryBuilderHandle'

export class MongodbQueryBuilder<T extends IModel, Handle extends MongodbQueryBuilderHandle> extends QueryBuilder<
  T,
  Handle
> {}
