"use strict";
/// <reference path="../../definitions/query-builders/IConditionMatcher.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const MongodbConditionMatcher_1 = require("./MongodbConditionMatcher");
class MongodbConditionMatcherFactory {
    make(field, operator, value) {
        return new MongodbConditionMatcher_1.MongodbConditionMatcher(field, operator, value);
    }
}
exports.MongodbConditionMatcherFactory = MongodbConditionMatcherFactory;
