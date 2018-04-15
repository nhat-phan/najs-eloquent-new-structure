/// <reference path="../model/interfaces/IModel.d.ts" />
export declare class ModelUtilities {
    static pushToUniqueArraySetting(model: Object, key: string, args: ArrayLike<any>): any;
    static isInWhiteList(model: NajsEloquent.Model.IModel<any>, key: string, whiteList: string[], blackList: string[]): boolean;
    static isInBlackList(model: NajsEloquent.Model.IModel<any>, key: string, blackList: string[]): boolean;
}
