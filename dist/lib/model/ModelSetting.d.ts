import { ClassSetting } from '../util/ClassSetting';
export declare class ModelSetting {
    model: NajsEloquent.Model.IModel<any>;
    setting: ClassSetting;
    constructor(model: NajsEloquent.Model.IModel<any>);
    isInWhiteList(key: string, whiteList: string[], blackList: string[]): boolean;
    isInBlackList(key: string, blackList: string[]): boolean;
}
