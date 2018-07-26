/// <reference path="../contracts/Driver.d.ts" />
/// <reference path="../definitions/features/ISettingFeature.d.ts" />
/// <reference path="../definitions/features/IEventFeature.d.ts" />
/// <reference path="../definitions/features/IFillableFeature.d.ts" />
/// <reference path="../definitions/features/ISerializationFeature.d.ts" />
/// <reference path="../definitions/features/ITimestampsFeature.d.ts" />
/// <reference path="../definitions/query-builders/IQueryBuilder.d.ts" />
import IModel = NajsEloquent.Model.IModel;
import IQueryBuilder = NajsEloquent.QueryBuilder.IQueryBuilder;
import '../features/SettingFeature';
import '../features/EventFeature';
import '../features/FillableFeature';
import '../features/SerializationFeature';
import '../features/TimestampsFeature';
import '../features/SoftDeletesFeature';
/**
 * Base class of all drivers, handling:
 *   - generic initialize for makeModel()
 *   - make common/share features
 *   - attachPublicApi logic, ensure that the model prototype should be attached 1 time only.
 */
export declare abstract class DriverBase<T> implements Najs.Contracts.Eloquent.Driver<T> {
    protected attachedModels: object;
    protected settingFeature: NajsEloquent.Feature.ISettingFeature;
    protected eventFeature: NajsEloquent.Feature.IEventFeature;
    protected fillableFeature: NajsEloquent.Feature.IFillableFeature;
    protected serializationFeature: NajsEloquent.Feature.ISerializationFeature;
    protected timestampsFeature: NajsEloquent.Feature.ITimestampsFeature;
    protected softDeletesFeature: NajsEloquent.Feature.ISoftDeletesFeature;
    protected static globalEventEmitter: Najs.Contracts.Event.AsyncEventEmitter;
    constructor();
    abstract getClassName(): string;
    abstract getRecordManager(): NajsEloquent.Feature.IRecordManager<T>;
    abstract newQuery<M extends IModel>(model: M, name?: string): IQueryBuilder<M>;
    getSettingFeature(): NajsEloquent.Feature.ISettingFeature;
    getEventFeature(): NajsEloquent.Feature.IEventFeature;
    getFillableFeature(): NajsEloquent.Feature.IFillableFeature;
    getSerializationFeature(): NajsEloquent.Feature.ISerializationFeature;
    getTimestampsFeature(): NajsEloquent.Feature.ITimestampsFeature;
    getSoftDeletesFeature(): NajsEloquent.Feature.ISoftDeletesFeature;
    getGlobalEventEmitter(): Najs.Contracts.Event.AsyncEventEmitter;
    makeModel<M extends IModel>(model: M, data?: T | object | string, isGuarded?: boolean): M;
    attachPublicApiIfNeeded(model: IModel): void;
    getSharedFeatures(): NajsEloquent.Feature.IFeature[];
    getCustomFeatures(): NajsEloquent.Feature.IFeature[];
    getFeatures(): NajsEloquent.Feature.IFeature[];
    attachFeatureIfNeeded(feature: NajsEloquent.Feature.IFeature, prototype: object, bases: object[]): void;
}
