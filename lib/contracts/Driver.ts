/// <reference types="najs-binding" />
/// <reference path="../definitions/model/IModel.ts" />
/// <reference path="../definitions/features/IFillableFeature.ts" />
/// <reference path="../definitions/features/ISettingFeature.ts" />

namespace Najs.Contracts.Eloquent {
  export interface Driver<T> extends Najs.Contracts.Autoload {
    getRecordManager(): NajsEloquent.Feature.IRecordManager<T>

    getFillableFeature(): NajsEloquent.Feature.IFillableFeature

    getSettingFeature(): NajsEloquent.Feature.ISettingFeature

    makeModel<M extends NajsEloquent.Model.IModel>(model: M, data?: T | object | string, isGuarded?: boolean): M
  }
}
