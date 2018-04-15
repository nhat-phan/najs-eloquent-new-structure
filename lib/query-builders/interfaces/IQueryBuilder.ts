/// <reference path="IBasicQuery.ts" />
/// <reference path="IConditionQuery.ts" />
/// <reference path="IFetchResultQuery.ts" />

namespace NajsEloquent.QueryBuilder {
  export interface IQueryBuilder<T> extends IBasicQuery, IConditionQuery, IFetchResultQuery<T> {
    /**
     * Set the query with given name
     *
     * @param {string} name
     */
    queryName(name: string): this

    /**
     * Set the query log group name
     *
     * @param {string} group QueryLog group
     */
    setLogGroup(group: string): this
  }
}
