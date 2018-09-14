/// <reference path="../../definitions/driver/IExecutorFactory.d.ts" />
/// <reference path="../../definitions/features/IRecordExecutor.d.ts" />
/// <reference path="../../definitions/query-builders/IQueryExecutor.d.ts" />
import IModel = NajsEloquent.Model.IModel;
import IQueryBuilderHandler = NajsEloquent.QueryBuilder.IQueryBuilderHandler;
import { Record } from '../Record';
import { MemoryRecordExecutor } from './MemoryRecordExecutor';
import { MemoryQueryLog } from './MemoryQueryLog';
export declare class MemoryExecutorFactory implements NajsEloquent.Driver.IExecutorFactory {
    static className: string;
    makeRecordExecutor<T extends Record>(model: IModel, record: T): MemoryRecordExecutor;
    makeQueryExecutor(handler: IQueryBuilderHandler): any;
    getClassName(): string;
    makeLogger(): MemoryQueryLog;
}
