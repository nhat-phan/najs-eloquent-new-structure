/// <reference path="../definitions/model/IModel.d.ts" />
/// <reference path="../definitions/features/IFillableFeature.d.ts" />
import { FeatureBase } from './FeatureBase';
export declare class FillableFeature extends FeatureBase implements NajsEloquent.Feature.IFillableFeature {
    getPublicApi(): object;
    getFeatureName(): string;
    getClassName(): string;
    getFillable(model: NajsEloquent.Model.IModel): string[];
    addFillable(model: NajsEloquent.Model.IModel, keys: ArrayLike<Array<string | string[]>>): void;
    isFillable(model: NajsEloquent.Model.IModel, keys: ArrayLike<Array<string | string[]>>): boolean;
    getGuarded(model: NajsEloquent.Model.IModel): string[];
    addGuarded(model: NajsEloquent.Model.IModel, keys: ArrayLike<Array<string | string[]>>): void;
    isGuarded(model: NajsEloquent.Model.IModel, keys: ArrayLike<Array<string | string[]>>): boolean;
    fill(model: NajsEloquent.Model.IModel, data: object): void;
    forceFill(model: NajsEloquent.Model.IModel, data: object): void;
}
