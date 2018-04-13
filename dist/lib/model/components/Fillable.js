"use strict";
/// <reference path="../../contracts/Component.ts" />
/// <reference path="../interfaces/IModel.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const najs_binding_1 = require("najs-binding");
const constants_1 = require("../../constants");
const ClassSetting_1 = require("../../util/ClassSetting");
const SettingType_1 = require("../../util/SettingType");
class Fillable {
    // prettier-ignore
    "constructor"(model, driver) {
        this.model = model;
        this.driver = driver;
    }
    getClassName() {
        return constants_1.NajsEloquent.Model.Component.Fillable;
    }
    extend(prototype) { }
    getFillable() {
        return ClassSetting_1.ClassSetting.of(this).read('fillable', SettingType_1.SettingType.arrayUnique([], []));
    }
}
exports.Fillable = Fillable;
najs_binding_1.register(Fillable);
