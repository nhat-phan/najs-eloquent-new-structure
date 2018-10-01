"use strict";
/// <reference path="../contracts/MemoryDataSource.ts" />
/// <reference path="../definitions/model/IModel.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
class RecordDataSourceBase {
    constructor(model) {
        this.modelName = model.getModelName();
        this.primaryKeyName = model.getPrimaryKeyName();
        this.buffer = new Map();
    }
    getModelName() {
        return this.modelName;
    }
    getPrimaryKeyName() {
        return this.primaryKeyName;
    }
    getBuffer() {
        return this.buffer;
    }
    add(data) {
        this.buffer.set(this.getPrimaryKey(data), data);
        return this;
    }
    remove(data) {
        this.buffer.delete(this.getPrimaryKey(data));
        return this;
    }
    filter(cb) {
        const result = [];
        for (const item of this.buffer.values()) {
            if (cb.call(undefined, item)) {
                result.push(item);
            }
        }
        return result;
    }
    [Symbol.iterator]() {
        return this.buffer.values();
    }
}
exports.RecordDataSourceBase = RecordDataSourceBase;
