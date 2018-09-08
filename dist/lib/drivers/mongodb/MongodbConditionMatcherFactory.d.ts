/// <reference path="../../definitions/query-builders/IConditionMatcher.d.ts" />
import IConditionMatcherFactory = NajsEloquent.QueryBuilder.IConditionMatcherFactory;
import ConditionMatcherOperator = NajsEloquent.QueryBuilder.ConditionMatcherOperator;
import { MongodbConditionMatcher } from './MongodbConditionMatcher';
export declare class MongodbConditionMatcherFactory implements IConditionMatcherFactory {
    make(field: string, operator: ConditionMatcherOperator, value: any): MongodbConditionMatcher;
}
