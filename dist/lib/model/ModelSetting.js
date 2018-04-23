"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ClassSetting_1 = require("../util/ClassSetting");
class ModelSetting {
    constructor(model) {
        this.model = model;
        this.setting = ClassSetting_1.ClassSetting.of(model);
    }
    // getSettingProperty<T extends any>(property: string, defaultValue: T): T {
    //   return this.getClassSetting().read(property, function(staticVersion?: any, sampleVersion?: any) {
    //     if (staticVersion) {
    //       return staticVersion
    //     }
    //     return sampleVersion ? sampleVersion : defaultValue
    //   })
    // }
    isInWhiteList(key, whiteList, blackList) {
        if (whiteList.length > 0 && whiteList.indexOf(key) !== -1) {
            return true;
        }
        if (this.isInBlackList(key, blackList)) {
            return false;
        }
        return whiteList.length === 0 && !this.model.hasAttribute(key) && key.indexOf('_') !== 0;
    }
    isInBlackList(key, blackList) {
        return (blackList.length === 1 && blackList[0] === '*') || blackList.indexOf(key) !== -1;
    }
}
exports.ModelSetting = ModelSetting;
