/// <reference path="IQueryBuilderHandle.ts" />
/// <reference path="../query-grammars/IQuery.ts" />

namespace NajsEloquent.QueryBuilder {
  export declare class IQueryBuilder<Handle extends IQueryBuilderHandle = IQueryBuilderHandle> {
    protected handler: Handle
  }

  export interface IQueryBuilder<Handle extends IQueryBuilderHandle = IQueryBuilderHandle>
    extends QueryGrammar.IQuery {}
}
