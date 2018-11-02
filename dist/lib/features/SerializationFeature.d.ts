/// <reference path="../definitions/model/IModel.d.ts" />
/// <reference path="../definitions/features/ISerializationFeature.d.ts" />
import Model = NajsEloquent.Model.IModel;
import { FeatureBase } from './FeatureBase';
export declare class SerializationFeature extends FeatureBase implements NajsEloquent.Feature.ISerializationFeature {
    getPublicApi(): object;
    getFeatureName(): string;
    getClassName(): string;
    getVisible(model: Model): string[];
    getHidden(model: Model): string[];
    markVisible(model: Model, keys: ArrayLike<Array<string | string[]>>): void;
    markHidden(model: Model, keys: ArrayLike<Array<string | string[]>>): void;
    isVisible(model: Model, keys: ArrayLike<Array<string | string[]>>): boolean;
    isHidden(model: Model, keys: ArrayLike<Array<string | string[]>>): boolean;
    attributesToObject(model: Model): object;
    applyVisibleAndHiddenFor(model: Model, data: object): {};
    toObject(model: Model): object;
    toJson(model: Model, replacer?: (key: string, value: any) => any, space?: string | number): string;
}
