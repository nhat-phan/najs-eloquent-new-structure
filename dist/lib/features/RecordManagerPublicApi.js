"use strict";
/// <reference path="../definitions/model/IModel.ts" />
/// <reference path="../definitions/model/IModelRecord.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecordManagerPublicApi = {
    getRecordName() {
        return this['driver'].getRecordManager().getRecordName(this);
    },
    getRecord() {
        return this['driver'].getRecordManager().getRecord(this);
    },
    formatAttributeName(name) {
        return this['driver'].getRecordManager().formatAttributeName(this, name);
    },
    getAttribute(key) {
        return this['driver'].getRecordManager().getAttribute(this, key);
    },
    setAttribute(key, value) {
        this['driver'].getRecordManager().setAttribute(this, key, value);
        return this;
    },
    hasAttribute(key) {
        return this['driver'].getRecordManager().hasAttribute(this, key);
    },
    getPrimaryKey() {
        return this['driver'].getRecordManager().getPrimaryKey(this);
    },
    setPrimaryKey(value) {
        this['driver'].getRecordManager().setPrimaryKey(this, value);
        return this;
    },
    getPrimaryKeyName() {
        return this['driver'].getRecordManager().getPrimaryKeyName(this);
    },
    markModified(...keys) {
        this['driver'].getRecordManager().markModified(this, arguments);
        return this;
    },
    isModified(...keys) {
        return this['driver'].getRecordManager().isModified(this, arguments);
    },
    getModified() {
        return this['driver'].getRecordManager().getModified(this);
    }
};
