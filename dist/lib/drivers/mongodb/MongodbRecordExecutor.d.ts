/// <reference path="../../definitions/features/IRecordExecutor.d.ts" />
import Model = NajsEloquent.Model.IModel;
import { Collection } from 'mongodb';
import { Record } from '../Record';
import { MongodbQueryLog } from './MongodbQueryLog';
export declare class MongodbRecordExecutor implements NajsEloquent.Feature.IRecordExecutor {
    protected model: NajsEloquent.Model.IModel;
    protected record: Record;
    protected logger: MongodbQueryLog;
    protected collection: Collection;
    constructor(model: Model, record: Record, collection: Collection, logger: MongodbQueryLog);
    create<R = any>(): Promise<R>;
    update<R = any>(): Promise<R>;
    delete<R = any>(useSoftDelete: boolean): Promise<R>;
    restore<R = any>(): Promise<R>;
}
