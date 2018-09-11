declare namespace NajsEloquent.QueryBuilder {
    type QueryData = {
        bool: 'and' | 'or';
        field: string;
        operator: QueryGrammar.Operator;
        value: any;
    };
    interface IConditionMatcher<T> {
        isMatch(record: T): boolean;
    }
    interface IConditionMatcherFactory {
        make<T>(data: QueryData): IConditionMatcher<T>;
        transform<T>(matcher: IConditionMatcher<T>): object;
    }
}
