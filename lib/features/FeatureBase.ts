/// <reference path="../definitions/model/IModel.ts" />
/// <reference path="../definitions/features/ISettingFeature.ts" />
/// <reference path="../definitions/features/IRecordManager.ts" />
/// <reference path="../definitions/features/IRecordManager.ts" />
/// <reference path="../definitions/features/ISerializationFeature.ts" />

export class FeatureBase {
  useSettingFeatureOf(model: NajsEloquent.Model.IModel): NajsEloquent.Feature.ISettingFeature {
    return model.getDriver().getSettingFeature()
  }

  useRecordManagerOf<T>(model: NajsEloquent.Model.IModel): NajsEloquent.Feature.IRecordManager<T> {
    return model.getDriver().getRecordManager()
  }

  useFillableFeatureOf(model: NajsEloquent.Model.IModel): NajsEloquent.Feature.IFillableFeature {
    return model.getDriver().getFillableFeature()
  }

  useSerializationFeatureOf(model: NajsEloquent.Model.IModel): NajsEloquent.Feature.ISerializationFeature {
    return model.getDriver().getSerializationFeature()
  }
}
