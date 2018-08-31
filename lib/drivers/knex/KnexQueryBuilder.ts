/// <reference path="../../definitions/model/IModel.ts" />
import IModel = NajsEloquent.Model.IModel

import * as Knex from 'knex'
import { IKnexBasicQuery } from './definitions/IKnexBasicQuery'
import { KnexQueryBuilderHandler } from './KnexQueryBuilderHandler'
import { QueryBuilder } from '../../query-builders/QueryBuilder'

export type KnexQueryBuilderType<T extends IModel> = KnexQueryBuilder<T> & IKnexBasicQuery

export class KnexQueryBuilder<
  T extends IModel,
  H extends KnexQueryBuilderHandler = KnexQueryBuilderHandler
> extends QueryBuilder<T, H> {
  native(nativeCb: (queryBuilder: Knex.QueryBuilder) => any) {
    const queryBuilder = this.handler.getKnexQueryBuilder()
    nativeCb.call(undefined, queryBuilder)

    return this
  }

  toSqlQuery(): string {
    return this.handler.getKnexQueryBuilder().toQuery()
  }
}
