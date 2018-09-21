/// <reference path="../../contracts/MemoryDataSource.d.ts" />
import MemoryDataSource = Najs.Contracts.Eloquent.MemoryDataSource;
import { Record } from '../Record';
import { QueryLogBase, IQueryLogData } from '../QueryLogBase';
export interface IMemoryLogData extends IQueryLogData {
    dataSource?: string;
}
export declare class MemoryQueryLog extends QueryLogBase<IMemoryLogData> {
    getDefaultData(): IMemoryLogData;
    dataSource(ds: MemoryDataSource<Record>): this;
}
