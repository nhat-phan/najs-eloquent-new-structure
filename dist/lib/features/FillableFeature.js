"use strict";
/// <reference path="../definitions/model/IModel.ts" />
/// <reference path="../definitions/features/IFillableFeature.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const najs_binding_1 = require("najs-binding");
const FeatureBase_1 = require("./FeatureBase");
const FillablePublicApi_1 = require("./mixin/FillablePublicApi");
const constants_1 = require("../constants");
class FillableFeature extends FeatureBase_1.FeatureBase {
    getPublicApi() {
        return FillablePublicApi_1.FillablePublicApi;
    }
    getFeatureName() {
        return 'Fillable';
    }
    getClassName() {
        return constants_1.NajsEloquent.Feature.FillableFeature;
    }
    getFillable(model) {
        return this.useSettingFeatureOf(model).getArrayUniqueSetting(model, 'fillable', []);
    }
    addFillable(model, keys) {
        return this.useSettingFeatureOf(model).pushToUniqueArraySetting(model, 'fillable', keys);
    }
    isFillable(model, keys) {
        return this.useSettingFeatureOf(model).isInWhiteList(model, keys, this.getFillable(model), this.getGuarded(model));
    }
    getGuarded(model) {
        return this.useSettingFeatureOf(model).getArrayUniqueSetting(model, 'guarded', ['*']);
    }
    addGuarded(model, keys) {
        return this.useSettingFeatureOf(model).pushToUniqueArraySetting(model, 'guarded', keys);
    }
    isGuarded(model, keys) {
        return this.useSettingFeatureOf(model).isInBlackList(model, keys, this.getGuarded(model));
    }
    fill(model, data) {
        const fillable = this.getFillable(model);
        const guarded = this.getGuarded(model);
        const attributes = fillable.length > 0 ? lodash_1.pick(data, fillable) : data;
        const settingFeature = this.useSettingFeatureOf(model);
        const recordManager = this.useRecordManagerOf(model);
        for (const key in attributes) {
            if (settingFeature.isKeyInWhiteList(model, key, fillable, guarded)) {
                recordManager.setAttribute(model, key, attributes[key]);
            }
        }
    }
    forceFill(model, data) {
        const recordManager = model.getDriver().getRecordManager();
        for (const key in data) {
            recordManager.setAttribute(model, key, data[key]);
        }
    }
}
exports.FillableFeature = FillableFeature;
najs_binding_1.register(FillableFeature, constants_1.NajsEloquent.Feature.FillableFeature);
