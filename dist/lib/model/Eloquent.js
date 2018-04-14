"use strict";
/// <reference path="interfaces/IEloquent.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const ClassSetting_1 = require("../util/ClassSetting");
const najs_binding_1 = require("najs-binding");
const EloquentDriverProviderFacade_1 = require("../facades/global/EloquentDriverProviderFacade");
const EloquentComponentProviderFacade_1 = require("../facades/global/EloquentComponentProviderFacade");
function eloquent(data) {
    const definition = Object.getPrototypeOf(this).constructor;
    const className = najs_binding_1.getClassName(definition);
    if (!najs_binding_1.ClassRegistry.has(className)) {
        najs_binding_1.register(definition);
    }
    if (data !== ClassSetting_1.CREATE_SAMPLE) {
        const driver = EloquentDriverProviderFacade_1.EloquentDriverProvider.create(this);
        return EloquentComponentProviderFacade_1.EloquentComponentProvider.extend(this, driver);
    }
}
exports.Eloquent = eloquent;
