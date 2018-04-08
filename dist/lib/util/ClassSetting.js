"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const najs_binding_1 = require("najs-binding");
exports.CREATE_SAMPLE = 'create-sample';
class ClassSetting {
    constructor(model) {
        this.model = model;
        this.definition = Object.getPrototypeOf(model).constructor;
    }
    read(property, merger) {
        return merger(this.definition[property] ? this.definition[property] : undefined, this.model[property] ? this.model[property] : undefined);
    }
    static arrayUnique(initializeValue, defaultValue) {
        return function (staticVersion, memberVersion) {
            if (!staticVersion && !memberVersion) {
                return defaultValue;
            }
            const values = initializeValue
                .concat(staticVersion ? staticVersion : [])
                .concat(memberVersion ? memberVersion : []);
            const result = Array.from(new Set(values));
            if (result.length === 0) {
                return defaultValue;
            }
            return result;
        };
    }
    static of(model, cache = true) {
        const className = model.getClassName();
        if (!this.samples[className] || !cache) {
            this.samples[className] = new ClassSetting(najs_binding_1.make(className, [exports.CREATE_SAMPLE]));
        }
        return this.samples[className];
    }
}
/**
 * store ModelMetadata instance with "sample" model
 */
ClassSetting.samples = {};
exports.ClassSetting = ClassSetting;
ClassSetting.of({}).read('fillable', ClassSetting.arrayUnique([], []));
