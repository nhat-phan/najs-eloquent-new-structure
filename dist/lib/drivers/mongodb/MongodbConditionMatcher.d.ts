/// <reference path="../../definitions/query-builders/IConditionMatcher.d.ts" />
import IConditionMatcher = NajsEloquent.QueryBuilder.IConditionMatcher;
import ConditionMatcherOperator = NajsEloquent.QueryBuilder.ConditionMatcherOperator;
export declare class MongodbConditionMatcher implements IConditionMatcher<any> {
    protected condition: object;
    constructor(field: string, operator: ConditionMatcherOperator, value: any);
    buildNativeCondition(field: string, operator: ConditionMatcherOperator, value: any): {};
    isMatch(record: any): boolean;
    getCondition(): object;
}
