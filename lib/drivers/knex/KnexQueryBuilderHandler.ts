import * as Knex from 'knex'
import { KnexBasicQueryWrapper } from './wrappers/KnexBasicQueryWrapper'
import { QueryBuilderHandlerBase } from '../../query-builders/QueryBuilderHandlerBase'
import { KnexProvider } from '../../facades/global/KnexProviderFacade'
import { KnexConditionQueryWrapper } from './wrappers/KnexConditionQueryWrapper'
import { DefaultConvention } from '../../query-builders/shared/DefaultConvention'

export class KnexQueryBuilderHandler extends QueryBuilderHandlerBase {
  protected knexQuery: Knex.QueryBuilder
  protected basicQuery: KnexBasicQueryWrapper
  protected conditionQuery: KnexConditionQueryWrapper
  protected convention: DefaultConvention

  constructor(model: NajsEloquent.Model.IModel) {
    super(model, {} as any)
    this.convention = new DefaultConvention()
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

  getBasicQuery(): KnexBasicQueryWrapper {
    if (!this.basicQuery) {
      this.basicQuery = new KnexBasicQueryWrapper(this.getKnexQueryBuilder())
    }
    return this.basicQuery
  }

  getConditionQuery(): KnexConditionQueryWrapper {
    if (!this.conditionQuery) {
      this.conditionQuery = new KnexConditionQueryWrapper(this.getKnexQueryBuilder())
    }
    return this.conditionQuery
  }

  getQueryConvention(): NajsEloquent.QueryBuilder.IConvention {
    return this.convention
  }
}
