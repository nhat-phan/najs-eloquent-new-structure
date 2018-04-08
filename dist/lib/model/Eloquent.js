"use strict";
/// <reference path="interfaces/IEloquent.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const najs_binding_1 = require("najs-binding");
function eloquent(data) {
    if (!najs_binding_1.ClassRegistry.has(this.getClassName())) {
        najs_binding_1.register(Object.getPrototypeOf(this).constructor, this.getClassName(), false);
    }
    if (data !== 'do-not-initialize') {
    }
}
exports.Eloquent = eloquent;
