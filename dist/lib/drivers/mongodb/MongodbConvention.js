"use strict";
/// <reference path="../../definitions/query-builders/IConvention.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
class MongodbConvention {
    formatFieldName(name) {
        if (name === 'id') {
            return '_id';
        }
        return name;
    }
    getNullValueFor(name) {
        // tslint:disable-next-line
        return null;
    }
}
exports.MongodbConvention = MongodbConvention;
