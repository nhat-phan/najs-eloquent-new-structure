"use strict";
/// <reference path="../definitions/data/IDataReader.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const Record_1 = require("./Record");
exports.RecordDataReader = {
    getAttribute(data, field) {
        return data.getAttribute(field);
    },
    pick(record, selectedFields) {
        const data = record.toObject();
        return new Record_1.Record(lodash_1.pick(data, selectedFields));
    }
};
