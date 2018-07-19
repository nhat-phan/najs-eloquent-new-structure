/// <reference path="../QueryBuilder.ts" />
/// <reference path="../../definitions/query-grammars/ISoftDeleteQuery.ts" />
import QueryBuilder = NajsEloquent.QueryBuilder.IQueryBuilder

export const SoftDeleteQuery: NajsEloquent.QueryGrammar.ISoftDeleteQuery = {
  withTrashed(this: QueryBuilder) {
    if (this['handler'].hasSoftDeletes()) {
      this['handler'].markSoftDeleteState('should-not-add')
      this['handler'].markUsed()
    }

    return this
  },

  onlyTrashed(this: QueryBuilder) {
    if (this['handler'].hasSoftDeletes()) {
      this['handler'].markSoftDeleteState('should-not-add')
      const model = this['handler'].getModel()
      const softDeletesFeature = model.getDriver().getSoftDeletesFeature()
      const softDeletesSetting = softDeletesFeature.getSoftDeletesSetting(model)
      this.whereNotNull(softDeletesSetting.deletedAt)
      this['handler'].markUsed()
    }

    return this
  }
}
