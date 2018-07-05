"use strict";
/// <reference path="../definitions/model/IModel.ts" />
/// <reference path="../definitions/model/IModelSerialization.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
exports.SerializationPublicApi = {
    getVisible() {
        return this['driver'].getSerializationFeature().getVisible(this);
    },
    getHidden() {
        return this['driver'].getSerializationFeature().getHidden(this);
    },
    markVisible() {
        this['driver'].getSerializationFeature().markVisible(this, arguments);
        return this;
    },
    markHidden() {
        this['driver'].getSerializationFeature().markHidden(this, arguments);
        return this;
    },
    isVisible() {
        return this['driver'].getSerializationFeature().isVisible(this, arguments);
    },
    isHidden() {
        return this['driver'].getSerializationFeature().isHidden(this, arguments);
    },
    toObject() {
        return this['driver'].getSerializationFeature().toObject(this);
    },
    toJSON() {
        return this['driver'].getSerializationFeature().toJson(this);
    },
    toJson() {
        return this['driver'].getSerializationFeature().toJson(this);
    }
};
