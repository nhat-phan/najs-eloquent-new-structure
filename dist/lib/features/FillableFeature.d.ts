/// <reference path="../definitions/model/IModel.d.ts" />
/// <reference path="../definitions/model/IModelFillable.d.ts" />
/// <reference path="../definitions/features/IFillableFeature.d.ts" />
/// <reference path="../definitions/features/ISettingFeature.d.ts" />
export declare class FillableFeature {
    attachPublicApi(prototype: object, bases: object[], driver: Najs.Contracts.Eloquent.Driver<any>): void;
    getFeatureName(): string;
    getClassName(): string;
    getSettingFeature(model: NajsEloquent.Model.IModel): NajsEloquent.Feature.ISettingFeature;
    getFillable(model: NajsEloquent.Model.IModel): string[];
    getGuarded(model: NajsEloquent.Model.IModel): string[];
    markFillable(model: NajsEloquent.Model.IModel, keys: ArrayLike<Array<string | string[]>>): void;
    markGuarded(model: NajsEloquent.Model.IModel, keys: ArrayLike<Array<string | string[]>>): void;
    isFillable(model: NajsEloquent.Model.IModel, keys: ArrayLike<Array<string | string[]>>): boolean;
    isGuarded(model: NajsEloquent.Model.IModel, keys: ArrayLike<Array<string | string[]>>): boolean;
    fill(model: NajsEloquent.Model.IModel, data: Object): void;
    forceFill(model: NajsEloquent.Model.IModel, data: Object): void;
}
