/// <reference path="../../definitions/model/IModel.ts" />
/// <reference path="../../definitions/model/IModelTimestamps.ts" />

export const TimestampsPublicApi: NajsEloquent.Model.IModelTimestamps = {
  touch(this: NajsEloquent.Model.IModel) {
    this['driver'].getTimestampsFeature().touch(this)

    return this
  }
}
