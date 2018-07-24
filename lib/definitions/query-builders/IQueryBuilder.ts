/// <reference path="IQueryBuilderHandle.ts" />
/// <reference path="../model/IModel.ts" />
/// <reference path="../query-grammars/IQuery.ts" />
/// <reference path="../query-grammars/IConditionQuery.ts" />

namespace NajsEloquent.QueryBuilder {
  export declare class IQueryBuilder<T extends Model.IModel, Handle extends IQueryBuilderHandle = IQueryBuilderHandle> {
    protected handler: Handle
  }

  export interface IQueryBuilder<T extends Model.IModel, Handle extends IQueryBuilderHandle = IQueryBuilderHandle>
    extends QueryGrammar.IQuery,
      QueryGrammar.IConditionQuery,
      QueryGrammar.IAdvancedQuery<T> {}

  export type QueryBuilderInternal = IQueryBuilder<any> & { handler: NajsEloquent.QueryBuilder.IQueryBuilderHandle }
}
