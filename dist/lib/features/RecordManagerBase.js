"use strict";
/// <reference path="../contracts/Driver.ts" />
/// <reference path="../definitions/model/IModel.ts" />
/// <reference path="../definitions/features/IRecordManager.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const functions_1 = require("../util/functions");
/**
 * Base class of all RecordManager, handling:
 *   - getKnownAttributes() and getDynamicAttributes() accessors
 *   - finding accessors/mutators and getters/setters of model
 */
class RecordManagerBase {
    getKnownAttributes(model) {
        return model['sharedMetadata']['knownAttributes'];
    }
    getDynamicAttributes(model) {
        return model['sharedMetadata']['dynamicAttributes'];
    }
    attachPublicApi(prototype, bases, driver) { }
    buildKnownAttributes(prototype, bases) {
        return functions_1.array_unique(['knownAttributes', 'dynamicAttributes', 'attributes', 'settings', 'driver'], ['relationDataBucket', 'relationsMap', 'relations'], ['eventEmitter'], ['fillable', 'guarded'], ['visible', 'hidden'], ['timestamps'], ['softDeletes'], Object.getOwnPropertyNames(prototype), ...bases.map(base => Object.getOwnPropertyNames(base)));
    }
}
exports.RecordManagerBase = RecordManagerBase;
