/// <reference path="../definitions/model/IModel.ts" />
/// <reference path="../definitions/model/IModelFillable.ts" />

export const FillablePublicApi: NajsEloquent.Model.IModelFillable = {
  getFillable(this: NajsEloquent.Model.IModel) {
    return this['driver'].getFillableFeature().getFillable(this)
  },

  getGuarded(this: NajsEloquent.Model.IModel) {
    return this['driver'].getFillableFeature().getGuarded(this)
  },

  markFillable(this: NajsEloquent.Model.IModel) {
    this['driver'].getFillableFeature().markFillable(this, arguments)

    return this
  },

  markGuarded(this: NajsEloquent.Model.IModel) {
    this['driver'].getFillableFeature().markGuarded(this, arguments)

    return this
  },

  isFillable(this: NajsEloquent.Model.IModel) {
    return this['driver'].getFillableFeature().isFillable(this, arguments)
  },

  isGuarded(this: NajsEloquent.Model.IModel) {
    return this['driver'].getFillableFeature().isGuarded(this, arguments)
  },

  fill(this: NajsEloquent.Model.IModel, data: object) {
    this['driver'].getFillableFeature().fill(this, data)

    return this
  },

  forceFill(this: NajsEloquent.Model.IModel, data: object) {
    this['driver'].getFillableFeature().forceFill(this, data)

    return this
  }
}
