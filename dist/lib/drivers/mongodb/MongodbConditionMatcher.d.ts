/// <reference path="../../definitions/query-builders/IConditionMatcher.d.ts" />
import Operator = NajsEloquent.QueryGrammar.Operator;
import IConditionMatcher = NajsEloquent.QueryBuilder.IConditionMatcher;
export declare class MongodbConditionMatcher implements IConditionMatcher<any> {
    protected condition: object;
    constructor(field: string, operator: Operator, value: any);
    buildNativeCondition(field: string, operator: Operator, value: any): {};
    isMatch(record: any): boolean;
    getCondition(): object;
}
