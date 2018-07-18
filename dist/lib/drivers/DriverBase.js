"use strict";
/// <reference types="najs-event" />
/// <reference path="../contracts/Driver.ts" />
/// <reference path="../definitions/features/ISettingFeature.ts" />
/// <reference path="../definitions/features/IEventFeature.ts" />
/// <reference path="../definitions/features/IFillableFeature.ts" />
/// <reference path="../definitions/features/ISerializationFeature.ts" />
/// <reference path="../definitions/features/ITimestampsFeature.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
require("../features/SettingFeature");
require("../features/EventFeature");
require("../features/FillableFeature");
require("../features/SerializationFeature");
require("../features/TimestampsFeature");
require("../features/SoftDeletesFeature");
const najs_binding_1 = require("najs-binding");
const najs_event_1 = require("najs-event");
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
        this.settingFeature = najs_binding_1.make(constants_1.NajsEloquent.Feature.SettingFeature);
        this.eventFeature = najs_binding_1.make(constants_1.NajsEloquent.Feature.EventFeature);
        this.fillableFeature = najs_binding_1.make(constants_1.NajsEloquent.Feature.FillableFeature);
        this.serializationFeature = najs_binding_1.make(constants_1.NajsEloquent.Feature.SerializationFeature);
        this.timestampsFeature = najs_binding_1.make(constants_1.NajsEloquent.Feature.TimestampsFeature);
        this.softDeletesFeature = najs_binding_1.make(constants_1.NajsEloquent.Feature.SoftDeletesFeature);
        if (typeof DriverBase.globalEventEmitter === 'undefined') {
            DriverBase.globalEventEmitter = najs_event_1.EventEmitterFactory.create(true);
        }
    }
    getSettingFeature() {
        return this.settingFeature;
    }
    getEventFeature() {
        return this.eventFeature;
    }
    getFillableFeature() {
        return this.fillableFeature;
    }
    getSerializationFeature() {
        return this.serializationFeature;
    }
    getTimestampsFeature() {
        return this.timestampsFeature;
    }
    getSoftDeletesFeature() {
        return this.softDeletesFeature;
    }
    getGlobalEventEmitter() {
        return DriverBase.globalEventEmitter;
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
        return [
            this.getSettingFeature(),
            this.getEventFeature(),
            this.getFillableFeature(),
            this.getSerializationFeature(),
            this.getTimestampsFeature(),
            this.getSoftDeletesFeature()
        ];
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
