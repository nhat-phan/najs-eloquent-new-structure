"use strict";
/// <reference path="../contracts/Driver.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const ClassSetting_1 = require("../util/ClassSetting");
const functions_1 = require("../util/functions");
/**
 * Base class of all drivers, handling:
 *   - generic initialize for makeModel()
 *   - attachPublicApi logic, ensure that the model prototype should be attached 1 time only.
 */
class DriverBase {
    constructor() {
        this.attachedModels = {};
    }
    makeModel(model, data, isGuarded) {
        if (data === ClassSetting_1.CREATE_SAMPLE) {
            return model;
        }
        this.getRecordManager().initialize(model, !!isGuarded, data);
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
        return this.attachPublicApi(prototype, bases);
    }
    attachPublicApi(prototype, bases) {
        // prettier-ignore
        this
            .attachFeatureIfNeeded(this.getFillableFeature(), prototype, bases)
            .attachFeatureIfNeeded(this.getSettingFeature(), prototype, bases);
        // RecordManager must be attached after other features
        this.attachFeatureIfNeeded(this.getRecordManager(), prototype, bases);
    }
    attachFeatureIfNeeded(feature, prototype, bases) {
        if (typeof prototype['sharedMetadata'] === 'undefined') {
            prototype['sharedMetadata'] = {};
        }
        if (typeof prototype['sharedMetadata']['features'] === 'undefined') {
            prototype['sharedMetadata']['features'] = {};
        }
        if (typeof prototype['sharedMetadata']['features'][feature.getFeatureName()]) {
            feature.attachPublicApi(prototype, bases, this);
            prototype['sharedMetadata']['features'][feature.getFeatureName()] = true;
        }
        return this;
    }
}
exports.DriverBase = DriverBase;
