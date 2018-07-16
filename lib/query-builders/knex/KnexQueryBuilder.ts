import { QueryBuilder } from '../QueryBuilder'
import { KnexQueryBuilderHandle } from './KnexQueryBuilderHandle'

export class KnexQueryBuilder<T extends KnexQueryBuilderHandle> extends QueryBuilder<T> {
  doSomething() {}
}
