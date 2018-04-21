"use strict";
/// <reference path="../model/interfaces/IModel.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const functions_1 = require("../util/functions");
const ClassSetting_1 = require("./ClassSetting");
const SettingType_1 = require("./SettingType");
class ModelUtilities {
    static readArrayUniqueSetting(model, setting, defaultValue) {
        return ClassSetting_1.ClassSetting.of(model).read(setting, SettingType_1.SettingType.arrayUnique([], defaultValue));
    }
    static pushToUniqueArraySetting(model, key, args) {
        const setting = model[key] || [];
        model[key] = functions_1.array_unique(setting, lodash_1.flatten(args));
        return model[key];
    }
    static isVisible(model, key) {
        return this.isInWhiteList(model, key, model.getVisible(), model.getHidden());
    }
    static isFillable(model, key) {
        return this.isInWhiteList(model, key, model.getFillable(), model.getGuarded());
    }
    static isInWhiteList(model, key, whiteList, blackList) {
        if (whiteList.length > 0 && whiteList.indexOf(key) !== -1) {
            return true;
        }
        if (this.isInBlackList(key, blackList)) {
            return false;
        }
        return whiteList.length === 0 && !model.hasAttribute(key) && key.indexOf('_') !== 0;
    }
    static isInBlackList(key, blackList) {
        return (blackList.length === 1 && blackList[0] === '*') || blackList.indexOf(key) !== -1;
    }
}
exports.ModelUtilities = ModelUtilities;
