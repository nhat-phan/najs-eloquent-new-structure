/// <reference path="../../definitions/query-builders/IConditionMatcher.d.ts" />
import IConditionMatcherFactory = NajsEloquent.QueryBuilder.IConditionMatcherFactory;
import QueryData = NajsEloquent.QueryBuilder.QueryData;
import { MongodbConditionMatcher } from './MongodbConditionMatcher';
export declare class MongodbConditionMatcherFactory implements IConditionMatcherFactory {
    static className: string;
    getClassName(): string;
    make(data: QueryData): MongodbConditionMatcher;
    transform(matcher: MongodbConditionMatcher): object;
}
