import { QueryBuilder } from '../../query-builders/QueryBuilder'
import { KnexQueryBuilderHandle } from './KnexQueryBuilderHandle'

export class KnexQueryBuilder<T extends KnexQueryBuilderHandle> extends QueryBuilder<T> {
  doSomething() {}
}
