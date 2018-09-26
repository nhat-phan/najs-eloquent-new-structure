/// <reference path="../../definitions/model/IModel.d.ts" />
import * as Knex from 'knex';
import { IKnexBasicQuery } from './definitions/IKnexBasicQuery';
import { IKnexConditionQuery } from './definitions/IKnexConditionQuery';
import { KnexQueryBuilderHandler } from './KnexQueryBuilderHandler';
import { QueryBuilder } from '../../query-builders/QueryBuilder';
export declare type KnexQueryBuilderType<T> = KnexQueryBuilder<T> & IKnexBasicQuery & IKnexConditionQuery;
export declare class KnexQueryBuilder<T, H extends KnexQueryBuilderHandler = KnexQueryBuilderHandler> extends QueryBuilder<T, H> {
    native(nativeCb: (queryBuilder: Knex.QueryBuilder) => any): this;
    toSqlQuery(): string;
}
