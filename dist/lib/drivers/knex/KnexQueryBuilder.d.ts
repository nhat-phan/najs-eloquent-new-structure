/// <reference path="../../definitions/model/IModel.d.ts" />
/// <reference types="knex" />
import IModel = NajsEloquent.Model.IModel;
import * as Knex from 'knex';
import { IKnexBasicQuery } from './definitions/IKnexBasicQuery';
import { IKnexConditionQuery } from './definitions/IKnexConditionQuery';
import { KnexQueryBuilderHandler } from './KnexQueryBuilderHandler';
import { QueryBuilder } from '../../query-builders/QueryBuilder';
export declare type KnexQueryBuilderType<T extends IModel> = KnexQueryBuilder<T> & IKnexBasicQuery & IKnexConditionQuery;
export declare class KnexQueryBuilder<T extends IModel, H extends KnexQueryBuilderHandler = KnexQueryBuilderHandler> extends QueryBuilder<T, H> {
    native(nativeCb: (queryBuilder: Knex.QueryBuilder) => any): this;
    toSqlQuery(): string;
}
