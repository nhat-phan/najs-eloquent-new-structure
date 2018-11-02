"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SerializationPublicApi = {
    getVisible() {
        return this.driver.getSerializationFeature().getVisible(this);
    },
    getHidden() {
        return this.driver.getSerializationFeature().getHidden(this);
    },
    markVisible() {
        this.driver.getSerializationFeature().markVisible(this, arguments);
        return this;
    },
    markHidden() {
        this.driver.getSerializationFeature().markHidden(this, arguments);
        return this;
    },
    isVisible() {
        return this.driver.getSerializationFeature().isVisible(this, arguments);
    },
    isHidden() {
        return this.driver.getSerializationFeature().isHidden(this, arguments);
    },
    attributesToObject() {
        return this.driver.getSerializationFeature().attributesToObject(this);
    },
    attributesToArray() {
        return this.attributesToObject();
    },
    toObject() {
        return this.driver.getSerializationFeature().toObject(this);
    },
    toJson(replacer, space) {
        return this.driver.getSerializationFeature().toJson(this, replacer, space);
    }
};
