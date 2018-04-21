/// <reference path="../model/interfaces/IModel.d.ts" />
export declare class ModelUtilities {
    static readArrayUniqueSetting(model: Object, setting: string, defaultValue: string[]): string[];
    static pushToUniqueArraySetting(model: Object, key: string, args: ArrayLike<any>): any;
    static isVisible(model: NajsEloquent.Model.IModel<any>, key: string): boolean;
    static isFillable(model: NajsEloquent.Model.IModel<any>, key: string): boolean;
    static isInWhiteList(model: NajsEloquent.Model.IModel<any>, key: string, whiteList: string[], blackList: string[]): boolean;
    static isInBlackList(key: string, blackList: string[]): boolean;
}
