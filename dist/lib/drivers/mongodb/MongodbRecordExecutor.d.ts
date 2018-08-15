/// <reference path="../../definitions/features/IRecordExecutor.d.ts" />
/// <reference path="../../definitions/query-builders/IConvention.d.ts" />
import IConvention = NajsEloquent.QueryBuilder.IConvention;
import Model = NajsEloquent.Model.IModel;
import { Collection } from 'mongodb';
import { Record } from '../Record';
import { MongodbQueryLog } from './MongodbQueryLog';
export declare class MongodbRecordExecutor implements NajsEloquent.Feature.IRecordExecutor {
    protected model: NajsEloquent.Model.IModel;
    protected record: Record;
    protected logger: MongodbQueryLog;
    protected convention: IConvention;
    protected collection: Collection;
    constructor(model: Model, record: Record, collection: Collection, logger: MongodbQueryLog);
    fillData(isCreate: boolean): void;
    setAttributeIfNeeded(attribute: string, value: any): void;
    create<R = any>(shouldFillData?: boolean): Promise<R>;
    update<R = any>(shouldFillData?: boolean): Promise<R>;
    delete<R = any>(useSoftDelete: boolean): Promise<R>;
    restore<R = any>(): Promise<R>;
    getModifiedData(): {};
    getFilter(): {};
    logRaw(func: string, ...args: any[]): MongodbQueryLog;
}
