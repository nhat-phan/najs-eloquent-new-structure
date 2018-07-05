/// <reference path="../contracts/Driver.d.ts" />
/// <reference path="../definitions/features/IFillableFeature.d.ts" />
/// <reference path="../definitions/features/ISettingFeature.d.ts" />
import '../features/FillableFeature';
import '../features/SettingFeature';
/**
 * Base class of all drivers, handling:
 *   - generic initialize for makeModel()
 *   - make common/share features
 *   - attachPublicApi logic, ensure that the model prototype should be attached 1 time only.
 */
export declare abstract class DriverBase<T> implements Najs.Contracts.Eloquent.Driver<T> {
    protected attachedModels: object;
    protected fillableFeature: NajsEloquent.Feature.IFillableFeature;
    protected settingFeature: NajsEloquent.Feature.ISettingFeature;
    constructor();
    abstract getClassName(): string;
    abstract getRecordManager(): NajsEloquent.Feature.IRecordManager<T>;
    getFillableFeature(): NajsEloquent.Feature.IFillableFeature;
    getSettingFeature(): NajsEloquent.Feature.ISettingFeature;
    makeModel<M extends NajsEloquent.Model.IModel>(model: M, data?: T | object | string, isGuarded?: boolean): M;
    attachPublicApiIfNeeded(model: NajsEloquent.Model.IModel): void;
    getSharedFeatures(): NajsEloquent.Feature.IFeature[];
    getCustomFeatures(): NajsEloquent.Feature.IFeature[];
    getFeatures(): NajsEloquent.Feature.IFeature[];
    attachFeatureIfNeeded(feature: NajsEloquent.Feature.IFeature, prototype: object, bases: object[]): void;
}
