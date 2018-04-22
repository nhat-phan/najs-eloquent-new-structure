"use strict";
/// <reference path="../../contracts/Component.ts" />
/// <reference path="../interfaces/IModel.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../constants");
const ClassSetting_1 = require("../../util/ClassSetting");
class ModelTimestamps {
    getClassName() {
        return constants_1.NajsEloquent.Model.Component.ModelTimestamps;
    }
    extend(prototype, bases, driver) {
        prototype['touch'] = ModelTimestamps.touch;
        prototype['hasTimestamps'] = ModelTimestamps.hasTimestamps;
        prototype['getTimestampsSetting'] = ModelTimestamps.getTimestampsSetting;
    }
    static hasTimestamps() {
        return ClassSetting_1.ClassSetting.of(this).read('timestamps', function (staticVersion, sample) {
            return typeof staticVersion !== 'undefined' || typeof sample !== 'undefined';
        });
    }
    static getTimestampsSetting() { }
    static touch() {
        if (this.hasTimestamps()) {
            const settings = this.getTimestampsSetting();
            if (settings) {
                this['driver'].markModified(settings.updatedAt);
            }
        }
        return this;
    }
}
ModelTimestamps.className = constants_1.NajsEloquent.Model.Component.ModelTimestamps;
exports.ModelTimestamps = ModelTimestamps;
