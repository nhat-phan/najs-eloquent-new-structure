"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecordManagerPublicApi = {
    getRecordName() {
        return this.driver.getRecordManager().getRecordName(this);
    },
    getRecord() {
        return this.driver.getRecordManager().getRecord(this);
    },
    formatAttributeName(name) {
        return this.driver.getRecordManager().formatAttributeName(this, name);
    },
    getAttribute(key) {
        return this.driver.getRecordManager().getAttribute(this, key);
    },
    setAttribute(key, value) {
        this.driver.getRecordManager().setAttribute(this, key, value);
        return this;
    },
    hasAttribute(key) {
        return this.driver.getRecordManager().hasAttribute(this, key);
    },
    getPrimaryKey() {
        return this.driver.getRecordManager().getPrimaryKey(this);
    },
    setPrimaryKey(value) {
        this.driver.getRecordManager().setPrimaryKey(this, value);
        return this;
    },
    getPrimaryKeyName() {
        return this.driver.getRecordManager().getPrimaryKeyName(this);
    },
    markModified(...keys) {
        this.driver.getRecordManager().markModified(this, arguments);
        return this;
    },
    isModified(...keys) {
        return this.driver.getRecordManager().isModified(this, arguments);
    },
    getModified() {
        return this.driver.getRecordManager().getModified(this);
    },
    isNew() {
        return this.driver.getRecordManager().isNew(this);
    }
    // save(this: Model): Promise<any> {
    //   const recordManager = this.driver.getRecordManager()
    //   if (recordManager.isNew(this)) {
    //     return recordManager.getRecordExecutor(this).create()
    //   }
    //   return recordManager.getRecordExecutor(this).update()
    // },
    // delete(this: Model): Promise<any> {
    //   const softDeletesFeature = this.driver.getSoftDeletesFeature()
    //   return this.driver
    //     .getRecordManager()
    //     .getRecordExecutor(this)
    //     .delete(softDeletesFeature.hasSoftDeletes(this))
    // }
};
