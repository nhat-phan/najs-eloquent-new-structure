"use strict";
/// <reference path="../contracts/Driver.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const najs_binding_1 = require("najs-binding");
const constants_1 = require("../constants");
class DummyDriver {
    getClassName() {
        return constants_1.NajsEloquent.Driver.DummyDriver;
    }
    initialize(data) {
        this.attributes = data || {};
    }
    getRecord() {
        return this.attributes;
    }
    getAttribute(name) {
        return this.attributes[name];
    }
    setAttribute(name, value) {
        this.attributes[name] = value;
        return true;
    }
    getPrimaryKeyName() {
        return 'id';
    }
    toObject() {
        return this.attributes;
    }
    newQuery() {
        return {};
    }
    async delete(softDeletes) {
        return true;
    }
    async restore() {
        return true;
    }
    async save() {
        return true;
    }
    markModified(name) { }
    getModelComponentName() {
        return undefined;
    }
    getModelComponentOrder(components) {
        return components;
    }
}
DummyDriver.className = constants_1.NajsEloquent.Driver.DummyDriver;
exports.DummyDriver = DummyDriver;
najs_binding_1.register(DummyDriver);
