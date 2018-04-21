"use strict";
/// <reference path="../../contracts/Component.ts" />
/// <reference path="../interfaces/IModel.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const najs_binding_1 = require("najs-binding");
const constants_1 = require("../../constants");
const ModelUtilities_1 = require("../../util/ModelUtilities");
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
        return ModelUtilities_1.ModelUtilities.readArrayUniqueSetting(this, 'visible', []);
    }
    static getHidden() {
        return ModelUtilities_1.ModelUtilities.readArrayUniqueSetting(this, 'hidden', []);
    }
    static markVisible() {
        ModelUtilities_1.ModelUtilities.pushToUniqueArraySetting(this, 'visible', arguments);
        return this;
    }
    static markHidden() {
        ModelUtilities_1.ModelUtilities.pushToUniqueArraySetting(this, 'hidden', arguments);
        return this;
    }
    static isVisible(key) {
        return ModelUtilities_1.ModelUtilities.isVisible(this, key);
    }
    static isHidden(key) {
        return ModelUtilities_1.ModelUtilities.isInBlackList(key, this.getHidden());
    }
    static toObject(data) {
        return this['driver'].toObject();
    }
    static toJSON() {
        const data = this.toObject(), visible = this.getVisible(), hidden = this.getHidden();
        return Object.getOwnPropertyNames(data).reduce((memo, name) => {
            if (ModelUtilities_1.ModelUtilities.isInWhiteList(this, name, visible, hidden)) {
                memo[name] = data[name];
            }
            return memo;
        }, {});
    }
}
ModelSerialization.className = constants_1.NajsEloquent.Model.Component.ModelSerialization;
exports.ModelSerialization = ModelSerialization;
najs_binding_1.register(ModelSerialization);
