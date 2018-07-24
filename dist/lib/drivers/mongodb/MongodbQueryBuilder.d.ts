/// <reference path="../../definitions/model/IModel.d.ts" />
import IModel = NajsEloquent.Model.IModel;
import { QueryBuilder } from '../../query-builders/QueryBuilder';
import { MongodbQueryBuilderHandle } from './MongodbQueryBuilderHandle';
export declare class MongodbQueryBuilder<T extends IModel, Handle extends MongodbQueryBuilderHandle> extends QueryBuilder<T, Handle> {
}
