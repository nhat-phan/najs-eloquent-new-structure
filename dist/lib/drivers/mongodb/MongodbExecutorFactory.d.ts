/// <reference path="../../definitions/driver/IExecutorFactory.d.ts" />
/// <reference path="../../definitions/features/IRecordExecutor.d.ts" />
/// <reference path="../../definitions/query-builders/IQueryExecutor.d.ts" />
import IModel = NajsEloquent.Model.IModel;
import IQueryBuilderHandler = NajsEloquent.QueryBuilder.IQueryBuilderHandler;
import { Collection } from 'mongodb';
import { Record } from '../Record';
import { MongodbRecordExecutor } from './MongodbRecordExecutor';
import { MongodbQueryExecutor } from './MongodbQueryExecutor';
import { MongodbQueryLog } from './MongodbQueryLog';
export declare class MongodbExecutorFactory implements NajsEloquent.Driver.IExecutorFactory {
    static className: string;
    makeRecordExecutor<T extends Record>(model: IModel, record: T): MongodbRecordExecutor;
    makeQueryExecutor(handler: IQueryBuilderHandler): MongodbQueryExecutor;
    getClassName(): string;
    getCollection(model: IModel): Collection;
    makeLogger(): MongodbQueryLog;
}
