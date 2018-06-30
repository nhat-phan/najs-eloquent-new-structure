/// <reference path="../contracts/Driver.d.ts" />
/**
 * Base class of all drivers, handling:
 *   - generic initialize for makeModel()
 *   - attachPublicApi logic, ensure that the model prototype should be attached 1 time only.
 */
export declare abstract class DriverBase<T> implements Najs.Contracts.Eloquent.Driver<T> {
    protected attachedModels: {};
    abstract getClassName(): string;
    abstract getRecordManager(): NajsEloquent.Feature.IRecordManager<T>;
    abstract getFillableFeature(): NajsEloquent.Feature.IFillableFeature;
    abstract getSettingFeature(): NajsEloquent.Feature.ISettingFeature;
    makeModel<M extends NajsEloquent.Model.IModel>(model: M, data?: T | object | string, isGuarded?: boolean): M;
    attachPublicApiIfNeeded(model: NajsEloquent.Model.IModel): void;
    getFeatures(): (NajsEloquent.Feature.IFillableFeature | NajsEloquent.Feature.ISettingFeature | NajsEloquent.Feature.IRecordManager<T>)[];
    attachFeatureIfNeeded(feature: NajsEloquent.Feature.IFeature, prototype: object, bases: object[]): void;
}
