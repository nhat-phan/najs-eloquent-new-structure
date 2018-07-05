/// <reference types="najs-binding" />
/// <reference path="../definitions/model/IModel.ts" />
/// <reference path="../definitions/features/ISettingFeature.ts" />
/// <reference path="../definitions/features/IFillableFeature.ts" />
/// <reference path="../definitions/features/ISerializationFeature.ts" />

namespace Najs.Contracts.Eloquent {
  export interface Driver<T> extends Najs.Contracts.Autoload {
    getRecordManager(): NajsEloquent.Feature.IRecordManager<T>

    getSettingFeature(): NajsEloquent.Feature.ISettingFeature

    getFillableFeature(): NajsEloquent.Feature.IFillableFeature

    getSerializationFeature(): NajsEloquent.Feature.ISerializationFeature

    makeModel<M extends NajsEloquent.Model.IModel>(model: M, data?: T | object | string, isGuarded?: boolean): M
  }
}
