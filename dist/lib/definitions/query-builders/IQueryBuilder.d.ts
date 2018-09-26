/// <reference path="IQueryBuilderHandler.d.ts" />
/// <reference path="../model/IModel.d.ts" />
/// <reference path="../query-grammars/IQuery.d.ts" />
/// <reference path="../query-grammars/IConditionQuery.d.ts" />
declare namespace NajsEloquent.QueryBuilder {
    type OmittedResult<T, K> = Pick<T, Exclude<keyof T, (keyof QueryBuilder.IQueryBuilder<any>) | (keyof K)>>;
    type OmittedQueryBuilderResult<T> = Pick<T, Exclude<keyof T, keyof QueryBuilder.IQueryBuilder<any>>>;
    class IQueryBuilder<T, Handler extends IQueryBuilderHandler = IQueryBuilderHandler, OmittedMethods = {}> {
        protected handler: Handler;
    }
    interface IQueryBuilder<T, Handler extends IQueryBuilderHandler = IQueryBuilderHandler, OmittedMethods = {}> extends QueryGrammar.IQuery, QueryGrammar.IConditionQuery, QueryGrammar.IExecuteQuery, QueryGrammar.IAdvancedQuery<OmittedResult<T, OmittedMethods>> {
    }
    type QueryBuilderInternal = IQueryBuilder<any> & {
        handler: NajsEloquent.QueryBuilder.IQueryBuilderHandler;
    };
}
