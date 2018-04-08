"use strict";
/// <reference path="../../contracts/ModelComponent.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const najs_binding_1 = require("najs-binding");
const in_array_1 = require("../../util/in_array");
const constants_1 = require("../../constants");
const VARIABLES = ['fillable', 'guarded'];
const METHODS = ['fill', 'forceFill'];
class Fillable {
    getClassName() {
        return constants_1.NajsEloquent.Model.Component.Fillable;
    }
    isGetter(key, model) {
        return in_array_1.in_array(key, VARIABLES, METHODS);
    }
    proxifyGetter(model, key) { }
    isSetter(key, value, model) {
        return false;
    }
    proxifySetter(model, key, value) {
        return true;
    }
}
exports.Fillable = Fillable;
najs_binding_1.register(Fillable);
