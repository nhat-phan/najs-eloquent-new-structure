"use strict";
/// <reference path="../contracts/MemoryDataSource.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const najs_facade_1 = require("najs-facade");
class RecordDataSourceBase extends najs_facade_1.Facade {
    constructor(modelName, primaryKeyName) {
        super();
        this.modelName = modelName;
        this.primaryKeyName = primaryKeyName;
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
    push(data) {
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
