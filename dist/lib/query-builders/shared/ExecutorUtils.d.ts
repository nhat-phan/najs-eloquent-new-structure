import { QueryBuilderHandlerBase } from '../QueryBuilderHandlerBase';
export declare class ExecutorUtils {
    static addSoftDeleteConditionIfNeeded(handler: QueryBuilderHandlerBase): void;
    static convertConditionsToMongodbQuery(conditions: object[]): object;
}
