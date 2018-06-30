/// <reference path="../definitions/model/IModel.d.ts" />
/// <reference path="../definitions/features/ISettingFeature.d.ts" />
export declare class SettingFeature implements NajsEloquent.Feature.ISettingFeature {
    attachPublicApi(prototype: object, bases: object[], driver: Najs.Contracts.Eloquent.Driver<any>): void;
    getFeatureName(): string;
    getClassName(): string;
    getClassSetting(model: NajsEloquent.Model.IModel): NajsEloquent.Util.IClassSetting;
    getSettingProperty<T>(model: NajsEloquent.Model.IModel, property: string, defaultValue: T): T;
    hasSetting(model: NajsEloquent.Model.IModel, property: string): boolean;
    getSettingWithDefaultForTrueValue<T>(model: NajsEloquent.Model.IModel, property: string, defaultValue: T): T;
    getArrayUniqueSetting(model: NajsEloquent.Model.IModel, property: string, defaultValue: string[]): string[];
    pushToUniqueArraySetting(model: NajsEloquent.Model.IModel, property: string, args: ArrayLike<any>): void;
    isInWhiteList(model: NajsEloquent.Model.IModel, keyList: ArrayLike<any>, whiteList: string[], blackList: string[]): boolean;
    isKeyInWhiteList(model: NajsEloquent.Model.IModel, key: string, whiteList: string[], blackList: string[]): boolean;
    isInBlackList(model: NajsEloquent.Model.IModel, list: ArrayLike<any>, blackList: string[]): boolean;
    isKeyInBlackList(model: NajsEloquent.Model.IModel, key: any, blackList: string[]): boolean;
}
