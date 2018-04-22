"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ClassSetting_1 = require("../util/ClassSetting");
const SettingType_1 = require("../util/SettingType");
const functions_1 = require("../util/functions");
const lodash_1 = require("lodash");
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
    getArrayUniqueSetting(property, defaultValue) {
        return this.setting.read(property, SettingType_1.SettingType.arrayUnique([], defaultValue));
    }
    fillable() {
        return this.getArrayUniqueSetting('fillable', []);
    }
    guarded() {
        return this.getArrayUniqueSetting('guarded', ['*']);
    }
    visible() {
        return this.getArrayUniqueSetting('visible', []);
    }
    hidden() {
        return this.getArrayUniqueSetting('hidden', []);
    }
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
    pushToUniqueArraySetting(key, args) {
        const setting = this.model[key] || [];
        this.model[key] = functions_1.array_unique(setting, lodash_1.flatten(args));
        return this.model[key];
    }
}
exports.ModelSetting = ModelSetting;
