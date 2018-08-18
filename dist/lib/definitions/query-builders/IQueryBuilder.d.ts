/// <reference path="IQueryBuilderHandler.d.ts" />
/// <reference path="../model/IModel.d.ts" />
/// <reference path="../query-grammars/IQuery.d.ts" />
/// <reference path="../query-grammars/IConditionQuery.d.ts" />
declare namespace NajsEloquent.QueryBuilder {
    class IQueryBuilder<T extends Model.IModel, Handle extends IQueryBuilderHandler = IQueryBuilderHandler> {
        protected handler: Handle;
    }
    interface IQueryBuilder<T extends Model.IModel, Handle extends IQueryBuilderHandler = IQueryBuilderHandler> extends QueryGrammar.IQuery, QueryGrammar.IConditionQuery, QueryGrammar.IExecuteQuery, QueryGrammar.IAdvancedQuery<T> {
    }
    type QueryBuilderInternal = IQueryBuilder<any> & {
        handler: NajsEloquent.QueryBuilder.IQueryBuilderHandler;
    };
}
