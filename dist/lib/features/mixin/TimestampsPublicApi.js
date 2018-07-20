"use strict";
/// <reference path="../../definitions/model/IModel.ts" />
/// <reference path="../../definitions/model/IModelTimestamps.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimestampsPublicApi = {
    touch() {
        this['driver'].getTimestampsFeature().touch(this);
        return this;
    }
};
