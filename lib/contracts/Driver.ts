/// <reference types="najs-binding" />
/// <reference path="../definitions/model/IModel.ts" />
/// <reference path="../definitions/features/IEventFeature.ts" />
/// <reference path="../definitions/features/IQueryFeature.ts" />
/// <reference path="../definitions/features/ISettingFeature.ts" />
/// <reference path="../definitions/features/IFillableFeature.ts" />
/// <reference path="../definitions/features/ISerializationFeature.ts" />
/// <reference path="../definitions/features/ITimestampsFeature.ts" />
/// <reference path="../definitions/features/ISoftDeletesFeature.ts" />
/// <reference path="../definitions/features/IRelationFeature.ts" />

namespace Najs.Contracts.Eloquent {
  export interface Driver<T = any> extends Najs.Contracts.Autoload {
    getRecordManager(): NajsEloquent.Feature.IRecordManager<T>

    getSettingFeature(): NajsEloquent.Feature.ISettingFeature

    getEventFeature(): NajsEloquent.Feature.IEventFeature

    getQueryFeature(): NajsEloquent.Feature.IQueryFeature

    getFillableFeature(): NajsEloquent.Feature.IFillableFeature

    getSerializationFeature(): NajsEloquent.Feature.ISerializationFeature

    getTimestampsFeature(): NajsEloquent.Feature.ITimestampsFeature

    getSoftDeletesFeature(): NajsEloquent.Feature.ISoftDeletesFeature

    getGlobalEventEmitter(): Najs.Contracts.Event.AsyncEventEmitter

    getRelationFeature(): NajsEloquent.Feature.IRelationFeature

    makeModel<M extends NajsEloquent.Model.IModel>(model: M, data?: T | object | string, isGuarded?: boolean): M
  }
}
