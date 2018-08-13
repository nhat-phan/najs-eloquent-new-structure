/// <reference path="../../definitions/driver/IExecutorFactory.d.ts" />
/// <reference path="../../definitions/features/IRecordExecutor.d.ts" />
/// <reference path="../../definitions/query-builders/IQueryExecutor.d.ts" />
import ModelInternal = NajsEloquent.Model.ModelInternal;
import IQueryBuilderHandler = NajsEloquent.QueryBuilder.IQueryBuilderHandler;
import { Collection } from 'mongodb';
import { MongodbRecordExecutor } from './MongodbRecordExecutor';
import { MongodbQueryExecutor } from './MongodbQueryExecutor';
import { MongodbQueryLog } from './MongodbQueryLog';
export declare class MongodbExecutorFactory implements NajsEloquent.Driver.IExecutorFactory<any> {
    makeRecordExecutor(model: ModelInternal, record: any): MongodbRecordExecutor<any>;
    makeQueryExecutor(handler: IQueryBuilderHandler): MongodbQueryExecutor;
    getCollection(model: ModelInternal): Collection;
    makeLogger(): MongodbQueryLog;
}
