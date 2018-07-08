namespace NajsEloquent.QueryBuilder {
  export interface IQueryHandle extends QueryGrammar.IQuery {
    getBasicQuery(): QueryGrammar.IBasicQuery
  }
}
