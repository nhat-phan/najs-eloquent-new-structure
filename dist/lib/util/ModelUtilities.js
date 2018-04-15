"use strict";
/// <reference path="../model/interfaces/IModel.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
class ModelUtilities {
    static pushToUniqueArraySetting(model, key, args) {
        const setting = model[key] || [];
        model[key] = Array.from(new Set(setting.concat(lodash_1.flatten(args))));
        return model[key];
    }
    static isInWhiteList(model, key, whiteList, blackList) {
        if (whiteList.length > 0 && whiteList.indexOf(key) !== -1) {
            return true;
        }
        if (this.isInBlackList(model, key, blackList)) {
            return false;
        }
        return whiteList.length === 0 && !model.hasAttribute(key) && key.indexOf('_') !== 0;
    }
    static isInBlackList(model, key, blackList) {
        return (blackList.length === 1 && blackList[0] === '*') || blackList.indexOf(key) !== -1;
    }
}
exports.ModelUtilities = ModelUtilities;
