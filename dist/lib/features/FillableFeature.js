"use strict";
/// <reference path="../definitions/model/IModel.ts" />
/// <reference path="../definitions/model/IModelFillable.ts" />
/// <reference path="../definitions/features/IFillableFeature.ts" />
/// <reference path="../definitions/features/ISettingFeature.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const najs_binding_1 = require("najs-binding");
const FillablePublicApi_1 = require("./FillablePublicApi");
const constants_1 = require("../constants");
class FillableFeature {
    attachPublicApi(prototype, bases, driver) {
        Object.assign(prototype, FillablePublicApi_1.FillablePublicApi);
    }
    getFeatureName() {
        return 'Fillable';
    }
    getClassName() {
        return constants_1.NajsEloquent.Feature.FillableFeature;
    }
    getSettingFeature(model) {
        return model.getDriver().getSettingFeature();
    }
    getFillable(model) {
        return this.getSettingFeature(model).getArrayUniqueSetting(model, 'fillable', []);
    }
    getGuarded(model) {
        return this.getSettingFeature(model).getArrayUniqueSetting(model, 'guarded', ['*']);
    }
    markFillable(model, keys) {
        return this.getSettingFeature(model).pushToUniqueArraySetting(model, 'fillable', keys);
    }
    markGuarded(model, keys) {
        return this.getSettingFeature(model).pushToUniqueArraySetting(model, 'guarded', keys);
    }
    isFillable(model, keys) {
        return this.getSettingFeature(model).isInWhiteList(model, keys, this.getFillable(model), this.getGuarded(model));
    }
    isGuarded(model, keys) {
        return this.getSettingFeature(model).isInBlackList(model, keys, this.getGuarded(model));
    }
    fill(model, data) {
        const fillable = this.getFillable(model);
        const guarded = this.getGuarded(model);
        const attributes = fillable.length > 0 ? lodash_1.pick(data, fillable) : data;
        const settingFeature = model.getDriver().getSettingFeature();
        const recordManager = model.getDriver().getRecordManager();
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
