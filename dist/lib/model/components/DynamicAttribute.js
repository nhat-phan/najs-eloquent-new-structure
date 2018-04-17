"use strict";
/// <reference path="../../contracts/Component.ts" />
/// <reference path="../interfaces/IModel.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../constants");
const functions_1 = require("../../util/functions");
const lodash_1 = require("lodash");
class DynamicAttribute {
    getClassName() {
        return constants_1.NajsEloquent.Model.Component.DynamicAttribute;
    }
    extend(prototype, bases, driver) {
        prototype['hasAttribute'] = DynamicAttribute.hasAttribute;
        Object.defineProperties(prototype, {
            knownAttributes: {
                value: DynamicAttribute.buildKnownAttributes(prototype, bases),
                writable: false
            },
            dynamicAttributes: {
                value: DynamicAttribute.buildDynamicAttributes(prototype, bases, driver),
                writable: false
            }
        });
    }
    static hasAttribute(key) {
        return this['knownAttributes'].indexOf(key) !== -1 || this['driver'].hasAttribute(key);
    }
    static buildDynamicAttributes(prototype, bases, driver) {
        const dynamicAttributes = {};
        this.findGettersAndSetters(dynamicAttributes, prototype);
        this.findAccessorsAndMutators(dynamicAttributes, prototype, driver);
        bases.forEach(basePrototype => {
            this.findGettersAndSetters(dynamicAttributes, basePrototype);
            this.findAccessorsAndMutators(dynamicAttributes, basePrototype, driver);
        });
        return dynamicAttributes;
    }
    static findGettersAndSetters(dynamicAttributes, prototype) {
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
    static findAccessorsAndMutators(bucket, prototype, driver) {
        const names = Object.getOwnPropertyNames(prototype);
        const regex = new RegExp('^(get|set)([a-zA-z0-9_\\-]{1,})Attribute$', 'g');
        names.forEach(name => {
            let match;
            while ((match = regex.exec(name)) != undefined) {
                // javascript RegExp has a bug when the match has length 0
                // if (match.index === regex.lastIndex) {
                //   ++regex.lastIndex
                // }
                const property = driver.formatAttributeName(match[2]);
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
    static createDynamicAttributeIfNeeded(bucket, property) {
        if (!bucket[property]) {
            bucket[property] = {
                name: property,
                getter: false,
                setter: false
            };
        }
    }
    static buildKnownAttributes(prototype, bases) {
        return functions_1.array_unique(['knownAttributes', 'dynamicAttributes'], ['fillable', 'guarded'], ['visible', 'hidden'], ['timestamps'], ['softDeletes'], Object.getOwnPropertyNames(prototype), ...bases.map(base => Object.getOwnPropertyNames(base)));
    }
}
exports.DynamicAttribute = DynamicAttribute;
