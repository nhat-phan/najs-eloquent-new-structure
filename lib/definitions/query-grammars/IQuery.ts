/// <reference path="IBasicQuery.ts" />

namespace NajsEloquent.QueryGrammar {
  export interface IQuery extends IBasicQuery {
    /**
     * Add an "order by" clause to the query with direction ASC.
     *
     * @param {string} field
     * @param {string} direction
     */
    orderByAsc(field: string): this

    /**
     * Add an "order by" clause to the query with direction DESC.
     *
     * @param {string} field
     * @param {string} direction
     */
    orderByDesc(field: string): this
  }
}
