/// <reference path="../../definitions/model/IModel.d.ts" />
import { QueryBuilder } from '../../query-builders/QueryBuilder';
import { MongooseQueryBuilderHandler } from './MongooseQueryBuilderHandler';
import { Document, Model as MongooseModel, Query as MongooseQuery } from 'mongoose';
export declare class MongooseQueryBuilder<T, H extends MongooseQueryBuilderHandler = MongooseQueryBuilderHandler> extends QueryBuilder<T, H> {
    native(handler: (native: MongooseQuery<Document & T>) => MongooseQuery<any>): NajsEloquent.QueryBuilder.IQueryExecutor<object>;
    nativeModel(): MongooseModel<Document & T>;
}
