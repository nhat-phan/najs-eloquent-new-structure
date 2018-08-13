/// <reference path="../../definitions/features/IRecordExecutor.d.ts" />
import Model = NajsEloquent.Model.IModel;
import { Collection } from 'mongodb';
import { MongodbQueryLog } from './MongodbQueryLog';
export declare class MongodbRecordExecutor<T> implements NajsEloquent.Feature.IRecordExecutor<T> {
    protected model: NajsEloquent.Model.IModel;
    protected record: object;
    protected logger: MongodbQueryLog;
    protected collection: Collection;
    constructor(model: Model, record: object, collection: Collection, logger: MongodbQueryLog);
    create<R = any>(): Promise<R>;
    update<R = any>(): Promise<R>;
    delete<R = any>(useSoftDelete: boolean): Promise<R>;
    restore<R = any>(record: T): Promise<R>;
}
