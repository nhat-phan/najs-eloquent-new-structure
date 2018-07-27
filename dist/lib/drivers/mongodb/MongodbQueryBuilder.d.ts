/// <reference path="../../definitions/model/IModel.d.ts" />
import IModel = NajsEloquent.Model.IModel;
import { QueryBuilder } from '../../query-builders/QueryBuilder';
import { MongodbQueryBuilderHandler } from './MongodbQueryBuilderHandler';
export declare class MongodbQueryBuilder<T extends IModel, H extends MongodbQueryBuilderHandler> extends QueryBuilder<T, H> {
}
