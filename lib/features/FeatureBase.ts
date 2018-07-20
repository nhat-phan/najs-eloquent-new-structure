/// <reference path="../definitions/model/IModel.ts" />
/// <reference path="../definitions/features/ISettingFeature.ts" />
/// <reference path="../definitions/features/IRecordManager.ts" />
/// <reference path="../definitions/features/IRecordManager.ts" />
/// <reference path="../definitions/features/ISerializationFeature.ts" />
/// <reference path="../definitions/features/ITimestampsFeature.ts" />
/// <reference path="../definitions/features/ISoftDeletesFeature.ts" />

export abstract class FeatureBase {
  abstract getPublicApi(): object

  attachPublicApi(prototype: object, bases: object[], driver: Najs.Contracts.Eloquent.Driver<any>): void {
    Object.assign(prototype, this.getPublicApi())
  }

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

  useTimestampsFeatureOf(model: NajsEloquent.Model.IModel): NajsEloquent.Feature.ITimestampsFeature {
    return model.getDriver().getTimestampsFeature()
  }

  useSoftDeletesFeatureOf(model: NajsEloquent.Model.IModel): NajsEloquent.Feature.ISoftDeletesFeature {
    return model.getDriver().getSoftDeletesFeature()
  }
}
