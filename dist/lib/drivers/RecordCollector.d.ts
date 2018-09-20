/// <reference path="../contracts/MemoryDataSource.d.ts" />
import MemoryDataSource = Najs.Contracts.Eloquent.MemoryDataSource;
import { Record } from './Record';
import { RecordConditionMatcher } from './RecordConditionMatcher';
export declare type RecordConditions = {
    $and: Array<RecordConditionMatcher | RecordConditions>;
} | {
    $or: Array<RecordConditionMatcher | RecordConditions>;
} | {};
export declare class RecordCollector {
    protected dataSource: MemoryDataSource<Record>;
    protected limited?: number;
    protected sortedBy?: Array<[string, string]>;
    protected selected?: string[];
    protected conditions?: RecordConditions;
    protected constructor(dataSource: MemoryDataSource<Record>);
    static use(dataSource: MemoryDataSource<Record>): RecordCollector;
    limit(value: number): this;
    select(selectedFields: string[]): this;
    orderBy(directions: Array<[string, string]>): this;
    filterBy(conditions: RecordConditions): this;
    pickFields(record: Record, selectedFields: string[]): Record;
    isMatch(record: Record, conditions: RecordConditions): boolean;
    isMatchAtLeastOneCondition(record: Record, conditions: Array<RecordConditionMatcher | RecordConditions>): boolean;
    isMatchAllConditions(record: Record, conditions: Array<RecordConditionMatcher | RecordConditions>): boolean;
    hasSortedByConfig(): boolean;
    hasSelectedFieldsConfig(): boolean;
    exec(): Record[];
    sortLimitAndSelectRecords(records: Record[]): Record[];
    compare(a: Record, b: Record, index: number): number;
}
