declare namespace NajsEloquent.QueryBuilder {
    interface IQueryHandle extends QueryGrammar.IQuery {
        getBasicQuery(): QueryGrammar.IBasicQuery;
    }
}
