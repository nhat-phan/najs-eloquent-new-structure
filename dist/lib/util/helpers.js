"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Model_1 = require("../model/Model");
const collect_js_1 = require("collect.js");
const collection = collect_js_1.default([]);
const Collection = Object.getPrototypeOf(collection).constructor;
function isModel(value) {
    return value instanceof Model_1.Model;
}
exports.isModel = isModel;
function isCollection(value) {
    return value instanceof Collection;
}
exports.isCollection = isCollection;
function distinctModelByClassInCollection(collection) {
    const result = [];
    if (!isCollection(collection) || collection.isEmpty()) {
        return result;
    }
    const collected = {};
    for (let i = 0, l = collection.count(); i < l; i++) {
        const model = collection.get(i);
        if (collected[model.getModelName()] === true) {
            continue;
        }
        collected[model.getModelName()] = true;
        result.push(model);
    }
    return result;
}
exports.distinctModelByClassInCollection = distinctModelByClassInCollection;
