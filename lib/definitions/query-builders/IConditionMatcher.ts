namespace NajsEloquent.QueryBuilder {
  export type QueryData = {
    bool: 'and' | 'or'
    field: string
    operator: QueryGrammar.Operator
    value: any
  }

  export interface IConditionMatcher<T> {
    isMatch(record: T): boolean
  }

  export interface IConditionMatcherFactory {
    make<T>(data: QueryData): IConditionMatcher<T>

    transform<T>(matcher: IConditionMatcher<T>): object
  }
}
