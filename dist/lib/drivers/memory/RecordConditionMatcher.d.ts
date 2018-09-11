/// <reference path="../../definitions/query-builders/IConditionMatcher.d.ts" />
import IConditionMatcher = NajsEloquent.QueryBuilder.IConditionMatcher;
import { Record } from '../Record';
export declare class RecordConditionMatcher implements IConditionMatcher<Record> {
    protected field: string;
    protected operator: string;
    protected value: any;
    constructor(field: string, operator: string, value: any);
    isEqual(record: Record): boolean;
    isLessThan(record: Record): boolean;
    isLessThanOrEqual(record: Record): boolean;
    isGreaterThan(record: Record): boolean;
    isGreaterThanOrEqual(record: Record): boolean;
    isInArray(record: Record): boolean;
    isMatch(record: Record): boolean;
}
