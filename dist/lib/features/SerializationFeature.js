"use strict";
/// <reference path="../definitions/model/IModel.ts" />
/// <reference path="../definitions/features/ISerializationFeature.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const najs_binding_1 = require("najs-binding");
const FeatureBase_1 = require("./FeatureBase");
const SerializationPublicApi_1 = require("./mixin/SerializationPublicApi");
const constants_1 = require("../constants");
class SerializationFeature extends FeatureBase_1.FeatureBase {
    getPublicApi() {
        return SerializationPublicApi_1.SerializationPublicApi;
    }
    getFeatureName() {
        return 'Serialization';
    }
    getClassName() {
        return constants_1.NajsEloquent.Feature.SerializationFeature;
    }
    getVisible(model) {
        return this.useSettingFeatureOf(model).getArrayUniqueSetting(model, 'visible', []);
    }
    getHidden(model) {
        return this.useSettingFeatureOf(model).getArrayUniqueSetting(model, 'hidden', []);
    }
    markVisible(model, keys) {
        return this.useSettingFeatureOf(model).pushToUniqueArraySetting(model, 'visible', keys);
    }
    markHidden(model, keys) {
        return this.useSettingFeatureOf(model).pushToUniqueArraySetting(model, 'hidden', keys);
    }
    isVisible(model, keys) {
        return this.useSettingFeatureOf(model).isInWhiteList(model, keys, this.getVisible(model), this.getHidden(model));
    }
    isHidden(model, keys) {
        return this.useSettingFeatureOf(model).isInBlackList(model, keys, this.getHidden(model));
    }
    toObject(model) {
        return this.useRecordManagerOf(model).toObject(model);
    }
    toJson(model) {
        const data = this.toObject(model), visible = this.getVisible(model), hidden = this.getHidden(model);
        const settingFeature = this.useSettingFeatureOf(model);
        return Object.getOwnPropertyNames(data).reduce((memo, name) => {
            if (settingFeature.isKeyInWhiteList(model, name, visible, hidden)) {
                memo[name] = data[name];
            }
            return memo;
        }, {});
    }
}
exports.SerializationFeature = SerializationFeature;
najs_binding_1.register(SerializationFeature, 'NajsEloquent.Feature.SerializationFeature');
