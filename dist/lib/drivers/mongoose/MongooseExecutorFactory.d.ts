/// <reference path="../../definitions/driver/IExecutorFactory.d.ts" />
/// <reference path="../../definitions/features/IRecordExecutor.d.ts" />
/// <reference path="../../definitions/query-builders/IQueryExecutor.d.ts" />
import IModel = NajsEloquent.Model.IModel;
import IQueryBuilderHandler = NajsEloquent.QueryBuilder.IQueryBuilderHandler;
import { Document, Model as MongooseModel } from 'mongoose';
import { MongooseRecordExecutor } from './MongooseRecordExecutor';
import { MongooseQueryExecutor } from './MongooseQueryExecutor';
import { MongodbQueryLog } from './../mongodb/MongodbQueryLog';
export declare class MongooseExecutorFactory implements NajsEloquent.Driver.IExecutorFactory {
    static className: string;
    makeRecordExecutor<T extends Document>(model: IModel, document: T): MongooseRecordExecutor;
    makeQueryExecutor(handler: IQueryBuilderHandler): MongooseQueryExecutor;
    getMongooseModel(model: IModel): MongooseModel<any>;
    makeLogger(): MongodbQueryLog;
}
