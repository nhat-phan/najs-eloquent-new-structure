/// <reference path="../../contracts/MemoryDataSource.d.ts" />
import MemoryDataSource = Najs.Contracts.Eloquent.MemoryDataSource;
import { Record } from '../Record';
import { ExecutorBase } from '../ExecutorBase';
import { MemoryQueryLog } from './MemoryQueryLog';
import { MemoryQueryBuilderHandler } from './MemoryQueryBuilderHandler';
import { BasicQuery } from '../../query-builders/shared/BasicQuery';
import { RecordFilter } from '../RecordFilter';
export declare class MemoryQueryExecutor extends ExecutorBase {
    protected queryHandler: MemoryQueryBuilderHandler;
    protected dataSource: MemoryDataSource<Record>;
    protected basicQuery: BasicQuery;
    protected filter: RecordFilter;
    protected logger: MemoryQueryLog;
    constructor(queryHandler: MemoryQueryBuilderHandler, dataSource: MemoryDataSource<Record>, logger: MemoryQueryLog);
    get(): Promise<object[]>;
    getFilterConditions(): object;
    logRaw(query: object, options: object | undefined, func: string): MemoryQueryLog;
}
