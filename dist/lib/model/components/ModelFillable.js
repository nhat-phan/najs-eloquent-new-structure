"use strict";
/// <reference path="../../contracts/Component.ts" />
/// <reference path="../interfaces/IModel.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../constants");
const najs_binding_1 = require("najs-binding");
const lodash_1 = require("lodash");
class ModelFillable {
    getClassName() {
        return constants_1.NajsEloquent.Model.Component.ModelFillable;
    }
    extend(prototype, bases, driver) {
        prototype['getFillable'] = ModelFillable.getFillable;
        prototype['getGuarded'] = ModelFillable.getGuarded;
        prototype['markFillable'] = ModelFillable.markFillable;
        prototype['markGuarded'] = ModelFillable.markGuarded;
        prototype['isFillable'] = ModelFillable.isFillable;
        prototype['isGuarded'] = ModelFillable.isGuarded;
        prototype['fill'] = ModelFillable.fill;
        prototype['forceFill'] = ModelFillable.forceFill;
    }
    static markFillable() {
        this['settings']['pushToUniqueArraySetting']('fillable', arguments);
        return this;
    }
    static markGuarded() {
        this['settings']['pushToUniqueArraySetting']('guarded', arguments);
        return this;
    }
    static isFillable(key) {
        return this['settings']['isInWhiteList'](key, this.getFillable(), this.getGuarded());
    }
    static isGuarded(key) {
        return this['settings']['isInBlackList'](key, this.getGuarded());
    }
    static fill(data) {
        const fillable = this.getFillable();
        const guarded = this.getGuarded();
        const attributes = fillable.length > 0 ? lodash_1.pick(data, fillable) : data;
        for (const key in attributes) {
            if (this['settings']['isInWhiteList'](key, fillable, guarded)) {
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
ModelFillable.className = constants_1.NajsEloquent.Model.Component.ModelFillable;
ModelFillable.getFillable = function () {
    return this.getArrayUniqueSetting('fillable', []);
};
ModelFillable.getGuarded = function () {
    return this.getArrayUniqueSetting('guarded', ['*']);
};
exports.ModelFillable = ModelFillable;
najs_binding_1.register(ModelFillable);
