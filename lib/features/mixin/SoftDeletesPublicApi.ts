/// <reference path="../../definitions/model/IModel.ts" />
/// <reference path="../../definitions/model/IModelSoftDeletes.ts" />

export const SoftDeletesPublicApi: NajsEloquent.Model.IModelSoftDeletes = {
  trashed(this: NajsEloquent.Model.IModel): boolean {
    return this['driver'].getSoftDeletesFeature().trashed(this)
  },

  forceDelete(this: NajsEloquent.Model.IModel): Promise<boolean> {
    return this['driver'].getSoftDeletesFeature().forceDelete(this)
  },

  restore(this: NajsEloquent.Model.IModel): Promise<boolean> {
    return this['driver'].getSoftDeletesFeature().restore(this)
  }
}
