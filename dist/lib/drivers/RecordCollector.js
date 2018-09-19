"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const Record_1 = require("./Record");
const RecordConditionMatcher_1 = require("./RecordConditionMatcher");
class RecordCollector {
    constructor(dataSource) {
        this.dataSource = dataSource;
        this.conditions = {};
    }
    static use(dataSource) {
        return new RecordCollector(dataSource);
    }
    setLimit(value) {
        this.limited = value;
        return this;
    }
    setSelectedFields(selectedFields) {
        this.selected = selectedFields;
        return this;
    }
    setSortedData(directions) {
        this.sortedBy = directions;
        return this;
    }
    setConditions(conditions) {
        this.conditions = conditions;
        return this;
    }
    pickFields(record) {
        const data = record.toObject();
        return new Record_1.Record(lodash_1.pick(data, this.selected));
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
    exec() {
        const filtered = [];
        const shouldSortResult = typeof this.sortedBy !== 'undefined' && this.sortedBy.length > 0;
        const shouldPickFields = typeof this.selected !== 'undefined' && this.selected.length > 0;
        for (const record of this.dataSource) {
            if (!this.isMatch(record, this.conditions)) {
                continue;
            }
            // Edge cases which happens if there is no sortedBy data
            if (!shouldSortResult) {
                filtered.push(shouldPickFields ? this.pickFields(record) : record);
                // Edge case #1: the result is reach limited number the process should be stopped
                if (this.limited && filtered.length === this.limited) {
                    return filtered;
                }
                continue;
            }
            // if there is a sorted data, always push the raw record
            filtered.push(record);
        }
        return shouldSortResult ? this.sortLimitAndSelectRecords(filtered) : filtered;
    }
    sortLimitAndSelectRecords(records) {
        let result = records.sort((a, b) => this.compare(a, b, 0));
        if (this.limited) {
            result = result.slice(0, this.limited);
        }
        if (typeof this.selected !== 'undefined') {
            return result.map(record => this.pickFields(record));
        }
        return result;
    }
    compare(a, b, index) {
        const key = this.sortedBy[index][0];
        const valueA = a.getAttribute(key);
        const valueB = b.getAttribute(key);
        const result = lodash_1.eq(valueA, valueB);
        if (result) {
            if (index > this.sortedBy.length - 1) {
                return 0;
            }
            return this.compare(a, b, index + 1);
        }
        const direction = this.sortedBy[index][1];
        const isLessThan = lodash_1.lt(valueA, valueB);
        if (isLessThan) {
            return direction === 'asc' ? -1 : 1;
        }
        return direction === 'asc' ? 1 : -1;
    }
}
exports.RecordCollector = RecordCollector;
