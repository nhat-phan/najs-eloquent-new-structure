"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RecordConditionMatcher_1 = require("./RecordConditionMatcher");
class RecordFilter {
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
        if (typeof conditions['$or'] !== undefined) {
            // TODO: here
        }
        if (typeof conditions['$and'] !== undefined) {
            // TODO: here
        }
        return false;
    }
    matchConditionsWithOrOperator(record, conditions) {
        if (!Array.isArray(conditions)) {
            return this.isMatch(record, conditions);
        }
        for (const matcher of conditions) {
            if (matcher instanceof RecordConditionMatcher_1.RecordConditionMatcher && matcher.isMatch(record)) {
                return true;
            }
        }
        return false;
    }
    matchConditionsWithAndOperator(record, conditions) {
        if (!Array.isArray(conditions)) {
            return this.isMatch(record, conditions);
        }
        for (const matcher of conditions) {
            if (matcher instanceof RecordConditionMatcher_1.RecordConditionMatcher && !matcher.isMatch(record)) {
                return false;
            }
        }
        return true;
    }
}
exports.RecordFilter = RecordFilter;
