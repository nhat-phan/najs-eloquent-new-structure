/// <reference path="../../definitions/features/IRecordExecutor.d.ts" />
/// <reference path="../../definitions/query-builders/IConvention.d.ts" />
import Model = NajsEloquent.Model.IModel;
import { Collection } from 'mongodb';
import { Record } from '../Record';
import { RecordExecutorBase } from '../RecordExecutorBase';
import { MongodbQueryLog } from './MongodbQueryLog';
export declare class MongodbRecordExecutor extends RecordExecutorBase {
    protected logger: MongodbQueryLog;
    protected collection: Collection;
    constructor(model: Model, record: Record, collection: Collection, logger: MongodbQueryLog);
    createRecord<R = any>(action: string): Promise<R>;
    updateRecord<R = any>(action: string): Promise<R>;
    hardDeleteRecord<R = any>(): Promise<R>;
    getModifiedData(): {};
    getFilter(): {};
    logRaw(func: string, ...args: any[]): MongodbQueryLog;
}
