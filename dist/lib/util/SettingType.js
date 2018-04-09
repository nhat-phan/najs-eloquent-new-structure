"use strict";
/// <reference path="interfaces/ISettingReader.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
class SettingType {
    static arrayUnique(initializeValue, defaultValue) {
        return function (staticValue, sampleValue, instanceValue) {
            if (!sampleValue && !sampleValue) {
                return defaultValue;
            }
            const values = initializeValue
                .concat(staticValue ? staticValue : [])
                .concat(sampleValue ? sampleValue : [])
                .concat(instanceValue ? instanceValue : []);
            const result = Array.from(new Set(values));
            if (result.length === 0) {
                return defaultValue;
            }
            return result;
        };
    }
}
exports.SettingType = SettingType;
