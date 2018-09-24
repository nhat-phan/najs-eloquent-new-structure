/// <reference path="../../contracts/MemoryDataSource.d.ts" />
import MemoryDataSource = Najs.Contracts.Eloquent.MemoryDataSource;
import { Record } from '../Record';
import { ExecutorBase } from '../ExecutorBase';
import { MemoryQueryLog, IUpdateRecordInfo } from './MemoryQueryLog';
import { MemoryQueryBuilderHandler } from './MemoryQueryBuilderHandler';
import { BasicQuery } from '../../query-builders/shared/BasicQuery';
import { RecordCollector } from '../RecordCollector';
export declare class MemoryQueryExecutor extends ExecutorBase {
    protected queryHandler: MemoryQueryBuilderHandler;
    protected dataSource: MemoryDataSource<Record>;
    protected basicQuery: BasicQuery;
    protected logger: MemoryQueryLog;
    constructor(queryHandler: MemoryQueryBuilderHandler, dataSource: MemoryDataSource<Record>, logger: MemoryQueryLog);
    get(): Promise<object[]>;
    first(): Promise<object | undefined>;
    count(): Promise<number>;
    update(data: object): Promise<any>;
    delete(): Promise<any>;
    restore(): Promise<any>;
    updateRecordsByData(records: Record[], data: object): Promise<any>;
    getUpdateRecordInfo(record: Record, data: object): IUpdateRecordInfo;
    collectResult(collector: RecordCollector): Promise<Record[]>;
    makeCollector(): RecordCollector;
    getFilterConditions(): object;
}
