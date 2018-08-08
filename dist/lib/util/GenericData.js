"use strict";
/// <reference path="../definitions/utils/IDataReader.ts" />
/// <reference path="../definitions/utils/IDataWriter.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
class GenericData {
    constructor(data) {
        this.data = data;
    }
    get(path, defaultValue) {
        return lodash_1.get(this.data, path, defaultValue);
    }
    has(path) {
        return lodash_1.has(this.data, path) && !!lodash_1.get(this.data, path);
    }
    exists(path) {
        return lodash_1.has(this.data, path);
    }
    all() {
        return this.data;
    }
    only(...args) {
        const paths = lodash_1.flatten(args);
        return paths.reduce((memo, path) => {
            lodash_1.set(memo, path, lodash_1.get(this.data, path));
            return memo;
        }, {});
    }
    except(...args) {
        const paths = lodash_1.flatten(args);
        return paths.reduce((memo, path) => {
            lodash_1.unset(memo, path);
            return memo;
        }, Object.assign({}, this.data));
    }
    set(path, value) {
        lodash_1.set(this.data, path, value);
        return this;
    }
    put(path, value) {
        return this.set(path, value);
    }
    push(path, value) {
        return this.set(path, value);
    }
    pull(path, defaultValue) {
        const value = this.get(path, defaultValue);
        this.delete(path);
        return value;
    }
    delete(path) {
        lodash_1.unset(this.data, path);
        return this;
    }
    remove(path) {
        return this.delete(path);
    }
    forget(path) {
        return this.delete(path);
    }
    clear() {
        this.data = {};
        return this;
    }
    flush() {
        return this.clear();
    }
}
exports.GenericData = GenericData;
