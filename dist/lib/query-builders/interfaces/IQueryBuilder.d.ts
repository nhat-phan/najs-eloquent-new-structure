/// <reference path="IBasicQuery.d.ts" />
/// <reference path="IConditionQuery.d.ts" />
/// <reference path="IFetchResultQuery.d.ts" />
declare namespace NajsEloquent.QueryBuilder {
    interface IQueryBuilder<T> extends IBasicQuery, IConditionQuery, IFetchResultQuery<T> {
        /**
         * Set the query with given name
         *
         * @param {string} name
         */
        queryName(name: string): this;
        /**
         * Set the query log group name
         *
         * @param {string} group QueryLog group
         */
        setLogGroup(group: string): this;
    }
}
