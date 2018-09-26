import * as Knex from 'knex';
import { KnexBasicQueryWrapper } from './wrappers/KnexBasicQueryWrapper';
import { QueryBuilderHandlerBase } from '../../query-builders/QueryBuilderHandlerBase';
import { KnexConditionQueryWrapper } from './wrappers/KnexConditionQueryWrapper';
import { DefaultConvention } from '../../query-builders/shared/DefaultConvention';
export declare class KnexQueryBuilderHandler extends QueryBuilderHandlerBase {
    protected knexQuery?: Knex.QueryBuilder;
    protected basicQuery?: KnexBasicQueryWrapper;
    protected conditionQuery?: KnexConditionQueryWrapper;
    protected convention: DefaultConvention;
    constructor(model: NajsEloquent.Model.IModel);
    getTableName(): string;
    getConnectionName(): string;
    getKnexQueryBuilder(): Knex.QueryBuilder;
    getBasicQuery(): KnexBasicQueryWrapper;
    getConditionQuery(): KnexConditionQueryWrapper;
    getQueryConvention(): NajsEloquent.QueryBuilder.IConvention;
}
