/// <reference path="../definitions/model/IModel.ts" />
/// <reference path="../definitions/query-builders/IQueryBuilder.ts" />
/// <reference path="../definitions/query-builders/IQueryBuilderFactory.ts" />
/// <reference path="../definitions/features/IQueryFeature.ts" />

import { register } from 'najs-binding'
import { FeatureBase } from './FeatureBase'
import { QueryPublicApi } from './mixin/QueryPublicApi'
import { NajsEloquent } from '../constants'

export class QueryFeature extends FeatureBase implements NajsEloquent.Feature.IQueryFeature {
  protected factory: NajsEloquent.QueryBuilder.IQueryBuilderFactory

  constructor(factory: NajsEloquent.QueryBuilder.IQueryBuilderFactory) {
    super()
    this.factory = factory
  }

  getPublicApi(): object {
    return QueryPublicApi
  }

  getFeatureName(): string {
    return 'Query'
  }

  getClassName(): string {
    return NajsEloquent.Feature.QueryFeature
  }

  newQuery(model: NajsEloquent.Model.IModel): NajsEloquent.QueryBuilder.IQueryBuilder<any> {
    return this.factory.make(model)
  }
}
register(QueryFeature, NajsEloquent.Feature.QueryFeature)
