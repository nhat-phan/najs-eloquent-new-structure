/// <reference path="../../definitions/model/IModel.ts" />
/// <reference path="../../definitions/query-grammars/IBasicQuery.ts" />
/// <reference path="../../definitions/query-grammars/IConditionQuery.ts" />
/// <reference path="../../definitions/query-builders/IConvention.ts" />
/// <reference path="../../definitions/query-builders/IQueryExecutor.ts" />

import IModel = NajsEloquent.Model.IModel
import IConvention = NajsEloquent.QueryBuilder.IConvention
import IBasicQuery = NajsEloquent.QueryGrammar.IBasicQuery
import IConditionQuery = NajsEloquent.QueryGrammar.IConditionQuery
import { QueryBuilderHandlerBase } from '../../query-builders/QueryBuilderHandlerBase'
import { BasicQuery } from '../../query-builders/shared/BasicQuery'
import { MongodbConvention } from '../../query-builders/shared/MongodbConvention'
import { ConditionQueryHandler } from '../../query-builders/shared/ConditionQueryHandler'
import { MongodbQueryExecutor } from './MongodbQueryExecutor'
import { MongodbQueryLog } from './MongodbQueryLog'

export class MongodbQueryBuilderHandler extends QueryBuilderHandlerBase {
  protected basicQuery: BasicQuery
  protected conditionQuery: ConditionQueryHandler
  protected convention: IConvention

  constructor(model: IModel) {
    super(model, {} as any)
    this.convention = new MongodbConvention()
    this.basicQuery = new BasicQuery(this.convention)
    this.conditionQuery = new ConditionQueryHandler(this.basicQuery, this.convention)
  }

  getBasicQuery(): IBasicQuery {
    return this.basicQuery
  }

  getConditionQuery(): IConditionQuery {
    return this.conditionQuery
  }

  getQueryConvention(): IConvention {
    return this.convention
  }

  getQueryExecutor(): MongodbQueryExecutor {
    return new MongodbQueryExecutor(this, this.basicQuery, new MongodbQueryLog())
  }
}
