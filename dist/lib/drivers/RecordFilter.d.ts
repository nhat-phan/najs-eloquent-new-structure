import { Record } from './Record';
import { RecordConditionMatcher } from './RecordConditionMatcher';
export declare type RecordBucket = {
    [id in string]: Record;
};
export declare type RecordConditions = {
    $and: Array<RecordConditionMatcher | RecordConditions>;
} | {
    $or: Array<RecordConditionMatcher | RecordConditions>;
} | {};
export declare class RecordFilter {
    static className: string;
    getClassName(): string;
    filter(records: Record[] | RecordBucket, conditions: RecordConditions): Record[];
    isMatch(record: Record, conditions: RecordConditions): boolean;
    isMatchAtLeastOneCondition(record: Record, conditions: Array<RecordConditionMatcher | RecordConditions>): boolean;
    isMatchAllConditions(record: Record, conditions: Array<RecordConditionMatcher | RecordConditions>): boolean;
}
