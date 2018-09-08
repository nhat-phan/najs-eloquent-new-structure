namespace NajsEloquent.QueryBuilder {
  export type ConditionMatcherOperator = '=' | '!=' | '<' | '<=' | '>' | '>=' | 'in' | 'not-in' | 'nope'

  export interface IConditionMatcher<T> {
    isMatch(record: T): boolean
  }

  export interface IConditionMatcherFactory {
    make<T>(field: string, operator: ConditionMatcherOperator, value: any): IConditionMatcher<T>
  }
}
