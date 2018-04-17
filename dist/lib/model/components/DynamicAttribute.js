"use strict";
/// <reference path="../../contracts/Component.ts" />
/// <reference path="../interfaces/IModel.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../constants");
const functions_1 = require("../../util/functions");
class DynamicAttribute {
    getClassName() {
        return constants_1.NajsEloquent.Model.Component.Attribute;
    }
    extend(prototype, eloquentPrototype) {
        prototype['hasAttribute'] = DynamicAttribute.hasAttribute;
    }
    static hasAttribute(key) {
        if (typeof this['knownAttributes'] === 'undefined') {
            DynamicAttribute.buildKnownAttributes(this);
        }
        if (this['knownAttributes'].indexOf(key) !== -1) {
            return true;
        }
        return this['driver'].hasAttribute(key);
    }
    static buildKnownAttributes(model) {
        model['knownAttributes'] = functions_1.array_unique(Object.getOwnPropertyNames(model), Object.getOwnPropertyNames(Object.getPrototypeOf(model)));
    }
}
exports.DynamicAttribute = DynamicAttribute;
