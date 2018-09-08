"use strict";
/// <reference path="../../definitions/query-builders/IConditionMatcher.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
class MongodbConditionMatcher {
    constructor(field, operator, value) {
        this.condition = this.buildNativeCondition(field, operator, value);
    }
    buildNativeCondition(field, operator, value) {
        if (typeof value === 'undefined') {
            return {};
        }
        switch (operator) {
            case '=':
                return lodash_1.set({}, field, value);
            case '!=':
                return lodash_1.set({}, field, { $ne: value });
            case '<':
                return lodash_1.set({}, field, { $lt: value });
            case '<=':
                return lodash_1.set({}, field, { $lte: value });
            case '>':
                return lodash_1.set({}, field, { $gt: value });
            case '>=':
                return lodash_1.set({}, field, { $gte: value });
            case 'in':
                return lodash_1.set({}, field, { $in: value });
            case 'not-in':
                return lodash_1.set({}, field, { $nin: value });
            default:
                return {};
        }
    }
    isMatch(record) {
        throw new Error('This class builds a condition for native matcher, please do not use isMatch() function.');
    }
    getCondition() {
        return this.condition;
    }
}
exports.MongodbConditionMatcher = MongodbConditionMatcher;
