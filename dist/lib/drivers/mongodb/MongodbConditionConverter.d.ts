/// <reference path="../../definitions/query-grammars/IConditionQuery.d.ts" />
import { QueryConditionData, ConditionConverter } from '../../query-builders/shared/ConditionConverter';
import { IAutoload } from 'najs-binding';
export declare class MongodbConditionConverter extends ConditionConverter implements IAutoload {
    static className: string;
    constructor(queryConditions: QueryConditionData[]);
    getClassName(): string;
}
