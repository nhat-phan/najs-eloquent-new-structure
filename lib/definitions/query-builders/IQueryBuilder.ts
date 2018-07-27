/// <reference path="IQueryBuilderHandler.ts" />
/// <reference path="../model/IModel.ts" />
/// <reference path="../query-grammars/IQuery.ts" />
/// <reference path="../query-grammars/IConditionQuery.ts" />

namespace NajsEloquent.QueryBuilder {
  export declare class IQueryBuilder<
    T extends Model.IModel,
    Handle extends IQueryBuilderHandler = IQueryBuilderHandler
  > {
    protected handler: Handle
  }

  export interface IQueryBuilder<T extends Model.IModel, Handle extends IQueryBuilderHandler = IQueryBuilderHandler>
    extends QueryGrammar.IQuery,
      QueryGrammar.IConditionQuery,
      QueryGrammar.IAdvancedQuery<T> {}

  export type QueryBuilderInternal = IQueryBuilder<any> & { handler: NajsEloquent.QueryBuilder.IQueryBuilderHandler }
}
