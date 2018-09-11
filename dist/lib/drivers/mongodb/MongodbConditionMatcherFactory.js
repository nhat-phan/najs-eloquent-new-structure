"use strict";
/// <reference path="../../definitions/query-builders/IConditionMatcher.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const najs_binding_1 = require("najs-binding");
const MongodbConditionMatcher_1 = require("./MongodbConditionMatcher");
const constants_1 = require("../../constants");
class MongodbConditionMatcherFactory {
    getClassName() {
        return constants_1.NajsEloquent.Driver.Mongodb.MongodbConditionMatcherFactory;
    }
    make(data) {
        return new MongodbConditionMatcher_1.MongodbConditionMatcher(data.field, data.operator, data.value);
    }
    transform(matcher) {
        return matcher.getCondition();
    }
}
MongodbConditionMatcherFactory.className = constants_1.NajsEloquent.Driver.Mongodb.MongodbConditionMatcherFactory;
exports.MongodbConditionMatcherFactory = MongodbConditionMatcherFactory;
najs_binding_1.register(MongodbConditionMatcherFactory, constants_1.NajsEloquent.Driver.Mongodb.MongodbConditionMatcherFactory, true, true);
