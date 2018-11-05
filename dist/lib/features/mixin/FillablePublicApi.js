"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FillablePublicApi = {
    getFillable() {
        return this.driver.getFillableFeature().getFillable(this);
    },
    getGuarded() {
        return this.driver.getFillableFeature().getGuarded(this);
    },
    isFillable() {
        return this.driver.getFillableFeature().isFillable(this, arguments);
    },
    addFillable() {
        this.driver.getFillableFeature().addFillable(this, arguments);
        return this;
    },
    addGuarded() {
        this.driver.getFillableFeature().addGuarded(this, arguments);
        return this;
    },
    isGuarded() {
        return this.driver.getFillableFeature().isGuarded(this, arguments);
    },
    fill(data) {
        this.driver.getFillableFeature().fill(this, data);
        return this;
    },
    forceFill(data) {
        this.driver.getFillableFeature().forceFill(this, data);
        return this;
    }
};
