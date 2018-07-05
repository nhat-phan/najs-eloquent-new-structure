/// <reference path="../definitions/model/IModel.d.ts" />
/// <reference path="../definitions/features/ISettingFeature.d.ts" />
/// <reference path="../definitions/features/IRecordManager.d.ts" />
/// <reference path="../definitions/features/ISerializationFeature.d.ts" />
export declare class FeatureBase {
    useSettingFeatureOf(model: NajsEloquent.Model.IModel): NajsEloquent.Feature.ISettingFeature;
    useRecordManagerOf<T>(model: NajsEloquent.Model.IModel): NajsEloquent.Feature.IRecordManager<T>;
    useFillableFeatureOf(model: NajsEloquent.Model.IModel): NajsEloquent.Feature.IFillableFeature;
    useSerializationFeatureOf(model: NajsEloquent.Model.IModel): NajsEloquent.Feature.ISerializationFeature;
}
