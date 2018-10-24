/// <reference path="../../../definitions/query-grammars/IConditionQuery.d.ts" />
/// <reference types="knex" />
import * as Knex from 'knex';
export interface IKnexCustomConditionQuery {
    /**
     * Add a raw where clause to the query.
     *
     * @param {Knex.Raw} raw
     */
    where(raw: Knex.Raw): this;
    /**
     * Add a raw or where clause to the query.
     *
     * @param {Knex.Raw} raw
     */
    orWhere(raw: Knex.Raw): this;
    /**
     * Add a raw where clause to the query.
     *
     * @param {Knex.Raw} raw
     */
    andWhere(raw: Knex.Raw): this;
}
export declare type IKnexConditionQuery = IKnexCustomConditionQuery & NajsEloquent.QueryGrammar.IConditionQuery;
