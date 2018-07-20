"use strict";
/// <reference path="../../definitions/model/IModel.ts" />
/// <reference path="../../definitions/model/IModelFillable.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
exports.FillablePublicApi = {
    getFillable() {
        return this['driver'].getFillableFeature().getFillable(this);
    },
    getGuarded() {
        return this['driver'].getFillableFeature().getGuarded(this);
    },
    markFillable() {
        this['driver'].getFillableFeature().markFillable(this, arguments);
        return this;
    },
    markGuarded() {
        this['driver'].getFillableFeature().markGuarded(this, arguments);
        return this;
    },
    isFillable() {
        return this['driver'].getFillableFeature().isFillable(this, arguments);
    },
    isGuarded() {
        return this['driver'].getFillableFeature().isGuarded(this, arguments);
    },
    fill(data) {
        this['driver'].getFillableFeature().fill(this, data);
        return this;
    },
    forceFill(data) {
        this['driver'].getFillableFeature().forceFill(this, data);
        return this;
    }
};
