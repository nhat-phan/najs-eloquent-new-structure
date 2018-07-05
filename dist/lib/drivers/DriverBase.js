"use strict";
/// <reference path="../contracts/Driver.ts" />
/// <reference path="../definitions/features/IFillableFeature.ts" />
/// <reference path="../definitions/features/ISettingFeature.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
require("../features/FillableFeature");
require("../features/SettingFeature");
const najs_binding_1 = require("najs-binding");
const ClassSetting_1 = require("../util/ClassSetting");
const functions_1 = require("../util/functions");
const constants_1 = require("../constants");
/**
 * Base class of all drivers, handling:
 *   - generic initialize for makeModel()
 *   - make common/share features
 *   - attachPublicApi logic, ensure that the model prototype should be attached 1 time only.
 */
class DriverBase {
    constructor() {
        this.attachedModels = {};
        this.fillableFeature = najs_binding_1.make(constants_1.NajsEloquent.Feature.FillableFeature);
        this.settingFeature = najs_binding_1.make(constants_1.NajsEloquent.Feature.SettingFeature);
    }
    getFillableFeature() {
        return this.fillableFeature;
    }
    getSettingFeature() {
        return this.settingFeature;
    }
    makeModel(model, data, isGuarded = true) {
        if (data === ClassSetting_1.CREATE_SAMPLE) {
            return model;
        }
        this.getRecordManager().initialize(model, isGuarded, data);
        this.attachPublicApiIfNeeded(model);
        return model;
    }
    attachPublicApiIfNeeded(model) {
        if (typeof this.attachedModels[model.getModelName()] !== 'undefined') {
            return;
        }
        const prototype = Object.getPrototypeOf(model);
        const bases = functions_1.find_base_prototypes(prototype, Object.prototype);
        this.attachedModels[model.getModelName()] = {
            prototype: prototype,
            bases: bases
        };
        const features = this.getFeatures();
        for (const feature of features) {
            this.attachFeatureIfNeeded(feature, prototype, bases);
        }
    }
    getSharedFeatures() {
        return [this.getFillableFeature(), this.getSettingFeature()];
    }
    getCustomFeatures() {
        return [];
    }
    getFeatures() {
        return [].concat(this.getSharedFeatures(), this.getCustomFeatures(), [
            // RecordManager must be attached after other features
            this.getRecordManager()
        ]);
    }
    attachFeatureIfNeeded(feature, prototype, bases) {
        if (typeof prototype['sharedMetadata'] === 'undefined') {
            prototype['sharedMetadata'] = {};
        }
        if (typeof prototype['sharedMetadata']['features'] === 'undefined') {
            prototype['sharedMetadata']['features'] = {};
        }
        if (!prototype['sharedMetadata']['features'][feature.getFeatureName()]) {
            feature.attachPublicApi(prototype, bases, this);
            prototype['sharedMetadata']['features'][feature.getFeatureName()] = true;
        }
    }
}
exports.DriverBase = DriverBase;
