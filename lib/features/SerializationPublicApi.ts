/// <reference path="../definitions/model/IModel.ts" />
/// <reference path="../definitions/model/IModelSerialization.ts" />

export const SerializationPublicApi: NajsEloquent.Model.IModelSerialization = {
  getVisible(this: NajsEloquent.Model.IModel) {
    return this['driver'].getSerializationFeature().getVisible(this)
  },

  getHidden(this: NajsEloquent.Model.IModel) {
    return this['driver'].getSerializationFeature().getHidden(this)
  },

  markVisible(this: NajsEloquent.Model.IModel) {
    this['driver'].getSerializationFeature().markVisible(this, arguments)

    return this
  },

  markHidden(this: NajsEloquent.Model.IModel) {
    this['driver'].getSerializationFeature().markHidden(this, arguments)

    return this
  },

  isVisible(this: NajsEloquent.Model.IModel) {
    return this['driver'].getSerializationFeature().isVisible(this, arguments)
  },

  isHidden(this: NajsEloquent.Model.IModel) {
    return this['driver'].getSerializationFeature().isHidden(this, arguments)
  },

  toObject(this: NajsEloquent.Model.IModel): object {
    return this['driver'].getSerializationFeature().toObject(this)
  },

  toJSON(this: NajsEloquent.Model.IModel): object {
    return this['driver'].getSerializationFeature().toJson(this)
  },

  toJson(this: NajsEloquent.Model.IModel): object {
    return this['driver'].getSerializationFeature().toJson(this)
  }
}
