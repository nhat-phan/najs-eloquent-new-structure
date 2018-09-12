import { Record } from '../Record';
import { RecordConditionMatcher } from './RecordConditionMatcher';
export declare type RecordBucket = {
    [id in string]: Record;
};
export declare type RecordConditions = {
    $and?: RecordConditionMatcher[] | RecordConditions;
    $or?: RecordConditionMatcher[] | RecordConditions;
};
export declare class RecordFilter {
    filter(records: Record[] | RecordBucket, conditions: RecordConditions): Record[];
    isMatch(record: Record, conditions: RecordConditions): boolean;
    matchConditionsWithOrOperator(record: Record, conditions: RecordConditions): boolean;
    matchConditionsWithAndOperator(record: Record, conditions: RecordConditions): boolean;
}
