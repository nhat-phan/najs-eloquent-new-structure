/// <reference path="../../definitions/query-grammars/IConditionQuery.d.ts" />
import IConditionMatcherFactory = NajsEloquent.QueryBuilder.IConditionMatcherFactory;
export declare type SimpleCondition = {
    bool: 'and' | 'or';
    field: string;
    operator: NajsEloquent.QueryGrammar.Operator;
    value: any;
};
export declare type GroupOfCondition = {
    bool: 'and' | 'or';
    queries: Condition[];
};
export declare type Condition = SimpleCondition | GroupOfCondition;
export declare class ConditionConverter {
    queryConditions: object[];
    matcherFactory: IConditionMatcherFactory;
    simplify: boolean;
    constructor(queryConditions: object[], matcherFactory: IConditionMatcherFactory, simplify: boolean);
    convert(): object;
    protected convertConditions(conditions: Condition[]): any;
    protected hasAnyIntersectKey(a: Object, b: Object): boolean;
    protected convertConditionsWithAnd(bucket: Object, conditions: Condition[]): void;
    protected convertConditionsWithOr(bucket: Object, conditions: Condition[]): void;
    protected convertCondition(condition: Condition): Object;
    protected convertGroupOfCondition(condition: GroupOfCondition): Object;
    private convertNotEmptyGroupOfCondition(condition);
    protected convertSimpleCondition(condition: SimpleCondition): NajsEloquent.QueryBuilder.IConditionMatcher<any>;
}
