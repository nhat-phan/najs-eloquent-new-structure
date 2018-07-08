namespace NajsEloquent.QueryBuilder {
  export interface ISoftDeleteQueryHandle extends QueryGrammar.ISoftDeleteQuery {
    conditionQuery: QueryGrammar.IConditionQuery
  }
}
