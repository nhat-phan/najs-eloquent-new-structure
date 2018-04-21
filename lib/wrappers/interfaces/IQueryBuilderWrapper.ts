/// <reference path="../../model/interfaces/IModelQueryAdvanced.ts" />
/// <reference path="../../query-builders/interfaces/IQueryBuilder.ts" />
/// <reference path="../../query-builders/interfaces/IFetchResultQuery.ts" />
/// <reference path="../../collect.js/index.d.ts" />

namespace NajsEloquent.Wrapper {
  export class IQueryBuilderWrapper<T> {
    protected queryBuilder: NajsEloquent.QueryBuilder.IQueryBuilder & NajsEloquent.QueryBuilder.IFetchResultQuery<T>
  }
  export interface IQueryBuilderWrapper<T>
    extends NajsEloquent.QueryBuilder.IQueryBuilder,
      NajsEloquent.Model.IModelQueryAdvanced<T> {}
}
