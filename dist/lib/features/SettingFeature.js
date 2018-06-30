"use strict";
/// <reference path="../definitions/model/IModel.ts" />
/// <reference path="../definitions/features/ISettingFeature.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const najs_binding_1 = require("najs-binding");
const lodash_1 = require("lodash");
const SettingType_1 = require("../util/SettingType");
const ClassSetting_1 = require("../util/ClassSetting");
const functions_1 = require("../util/functions");
const constants_1 = require("../constants");
// TODO: write test
class SettingFeature {
    attachPublicApi(prototype, bases, driver) { }
    getFeatureName() {
        return 'Setting';
    }
    getClassName() {
        return constants_1.NajsEloquent.Feature.SettingFeature;
    }
    getClassSetting(model) {
        if (!model['classSettings']) {
            model['classSettings'] = ClassSetting_1.ClassSetting.of(model);
        }
        return model['classSettings'];
    }
    getSettingProperty(model, property, defaultValue) {
        return this.getClassSetting(model).read(property, function (staticVersion, sampleVersion) {
            if (staticVersion) {
                return staticVersion;
            }
            return sampleVersion ? sampleVersion : defaultValue;
        });
    }
    hasSetting(model, property) {
        return !!this.getSettingProperty(model, property, false);
    }
    getSettingWithDefaultForTrueValue(model, property, defaultValue) {
        const value = this.getSettingProperty(model, property, false);
        if (value === true) {
            return defaultValue;
        }
        return value || defaultValue;
    }
    getArrayUniqueSetting(model, property, defaultValue) {
        return this.getClassSetting(model).read(property, SettingType_1.SettingType.arrayUnique([], defaultValue));
    }
    pushToUniqueArraySetting(model, property, args) {
        const setting = model[property] || [];
        model[property] = functions_1.array_unique(setting, lodash_1.flatten(args));
    }
    isInWhiteList(model, keyList, whiteList, blackList) {
        const keys = lodash_1.flatten(keyList);
        for (const key of keys) {
            if (!this.isKeyInWhiteList(model, key, whiteList, blackList)) {
                return false;
            }
        }
        return true;
    }
    isKeyInWhiteList(model, key, whiteList, blackList) {
        if (whiteList.length > 0 && whiteList.indexOf(key) !== -1) {
            return true;
        }
        if (this.isKeyInBlackList(model, key, blackList)) {
            return false;
        }
        const knownAttributes = model
            .getDriver()
            .getRecordManager()
            .getKnownAttributes(model);
        return whiteList.length === 0 && knownAttributes.indexOf(key) === -1 && key.indexOf('_') !== 0;
    }
    isInBlackList(model, list, blackList) {
        if (blackList.length === 1 && blackList[0] === '*') {
            return true;
        }
        const keys = lodash_1.flatten(list);
        for (const key of keys) {
            if (blackList.indexOf(key) === -1) {
                return false;
            }
        }
        return true;
    }
    isKeyInBlackList(model, key, blackList) {
        return (blackList.length === 1 && blackList[0] === '*') || blackList.indexOf(key) !== -1;
    }
}
exports.SettingFeature = SettingFeature;
najs_binding_1.register(SettingFeature, constants_1.NajsEloquent.Feature.SettingFeature);
