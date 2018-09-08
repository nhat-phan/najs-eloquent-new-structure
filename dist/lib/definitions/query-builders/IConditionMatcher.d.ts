declare namespace NajsEloquent.QueryBuilder {
    type ConditionMatcherOperator = '=' | '!=' | '<' | '<=' | '>' | '>=' | 'in' | 'not-in' | 'nope';
    interface IConditionMatcher<T> {
        isMatch(record: T): boolean;
    }
    interface IConditionMatcherFactory {
        make<T>(field: string, operator: ConditionMatcherOperator, value: any): IConditionMatcher<T>;
    }
}
