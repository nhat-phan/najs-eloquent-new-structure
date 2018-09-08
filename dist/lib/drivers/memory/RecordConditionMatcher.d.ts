/// <reference path="../../definitions/query-builders/IConditionMatcher.d.ts" />
import IConditionMatcher = NajsEloquent.QueryBuilder.IConditionMatcher;
import ConditionMatcherOperator = NajsEloquent.QueryBuilder.ConditionMatcherOperator;
import { Record } from '../Record';
export declare class RecordConditionMatcher implements IConditionMatcher<Record> {
    protected field: string;
    protected operator: ConditionMatcherOperator;
    protected value: any;
    constructor(field: string, operator: ConditionMatcherOperator, value: any);
    isEqual(record: Record): boolean;
    isLessThan(record: Record): boolean;
    isLessThanOrEqual(record: Record): boolean;
    isGreaterThan(record: Record): boolean;
    isGreaterThanOrEqual(record: Record): boolean;
    isInArray(record: Record): boolean;
    isMatch(record: Record): boolean;
}
