import { QueryBuilder } from '../QueryBuilder';
import { KnexQueryBuilderHandle } from './KnexQueryBuilderHandle';
export declare class KnexQueryBuilder<T extends KnexQueryBuilderHandle> extends QueryBuilder<T> {
    doSomething(): void;
}
