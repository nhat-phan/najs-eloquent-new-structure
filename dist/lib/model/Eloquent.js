"use strict";
/// <reference path="interfaces/IEloquent.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const ClassSetting_1 = require("../util/ClassSetting");
const najs_binding_1 = require("najs-binding");
// import { EloquentDriverProvider } from '../facades/global/EloquentDriverProviderFacade'
// import { EloquentComponentProvider } from '../facades/global/EloquentComponentProviderFacade'
// import { Fillable } from './components/Fillable'
function eloquent(data) {
    if (!najs_binding_1.ClassRegistry.has(this.getClassName())) {
        najs_binding_1.register(Object.getPrototypeOf(this).constructor, this.getClassName(), false);
    }
    if (data !== ClassSetting_1.CREATE_SAMPLE) {
        // return EloquentComponentProvider.proxify(this, EloquentDriverProvider.create(this))
    }
}
// eloquent.prototype = Object.assign({}, Fillable)
exports.Eloquent = eloquent;
