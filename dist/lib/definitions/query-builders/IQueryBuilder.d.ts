/// <reference path="IQueryBuilderHandle.d.ts" />
/// <reference path="../query-grammars/IQuery.d.ts" />
declare namespace NajsEloquent.QueryBuilder {
    class IQueryBuilder<Handle extends IQueryBuilderHandle = IQueryBuilderHandle> {
        protected handler: Handle;
    }
    interface IQueryBuilder<Handle extends IQueryBuilderHandle = IQueryBuilderHandle> extends QueryGrammar.IQuery {
    }
}
