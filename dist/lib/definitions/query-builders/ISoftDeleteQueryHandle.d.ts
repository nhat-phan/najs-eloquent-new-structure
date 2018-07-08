declare namespace NajsEloquent.QueryBuilder {
    interface ISoftDeleteQueryHandle extends QueryGrammar.ISoftDeleteQuery {
        conditionQuery: QueryGrammar.IConditionQuery;
    }
}
