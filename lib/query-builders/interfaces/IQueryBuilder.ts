/// <reference path="IBasicQuery.ts" />
/// <reference path="IConditionQuery.ts" />
/// <reference path="IFetchResultQuery.ts" />

namespace NajsEloquent.QueryBuilder {
  export interface IQueryBuilder<T> extends IBasicQuery, IConditionQuery, IFetchResultQuery<T> {}
}
