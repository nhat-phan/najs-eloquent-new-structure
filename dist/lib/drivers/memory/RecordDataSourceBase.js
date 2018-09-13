"use strict";
/// <reference path="../../contracts/MemoryDataSource.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
class RecordDataSourceBase {
    constructor(modelName, primaryKeyName) {
        this.modelName = modelName;
        this.primaryKeyName = primaryKeyName;
        this.buffer = new Map();
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
    next() {
        return this.buffer.values().next();
    }
    [Symbol.iterator]() {
        return {
            next: () => this.next()
        };
    }
}
exports.RecordDataSourceBase = RecordDataSourceBase;
