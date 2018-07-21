/// <reference path="../../definitions/model/IModel.ts" />
/// <reference path="../../definitions/model/IModelFillable.ts" />
import Model = NajsEloquent.Model.ModelInternal

export const FillablePublicApi: NajsEloquent.Model.IModelFillable = {
  getFillable(this: Model) {
    return this.driver.getFillableFeature().getFillable(this)
  },

  getGuarded(this: Model) {
    return this.driver.getFillableFeature().getGuarded(this)
  },

  markFillable(this: Model) {
    this.driver.getFillableFeature().markFillable(this, arguments)

    return this
  },

  markGuarded(this: Model) {
    this.driver.getFillableFeature().markGuarded(this, arguments)

    return this
  },

  isFillable(this: Model) {
    return this.driver.getFillableFeature().isFillable(this, arguments)
  },

  isGuarded(this: Model) {
    return this.driver.getFillableFeature().isGuarded(this, arguments)
  },

  fill(this: Model, data: object) {
    this.driver.getFillableFeature().fill(this, data)

    return this
  },

  forceFill(this: Model, data: object) {
    this.driver.getFillableFeature().forceFill(this, data)

    return this
  }
}
