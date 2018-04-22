import { ClassSetting } from '../util/ClassSetting';
export declare class ModelSetting {
    model: NajsEloquent.Model.IModel<any>;
    setting: ClassSetting;
    constructor(model: NajsEloquent.Model.IModel<any>);
    getArrayUniqueSetting(property: string, defaultValue: string[]): string[];
    fillable(): string[];
    guarded(): string[];
    visible(): string[];
    hidden(): string[];
    isInWhiteList(key: string, whiteList: string[], blackList: string[]): boolean;
    isInBlackList(key: string, blackList: string[]): boolean;
    pushToUniqueArraySetting(key: string, args: ArrayLike<any>): any;
}
