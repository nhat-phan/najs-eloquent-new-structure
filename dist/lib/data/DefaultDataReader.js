"use strict";
/// <reference path="../definitions/data/IDataReader.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
exports.DefaultDataReader = {
    getAttribute(data, field) {
        return data[field];
    },
    pick(data, selectedFields) {
        return lodash_1.pick(data, selectedFields);
    }
};
