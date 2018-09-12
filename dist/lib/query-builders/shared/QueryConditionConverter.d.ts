/// <reference path="../../definitions/query-grammars/IConditionQuery.d.ts" />
import IConditionMatcherFactory = NajsEloquent.QueryBuilder.IConditionMatcherFactory;
import { QueryCondition } from './QueryCondition';
export declare class QueryConditionConverter {
    protected queryCondition: QueryCondition;
    constructor(queryCondition: QueryCondition, matcherFactory: IConditionMatcherFactory);
}
