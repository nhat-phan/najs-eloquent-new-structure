/// <reference path="../../definitions/features/IRecordExecutor.d.ts" />
/// <reference path="../../definitions/query-builders/IConvention.d.ts" />
import IConvention = NajsEloquent.QueryBuilder.IConvention;
import Model = NajsEloquent.Model.IModel;
import { ExecutorBase } from '../ExecutorBase';
import { Document } from 'mongoose';
import { MongodbQueryLog } from '../mongodb/MongodbQueryLog';
export declare class MongooseRecordExecutor extends ExecutorBase implements NajsEloquent.Feature.IRecordExecutor {
    protected model: NajsEloquent.Model.IModel;
    protected document: Document;
    protected logger: MongodbQueryLog;
    protected convention: IConvention;
    constructor(model: Model, document: Document, logger: MongodbQueryLog);
    create<R = any>(): Promise<R>;
    update<R = any>(): Promise<R>;
    softDelete<R = any>(): Promise<R>;
    hardDelete<R = any>(): Promise<R>;
    restore<R = any>(): Promise<R>;
    logRaw(func: string): MongodbQueryLog;
}
