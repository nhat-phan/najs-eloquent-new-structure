"use strict";
/// <reference path="../definitions/model/IModel.ts" />
/// <reference path="../definitions/features/ISettingFeature.ts" />
/// <reference path="../definitions/features/IRecordManager.ts" />
/// <reference path="../definitions/features/IRecordManager.ts" />
/// <reference path="../definitions/features/ISerializationFeature.ts" />
/// <reference path="../definitions/features/ITimestampsFeature.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
class FeatureBase {
    useSettingFeatureOf(model) {
        return model.getDriver().getSettingFeature();
    }
    useRecordManagerOf(model) {
        return model.getDriver().getRecordManager();
    }
    useFillableFeatureOf(model) {
        return model.getDriver().getFillableFeature();
    }
    useSerializationFeatureOf(model) {
        return model.getDriver().getSerializationFeature();
    }
    useTimestampsFeatureOf(model) {
        return model.getDriver().getTimestampsFeature();
    }
}
exports.FeatureBase = FeatureBase;
