/// <reference path="../definitions/model/IModel.d.ts" />
/// <reference path="../definitions/features/IEventFeature.d.ts" />
/// <reference path="../definitions/features/ISettingFeature.d.ts" />
/// <reference path="../definitions/features/IFillableFeature.d.ts" />
/// <reference path="../definitions/features/ISerializationFeature.d.ts" />
/// <reference path="../definitions/features/ITimestampsFeature.d.ts" />
/// <reference path="../definitions/features/ISoftDeletesFeature.d.ts" />
/// <reference path="../definitions/features/IRelationFeature.d.ts" />
declare namespace Najs.Contracts.Eloquent {
    interface Driver<T = any> extends Najs.Contracts.Autoload {
        getRecordManager(): NajsEloquent.Feature.IRecordManager<T>;
        getSettingFeature(): NajsEloquent.Feature.ISettingFeature;
        getEventFeature(): NajsEloquent.Feature.IEventFeature;
        getFillableFeature(): NajsEloquent.Feature.IFillableFeature;
        getSerializationFeature(): NajsEloquent.Feature.ISerializationFeature;
        getTimestampsFeature(): NajsEloquent.Feature.ITimestampsFeature;
        getSoftDeletesFeature(): NajsEloquent.Feature.ISoftDeletesFeature;
        getGlobalEventEmitter(): Najs.Contracts.Event.AsyncEventEmitter;
        getRelationFeature(): NajsEloquent.Feature.IRelationFeature;
        makeModel<M extends NajsEloquent.Model.IModel>(model: M, data?: T | object | string, isGuarded?: boolean): M;
        newQuery<M extends NajsEloquent.Model.IModel>(model: M): NajsEloquent.QueryBuilder.IQueryBuilder<M>;
    }
}
