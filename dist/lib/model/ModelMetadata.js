"use strict";
/// <reference path="interfaces/IModel.ts" />
/// <reference path="interfaces/IEloquent.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const najs_binding_1 = require("najs-binding");
class ModelMetadata {
    constructor(model) {
        this.model = model;
        this.definition = Object.getPrototypeOf(model).constructor;
    }
    getSetting(property, merger) {
        return merger(this.definition[property] ? this.definition[property] : undefined, this.model[property] ? this.model[property] : undefined);
    }
    static arrayUnique(staticVersion, memberVersion) {
        let result = [];
        if (staticVersion) {
            result = result.concat(staticVersion);
        }
        if (memberVersion) {
            result = result.concat(memberVersion);
        }
        return Array.from(new Set(result));
    }
    static get(model, cache = true) {
        const className = model.getClassName();
        if (!this.cached[className] || !cache) {
            this.cached[className] = new ModelMetadata(najs_binding_1.make(className, ['do-not-initialize']));
        }
        return this.cached[className];
    }
}
/**
 * store ModelMetadata instance with "sample" model
 */
ModelMetadata.cached = {};
exports.ModelMetadata = ModelMetadata;
