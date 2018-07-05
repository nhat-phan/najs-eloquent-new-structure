/// <reference path="../definitions/model/IModel.d.ts" />
/// <reference path="../definitions/features/ISettingFeature.d.ts" />
/// <reference path="../definitions/features/IFillableFeature.d.ts" />
/// <reference path="../definitions/features/ISerializationFeature.d.ts" />
declare namespace Najs.Contracts.Eloquent {
    interface Driver<T> extends Najs.Contracts.Autoload {
        getRecordManager(): NajsEloquent.Feature.IRecordManager<T>;
        getSettingFeature(): NajsEloquent.Feature.ISettingFeature;
        getFillableFeature(): NajsEloquent.Feature.IFillableFeature;
        getSerializationFeature(): NajsEloquent.Feature.ISerializationFeature;
        makeModel<M extends NajsEloquent.Model.IModel>(model: M, data?: T | object | string, isGuarded?: boolean): M;
    }
}
