namespace NajsEloquent.QueryBuilder {
  export type GroupQueryConditionData = {
    bool: 'and' | 'or'
    queries: Array<SingleQueryConditionData | GroupQueryConditionData>
  }

  export type SingleQueryConditionData = {
    bool: 'and' | 'or'
    field: string
    operator: QueryGrammar.Operator
    value: any
  }

  export interface IConditionMatcher<T> {
    isMatch(record: T): boolean
  }

  export interface IConditionMatcherFactory {
    make<T>(data: SingleQueryConditionData): IConditionMatcher<T>

    transform<T>(matcher: IConditionMatcher<T>): any
  }
}
