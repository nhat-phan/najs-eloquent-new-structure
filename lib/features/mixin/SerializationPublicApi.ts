/// <reference path="../../definitions/model/IModel.ts" />
/// <reference path="../../definitions/model/IModelSerialization.ts" />
import Model = NajsEloquent.Model.ModelInternal

export const SerializationPublicApi: NajsEloquent.Model.IModelSerialization = {
  getVisible(this: Model) {
    return this.driver.getSerializationFeature().getVisible(this)
  },

  getHidden(this: Model) {
    return this.driver.getSerializationFeature().getHidden(this)
  },

  markVisible(this: Model) {
    this.driver.getSerializationFeature().markVisible(this, arguments)

    return this
  },

  markHidden(this: Model) {
    this.driver.getSerializationFeature().markHidden(this, arguments)

    return this
  },

  isVisible(this: Model) {
    return this.driver.getSerializationFeature().isVisible(this, arguments)
  },

  isHidden(this: Model) {
    return this.driver.getSerializationFeature().isHidden(this, arguments)
  },

  toObject<T extends object = object>(this: Model): T {
    return this.driver.getSerializationFeature().toObject(this) as T
  },

  toJSON<T extends object = object>(this: Model): T {
    return this.driver.getSerializationFeature().toJson(this) as T
  },

  toJson<T extends object = object>(this: Model): T {
    return this.driver.getSerializationFeature().toJson(this) as T
  }
}
