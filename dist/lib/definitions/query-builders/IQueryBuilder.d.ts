/// <reference path="IQueryBuilderHandle.d.ts" />
/// <reference path="../query-grammars/IQuery.d.ts" />
/// <reference path="../query-grammars/IConditionQuery.d.ts" />
declare namespace NajsEloquent.QueryBuilder {
    class IQueryBuilder<Handle extends IQueryBuilderHandle = IQueryBuilderHandle> {
        protected handler: Handle;
    }
    interface IQueryBuilder<Handle extends IQueryBuilderHandle = IQueryBuilderHandle> extends QueryGrammar.IQuery, QueryGrammar.IConditionQuery, QueryGrammar.IAdvancedQuery<any> {
    }
    type QueryBuilderInternal = IQueryBuilder & {
        handler: NajsEloquent.QueryBuilder.IQueryBuilderHandle;
    };
}
