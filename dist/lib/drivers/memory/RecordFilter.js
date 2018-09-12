"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RecordConditionMatcher_1 = require("./RecordConditionMatcher");
const najs_binding_1 = require("najs-binding");
const constants_1 = require("../../constants");
class RecordFilter {
    getClassName() {
        return constants_1.NajsEloquent.Driver.Memory.RecordFilter;
    }
    filter(records, conditions) {
        if (Array.isArray(records)) {
            return records.filter(item => this.isMatch(item, conditions));
        }
        return Object.keys(records).reduce((result, id) => {
            if (this.isMatch(records[id], conditions)) {
                result.push(records[id]);
            }
            return result;
        }, []);
    }
    isMatch(record, conditions) {
        if (typeof conditions['$or'] !== 'undefined') {
            return this.isMatchAtLeastOneCondition(record, conditions['$or']);
        }
        if (typeof conditions['$and'] !== 'undefined') {
            return this.isMatchAllConditions(record, conditions['$and']);
        }
        return false;
    }
    isMatchAtLeastOneCondition(record, conditions) {
        for (const matcherOrSubConditions of conditions) {
            if (matcherOrSubConditions instanceof RecordConditionMatcher_1.RecordConditionMatcher) {
                if (matcherOrSubConditions.isMatch(record)) {
                    return true;
                }
                continue;
            }
            if (this.isMatch(record, matcherOrSubConditions)) {
                return true;
            }
        }
        return false;
    }
    isMatchAllConditions(record, conditions) {
        for (const matcherOrSubConditions of conditions) {
            if (matcherOrSubConditions instanceof RecordConditionMatcher_1.RecordConditionMatcher) {
                if (!matcherOrSubConditions.isMatch(record)) {
                    return false;
                }
                continue;
            }
            if (!this.isMatch(record, matcherOrSubConditions)) {
                return false;
            }
        }
        return true;
    }
}
RecordFilter.className = constants_1.NajsEloquent.Driver.Memory.RecordFilter;
exports.RecordFilter = RecordFilter;
najs_binding_1.register(RecordFilter, constants_1.NajsEloquent.Driver.Memory.RecordFilter, true, true);
