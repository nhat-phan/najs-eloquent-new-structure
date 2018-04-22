"use strict";
/// <reference path="../../contracts/Component.ts" />
/// <reference path="../interfaces/IModel.ts" />
/// <reference path="../interfaces/IModelSetting.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const najs_binding_1 = require("najs-binding");
const constants_1 = require("../../constants");
class ModelSerialization {
    getClassName() {
        return constants_1.NajsEloquent.Model.Component.ModelSerialization;
    }
    extend(prototype, bases, driver) {
        prototype['getVisible'] = ModelSerialization.getVisible;
        prototype['getHidden'] = ModelSerialization.getHidden;
        prototype['markVisible'] = ModelSerialization.markVisible;
        prototype['markHidden'] = ModelSerialization.markHidden;
        prototype['isVisible'] = ModelSerialization.isVisible;
        prototype['isHidden'] = ModelSerialization.isHidden;
        prototype['toObject'] = ModelSerialization.toObject;
        prototype['toJSON'] = ModelSerialization.toJSON;
        prototype['toJson'] = ModelSerialization.toJSON;
    }
    static getVisible() {
        return this.getArrayUniqueSetting('visible', []);
    }
    static getHidden() {
        return this.getArrayUniqueSetting('hidden', []);
    }
    static markVisible() {
        this['settings']['pushToUniqueArraySetting']('visible', arguments);
        return this;
    }
    static markHidden() {
        this['settings']['pushToUniqueArraySetting']('hidden', arguments);
        return this;
    }
    static isVisible(key) {
        return this['settings']['isInWhiteList'](key, this.getVisible(), this.getHidden());
    }
    static isHidden(key) {
        return this['settings']['isInBlackList'](key, this.getHidden());
    }
    static toObject(data) {
        return this['driver'].toObject();
    }
    static toJSON() {
        const data = this.toObject(), visible = this.getVisible(), hidden = this.getHidden();
        return Object.getOwnPropertyNames(data).reduce((memo, name) => {
            if (this['settings']['isInWhiteList'](name, visible, hidden)) {
                memo[name] = data[name];
            }
            return memo;
        }, {});
    }
}
ModelSerialization.className = constants_1.NajsEloquent.Model.Component.ModelSerialization;
exports.ModelSerialization = ModelSerialization;
najs_binding_1.register(ModelSerialization);
