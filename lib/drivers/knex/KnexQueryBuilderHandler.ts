import * as Knex from 'knex'
import { KnexBasicQueryWrapper } from './wrappers/KnexBasicQueryWrapper'
import { QueryBuilderHandlerBase } from '../../query-builders/QueryBuilderHandlerBase'
import { KnexProvider } from '../../facades/global/KnexProviderFacade'

export class KnexQueryBuilderHandler extends QueryBuilderHandlerBase {
  protected knexQuery: Knex.QueryBuilder
  protected basicQuery: KnexBasicQueryWrapper

  constructor(model: NajsEloquent.Model.IModel) {
    super(model, {} as any)
  }

  getTableName() {
    return this.model.getRecordName()
  }

  getConnectionName() {
    return this.model
      .getDriver()
      .getSettingFeature()
      .getSettingProperty(this.model, 'connection', 'default')
  }

  getKnexQueryBuilder() {
    if (!this.knexQuery) {
      this.knexQuery = KnexProvider.createQueryBuilder(this.getTableName(), this.getConnectionName())
    }
    return this.knexQuery
  }

  getBasicQuery(): NajsEloquent.QueryGrammar.IBasicQuery {
    if (!this.basicQuery) {
      this.basicQuery = new KnexBasicQueryWrapper(this.getKnexQueryBuilder())
    }
    return this.basicQuery
  }

  getConditionQuery(): NajsEloquent.QueryGrammar.IConditionQuery {
    return {} as any
  }

  getQueryConvention(): NajsEloquent.QueryBuilder.IConvention {
    return {} as any
  }
}
