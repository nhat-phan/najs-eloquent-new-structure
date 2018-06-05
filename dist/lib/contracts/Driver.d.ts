/// <reference path="../definitions/model/IModel.d.ts" />
/// <reference path="../definitions/features/IFillableFeature.d.ts" />
/// <reference path="../definitions/features/ISettingFeature.d.ts" />
declare namespace Najs.Contracts.Eloquent {
    interface Driver<T> extends Najs.Contracts.Autoload {
        getRecordManager(): NajsEloquent.Feature.IRecordManager<T>;
        getFillableFeature(): NajsEloquent.Feature.IFillableFeature;
        getSettingFeature(): NajsEloquent.Feature.ISettingFeature;
        makeModel<M extends NajsEloquent.Model.IModel>(model: M, data?: T | object | string, isGuarded?: boolean): M;
    }
}
