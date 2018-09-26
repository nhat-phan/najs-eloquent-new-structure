/// <reference path="../../definitions/query-grammars/IConditionQuery.d.ts" />
import IConditionMatcherFactory = NajsEloquent.QueryBuilder.IConditionMatcherFactory;
export declare type QueryData = {
    bool: 'and' | 'or';
    field: string;
    operator: NajsEloquent.QueryGrammar.Operator;
    value: any;
};
export declare type GroupQueryData = {
    bool: 'and' | 'or';
    queries: QueryData[];
};
export declare type QueryConditionData = QueryData | GroupQueryData;
export declare class ConditionConverter {
    protected queries: QueryConditionData[];
    protected matcherFactory: IConditionMatcherFactory;
    protected simplify: boolean;
    constructor(queries: QueryConditionData[], matcherFactory: IConditionMatcherFactory, simplify: boolean);
    convert(): object;
    protected convertQueries(conditions: QueryConditionData[]): any;
    protected hasAnyIntersectKey(a: Object, b: Object): boolean;
    protected convertConditionsWithAnd(bucket: Object, conditions: QueryConditionData[]): void;
    protected convertConditionsWithOr(bucket: Object, conditions: QueryConditionData[]): void;
    protected convertCondition(condition: QueryConditionData): object;
    protected convertGroupQueryData(condition: GroupQueryData): object;
    private convertNotEmptyGroupQueryData;
}
