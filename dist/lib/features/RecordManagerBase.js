"use strict";
/// <reference path="../contracts/Driver.ts" />
/// <reference path="../definitions/model/IModel.ts" />
/// <reference path="../definitions/features/IRecordManager.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
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
    attachPublicApi(prototype, bases, driver) {
        const knownAttributes = this.buildKnownAttributes(prototype, bases);
        const dynamicAttributes = this.buildDynamicAttributes(prototype, bases);
        Object.defineProperties(prototype['sharedMetadata'], {
            knownAttributes: {
                value: knownAttributes,
                writable: false,
                configurable: true
            },
            dynamicAttributes: {
                value: dynamicAttributes,
                writable: false,
                configurable: true
            }
        });
        this.bindAccessorsAndMutators(prototype, dynamicAttributes);
    }
    buildKnownAttributes(prototype, bases) {
        return functions_1.array_unique(['knownAttributes', 'dynamicAttributes', 'attributes', 'classSettings', 'driver'], ['relationDataBucket', 'relationsMap', 'relations'], ['eventEmitter'], ['fillable', 'guarded'], ['visible', 'hidden'], ['timestamps'], ['softDeletes'], Object.getOwnPropertyNames(prototype), ...bases.map(base => Object.getOwnPropertyNames(base)));
    }
    buildDynamicAttributes(prototype, bases) {
        const dynamicAttributes = {};
        this.findGettersAndSetters(dynamicAttributes, prototype);
        this.findAccessorsAndMutators(dynamicAttributes, prototype);
        bases.forEach(basePrototype => {
            this.findGettersAndSetters(dynamicAttributes, basePrototype);
            this.findAccessorsAndMutators(dynamicAttributes, basePrototype);
        });
        return dynamicAttributes;
    }
    findGettersAndSetters(dynamicAttributes, prototype) {
        const descriptors = Object.getOwnPropertyDescriptors(prototype);
        for (const property in descriptors) {
            if (property === '__proto__') {
                continue;
            }
            const getter = lodash_1.isFunction(descriptors[property].get);
            const setter = lodash_1.isFunction(descriptors[property].set);
            if (!getter && !setter) {
                continue;
            }
            this.createDynamicAttributeIfNeeded(dynamicAttributes, property);
            dynamicAttributes[property].getter = getter;
            dynamicAttributes[property].setter = setter;
        }
    }
    createDynamicAttributeIfNeeded(bucket, property) {
        if (!bucket[property]) {
            bucket[property] = {
                name: property,
                getter: false,
                setter: false
            };
        }
    }
    findAccessorsAndMutators(bucket, prototype) {
        const names = Object.getOwnPropertyNames(prototype);
        const regex = new RegExp('^(get|set)([a-zA-z0-9_\\-]{1,})Attribute$', 'g');
        names.forEach(name => {
            let match;
            while ((match = regex.exec(name)) != undefined) {
                // javascript RegExp has a bug when the match has length 0
                // if (match.index === regex.lastIndex) {
                //   ++regex.lastIndex
                // }
                const property = this.formatAttributeName(match[2]);
                this.createDynamicAttributeIfNeeded(bucket, property);
                if (match[1] === 'get') {
                    bucket[property].accessor = match[0];
                }
                else {
                    bucket[property].mutator = match[0];
                }
            }
        });
    }
    bindAccessorsAndMutators(prototype, dynamicAttributes) {
        for (const name in dynamicAttributes) {
            const descriptor = this.makeAccessorAndMutatorDescriptor(prototype, name, dynamicAttributes[name]);
            if (descriptor) {
                Object.defineProperty(prototype, name, descriptor);
            }
        }
    }
    makeAccessorAndMutatorDescriptor(prototype, name, settings) {
        // does nothing if there is a setter and a getter in there
        if (settings.getter && settings.setter) {
            return undefined;
        }
        const descriptor = Object.getOwnPropertyDescriptor(prototype, name) || { configurable: true };
        if (settings.accessor && !descriptor.get) {
            descriptor.get = function () {
                return this[this['sharedMetadata']['dynamicAttributes'][name].accessor].call(this);
            };
        }
        if (settings.mutator && !descriptor.set) {
            descriptor.set = function (value) {
                this[this['sharedMetadata']['dynamicAttributes'][name].mutator].call(this, value);
            };
        }
        return descriptor;
    }
}
exports.RecordManagerBase = RecordManagerBase;
