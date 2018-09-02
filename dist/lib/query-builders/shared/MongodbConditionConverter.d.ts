/// <reference path="../../definitions/query-grammars/IConditionQuery.d.ts" />
import { IAutoload } from 'najs-binding';
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
export declare class MongodbConditionConverter implements IAutoload {
    static className: string;
    queryConditions: object[];
    constructor(queryConditions: object[]);
    getClassName(): string;
    convert(): object;
    protected convertConditions(conditions: Condition[]): any;
    protected hasAnyIntersectKey(a: Object, b: Object): boolean;
    protected convertConditionsWithAnd(bucket: Object, conditions: Condition[]): void;
    protected convertConditionsWithOr(bucket: Object, conditions: Condition[]): void;
    protected convertCondition(condition: Condition): Object;
    protected convertGroupOfCondition(condition: GroupOfCondition): Object;
    private convertNotEmptyGroupOfCondition(condition);
    protected convertSimpleCondition(condition: SimpleCondition): Object;
}
