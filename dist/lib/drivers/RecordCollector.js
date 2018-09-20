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
    limit(value) {
        this.limited = value;
        return this;
    }
    select(selectedFields) {
        this.selected = selectedFields;
        return this;
    }
    orderBy(directions) {
        this.sortedBy = directions;
        return this;
    }
    filterBy(conditions) {
        this.conditions = conditions;
        return this;
    }
    pickFields(record, selectedFields) {
        const data = record.toObject();
        return new Record_1.Record(lodash_1.pick(data, selectedFields));
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
    hasSortedByConfig() {
        return typeof this.sortedBy !== 'undefined' && this.sortedBy.length > 0;
    }
    hasSelectedFieldsConfig() {
        return typeof this.selected !== 'undefined' && this.selected.length > 0;
    }
    exec() {
        const filtered = [];
        const shouldSortResult = this.hasSortedByConfig();
        const shouldPickFields = this.hasSelectedFieldsConfig();
        for (const record of this.dataSource) {
            if (!this.isMatch(record, this.conditions)) {
                continue;
            }
            // Edge cases which happens if there is no sortedBy data
            if (!shouldSortResult) {
                filtered.push(shouldPickFields ? this.pickFields(record, this.selected) : record);
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
        if (this.hasSelectedFieldsConfig()) {
            return result.map(record => this.pickFields(record, this.selected));
        }
        return result;
    }
    compare(a, b, index) {
        const key = this.sortedBy[index][0];
        const valueA = a.getAttribute(key);
        const valueB = b.getAttribute(key);
        const result = lodash_1.eq(valueA, valueB);
        if (result) {
            if (index + 1 >= this.sortedBy.length) {
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
