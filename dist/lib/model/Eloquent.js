"use strict";
/// <reference path="interfaces/IEloquent.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const ClassSetting_1 = require("../util/ClassSetting");
const najs_binding_1 = require("najs-binding");
const EloquentDriverProviderFacade_1 = require("../facades/global/EloquentDriverProviderFacade");
const EloquentComponentProviderFacade_1 = require("../facades/global/EloquentComponentProviderFacade");
function EloquentClass(data) {
    const className = najs_binding_1.getClassName(this);
    if (!najs_binding_1.ClassRegistry.has(className)) {
        najs_binding_1.register(Object.getPrototypeOf(this).constructor, className);
    }
    if (data !== ClassSetting_1.CREATE_SAMPLE) {
        const driver = EloquentDriverProviderFacade_1.EloquentDriverProvider.create(this);
        return EloquentComponentProviderFacade_1.EloquentComponentProvider.extend(this, driver);
    }
}
exports.Eloquent = EloquentClass;
