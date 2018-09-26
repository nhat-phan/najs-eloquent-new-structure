/// <reference path="IQueryBuilderHandler.ts" />
/// <reference path="../model/IModel.ts" />
/// <reference path="../query-grammars/IQuery.ts" />
/// <reference path="../query-grammars/IConditionQuery.ts" />

namespace NajsEloquent.QueryBuilder {
  export type OmittedResult<T, K> = Pick<T, Exclude<keyof T, (keyof QueryBuilder.IQueryBuilder<any>) | (keyof K)>>
  export type OmittedQueryBuilderResult<T> = Pick<T, Exclude<keyof T, keyof QueryBuilder.IQueryBuilder<any>>>

  export declare class IQueryBuilder<
    T,
    Handler extends IQueryBuilderHandler = IQueryBuilderHandler,
    OmittedMethods = {}
  > {
    protected handler: Handler
  }

  export interface IQueryBuilder<T, Handler extends IQueryBuilderHandler = IQueryBuilderHandler, OmittedMethods = {}>
    extends QueryGrammar.IQuery,
      QueryGrammar.IConditionQuery,
      QueryGrammar.IExecuteQuery,
      QueryGrammar.IAdvancedQuery<OmittedResult<T, OmittedMethods>> {}

  export type QueryBuilderInternal = IQueryBuilder<any> & { handler: NajsEloquent.QueryBuilder.IQueryBuilderHandler }
}
