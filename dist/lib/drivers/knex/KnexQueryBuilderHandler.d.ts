/// <reference types="knex" />
import * as Knex from 'knex';
import { KnexBasicQueryWrapper } from './wrappers/KnexBasicQueryWrapper';
import { QueryBuilderHandlerBase } from '../../query-builders/QueryBuilderHandlerBase';
export declare class KnexQueryBuilderHandler extends QueryBuilderHandlerBase {
    protected knexQuery: Knex.QueryBuilder;
    protected basicQuery: KnexBasicQueryWrapper;
    constructor(model: NajsEloquent.Model.IModel);
    getTableName(): string;
    getConnectionName(): string;
    getKnexQueryBuilder(): Knex.QueryBuilder;
    getBasicQuery(): NajsEloquent.QueryGrammar.IBasicQuery;
    getConditionQuery(): NajsEloquent.QueryGrammar.IConditionQuery;
    getQueryConvention(): NajsEloquent.QueryBuilder.IConvention;
}
