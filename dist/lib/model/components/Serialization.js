"use strict";
/// <reference path="../../contracts/Component.ts" />
/// <reference path="../interfaces/IModel.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const najs_binding_1 = require("najs-binding");
const constants_1 = require("../../constants");
const ClassSetting_1 = require("../../util/ClassSetting");
const SettingType_1 = require("../../util/SettingType");
const ModelUtilities_1 = require("../../util/ModelUtilities");
class Serialization {
    getClassName() {
        return constants_1.NajsEloquent.Model.Component.Serialization;
    }
    extend(prototype, bases, driver) {
        prototype['getVisible'] = Serialization.getVisible;
        prototype['getHidden'] = Serialization.getHidden;
        prototype['markVisible'] = Serialization.markVisible;
        prototype['markHidden'] = Serialization.markHidden;
        prototype['isVisible'] = Serialization.isVisible;
        prototype['isHidden'] = Serialization.isHidden;
        prototype['toObject'] = Serialization.toObject;
        prototype['toJSON'] = Serialization.toJSON;
        prototype['toJson'] = Serialization.toJSON;
    }
    static getVisible() {
        return ClassSetting_1.ClassSetting.of(this).read('visible', SettingType_1.SettingType.arrayUnique([], []));
    }
    static getHidden() {
        return ClassSetting_1.ClassSetting.of(this).read('hidden', SettingType_1.SettingType.arrayUnique([], []));
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
        return ModelUtilities_1.ModelUtilities.isInWhiteList(this, key, this.getVisible(), this.getHidden());
    }
    static isHidden(key) {
        return ModelUtilities_1.ModelUtilities.isInBlackList(this, key, this.getHidden());
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
exports.Serialization = Serialization;
najs_binding_1.register(Serialization);
