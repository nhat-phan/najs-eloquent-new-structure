"use strict";
/// <reference path="../../contracts/Component.ts" />
/// <reference path="../interfaces/IModel.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const najs_binding_1 = require("najs-binding");
const in_array_1 = require("../../util/in_array");
const constants_1 = require("../../constants");
const ClassSetting_1 = require("../../util/ClassSetting");
const SettingType_1 = require("../../util/SettingType");
const VARIABLES = ['fillable', 'guarded'];
const METHODS = ['getFillable'];
class Fillable {
    // prettier-ignore
    "constructor"(model, driver) {
        this.model = model;
        this.driver = driver;
    }
    getClassName() {
        return constants_1.NajsEloquent.Model.Component.Fillable;
    }
    isGetter(key, model) {
        return in_array_1.in_array(key, VARIABLES, METHODS);
    }
    proxifyGetter(model, key) {
        if (in_array_1.in_array(key, VARIABLES)) {
            return model[key];
        }
        return this[key].bind(model);
    }
    isSetter(key, value, model) {
        return false;
    }
    proxifySetter(model, key, value) {
        return true;
    }
    getFillable() {
        return ClassSetting_1.ClassSetting.of(this).read('fillable', SettingType_1.SettingType.arrayUnique([], []));
    }
}
exports.Fillable = Fillable;
najs_binding_1.register(Fillable);
