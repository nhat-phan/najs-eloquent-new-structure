"use strict";
/// <reference path="../definitions/query-builders/IConditionMatcher.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const Lodash = require("lodash");
class RecordConditionMatcher {
    constructor(field, operator, value) {
        this.field = field;
        this.operator = operator;
        this.value = value;
    }
    isEqual(record) {
        return Lodash.isEqual(record.getAttribute(this.field), this.value);
    }
    isLessThan(record) {
        return Lodash.lt(record.getAttribute(this.field), this.value);
    }
    isLessThanOrEqual(record) {
        return Lodash.lte(record.getAttribute(this.field), this.value);
    }
    isGreaterThan(record) {
        return Lodash.gt(record.getAttribute(this.field), this.value);
    }
    isGreaterThanOrEqual(record) {
        return Lodash.gte(record.getAttribute(this.field), this.value);
    }
    isInArray(record) {
        // console.log(record)
        // console.log(this.value)
        return Lodash.includes(this.value, record.getAttribute(this.field));
    }
    isMatch(record) {
        switch (this.operator) {
            case '=':
            case '==':
                return this.isEqual(record);
            case '!=':
            case '<>':
                return !this.isEqual(record);
            case '<':
                return this.isLessThan(record);
            case '<=':
            case '=<':
                return this.isLessThanOrEqual(record);
            case '>':
                return this.isGreaterThan(record);
            case '>=':
            case '=>':
                return this.isGreaterThanOrEqual(record);
            case 'in':
                return this.isInArray(record);
            case 'not-in':
                return !this.isInArray(record);
            default:
                return false;
        }
    }
}
exports.RecordConditionMatcher = RecordConditionMatcher;
