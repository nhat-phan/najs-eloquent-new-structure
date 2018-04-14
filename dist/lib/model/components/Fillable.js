"use strict";
/// <reference path="../../contracts/Component.ts" />
/// <reference path="../interfaces/IModel.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const najs_binding_1 = require("najs-binding");
const constants_1 = require("../../constants");
const ClassSetting_1 = require("../../util/ClassSetting");
const SettingType_1 = require("../../util/SettingType");
const ModelUtilities_1 = require("../../util/ModelUtilities");
class Fillable {
    // prettier-ignore
    "constructor"(model, driver) {
        this.model = model;
        this.driver = driver;
    }
    getClassName() {
        return constants_1.NajsEloquent.Model.Component.Fillable;
    }
    extend(prototype) {
        prototype['getFillable'] = Fillable.getFillable;
        prototype['getGuarded'] = Fillable.getGuarded;
        prototype['markFillable'] = Fillable.markFillable;
        prototype['markGuarded'] = Fillable.markGuarded;
    }
    static getFillable() {
        return ClassSetting_1.ClassSetting.of(this).read('fillable', SettingType_1.SettingType.arrayUnique([], []));
    }
    static getGuarded() {
        return ClassSetting_1.ClassSetting.of(this).read('guarded', SettingType_1.SettingType.arrayUnique([], ['*']));
    }
    static markFillable() {
        ModelUtilities_1.ModelUtilities.pushToUniqueArraySetting(this, 'fillable', arguments);
        return this;
    }
    static markGuarded() {
        ModelUtilities_1.ModelUtilities.pushToUniqueArraySetting(this, 'guarded', arguments);
        return this;
    }
}
exports.Fillable = Fillable;
najs_binding_1.register(Fillable);
