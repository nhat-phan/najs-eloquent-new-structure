"use strict";
/// <reference path="../../contracts/Component.ts" />
/// <reference path="../interfaces/IModel.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const najs_binding_1 = require("najs-binding");
const constants_1 = require("../../constants");
const ModelUtilities_1 = require("../../util/ModelUtilities");
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
    static getFillable() {
        return ModelUtilities_1.ModelUtilities.readArrayUniqueSetting(this, 'fillable', []);
    }
    static getGuarded() {
        return ModelUtilities_1.ModelUtilities.readArrayUniqueSetting(this, 'guarded', ['*']);
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
        return ModelUtilities_1.ModelUtilities.isFillable(this, key);
    }
    static isGuarded(key) {
        return ModelUtilities_1.ModelUtilities.isInBlackList(key, this.getGuarded());
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
ModelFillable.className = constants_1.NajsEloquent.Model.Component.ModelFillable;
exports.ModelFillable = ModelFillable;
najs_binding_1.register(ModelFillable);
