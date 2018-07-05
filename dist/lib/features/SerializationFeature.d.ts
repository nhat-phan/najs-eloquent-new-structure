/// <reference path="../definitions/model/IModel.d.ts" />
/// <reference path="../definitions/features/ISerializationFeature.d.ts" />
import { FeatureBase } from './FeatureBase';
export declare class SerializationFeature extends FeatureBase implements NajsEloquent.Feature.ISerializationFeature {
    attachPublicApi(prototype: object, bases: object[], driver: Najs.Contracts.Eloquent.Driver<any>): void;
    getFeatureName(): string;
    getClassName(): string;
    getVisible(model: NajsEloquent.Model.IModel): string[];
    getHidden(model: NajsEloquent.Model.IModel): string[];
    markVisible(model: NajsEloquent.Model.IModel, keys: ArrayLike<Array<string | string[]>>): void;
    markHidden(model: NajsEloquent.Model.IModel, keys: ArrayLike<Array<string | string[]>>): void;
    isVisible(model: NajsEloquent.Model.IModel, keys: ArrayLike<Array<string | string[]>>): boolean;
    isHidden(model: NajsEloquent.Model.IModel, keys: ArrayLike<Array<string | string[]>>): boolean;
    toObject(model: NajsEloquent.Model.IModel): object;
    toJson(model: NajsEloquent.Model.IModel): object;
}
