"use strict";
/// <reference path="../../definitions/query-grammars/IConditionQuery.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const ConditionConverter_1 = require("../../query-builders/shared/ConditionConverter");
const najs_binding_1 = require("najs-binding");
const constants_1 = require("../../constants");
const MongodbConditionMatcherFactory_1 = require("./MongodbConditionMatcherFactory");
class MongodbConditionConverter extends ConditionConverter_1.ConditionConverter {
    constructor(queryConditions) {
        super(queryConditions, najs_binding_1.make(MongodbConditionMatcherFactory_1.MongodbConditionMatcherFactory.className), true);
    }
    getClassName() {
        return constants_1.NajsEloquent.QueryBuilder.MongodbConditionConverter;
    }
}
MongodbConditionConverter.className = constants_1.NajsEloquent.QueryBuilder.MongodbConditionConverter;
exports.MongodbConditionConverter = MongodbConditionConverter;
najs_binding_1.register(MongodbConditionConverter, constants_1.NajsEloquent.QueryBuilder.MongodbConditionConverter);
