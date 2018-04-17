"use strict";
/// <reference path="../../contracts/Component.ts" />
/// <reference path="../interfaces/IModel.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const najs_binding_1 = require("najs-binding");
const constants_1 = require("../../constants");
const ClassSetting_1 = require("../../util/ClassSetting");
const SettingType_1 = require("../../util/SettingType");
const ModelUtilities_1 = require("../../util/ModelUtilities");
const lodash_1 = require("lodash");
class Fillable {
    getClassName() {
        return constants_1.NajsEloquent.Model.Component.Fillable;
    }
    extend(prototype, eloquentPrototype) {
        prototype['getFillable'] = Fillable.getFillable;
        prototype['getGuarded'] = Fillable.getGuarded;
        prototype['markFillable'] = Fillable.markFillable;
        prototype['markGuarded'] = Fillable.markGuarded;
        prototype['isFillable'] = Fillable.isFillable;
        prototype['isGuarded'] = Fillable.isGuarded;
        prototype['fill'] = Fillable.fill;
        prototype['forceFill'] = Fillable.forceFill;
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
    static isFillable(key) {
        return ModelUtilities_1.ModelUtilities.isInWhiteList(this, key, this.getFillable(), this.getGuarded());
    }
    static isGuarded(key) {
        return ModelUtilities_1.ModelUtilities.isInBlackList(this, key, this.getGuarded());
    }
    static fill(data) {
        const fillable = this.getFillable();
        const guarded = this.getGuarded();
        const attributes = fillable.length > 0 ? lodash_1.pick(data, fillable) : data;
        for (const key in attributes) {
            if (ModelUtilities_1.ModelUtilities.isInWhiteList(this, key, fillable, guarded)) {
                this.setAttribute(key, attributes[key]);
            }
        }
        return this;
    }
    static forceFill(data) {
        for (const key in data) {
            this.setAttribute(key, data[key]);
        }
        return this;
    }
}
exports.Fillable = Fillable;
najs_binding_1.register(Fillable);
