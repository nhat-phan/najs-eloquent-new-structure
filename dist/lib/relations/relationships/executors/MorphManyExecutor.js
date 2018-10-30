"use strict";
/// <reference path="../../../definitions/data/IDataCollector.ts" />
/// <reference path="../../../definitions/relations/IRelationDataBucket.ts" />
/// <reference path="../../../definitions/query-builders/IConditionMatcher.ts" />
/// <reference path="../../../definitions/query-builders/IQueryBuilder.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const DataConditionMatcher_1 = require("../../../data/DataConditionMatcher");
const HasManyExecutor_1 = require("./HasManyExecutor");
class MorphManyExecutor extends HasManyExecutor_1.HasManyExecutor {
    constructor(dataBucket, targetModel, targetMorphTypeName, typeValue) {
        super(dataBucket, targetModel);
        this.morphTypeValue = typeValue;
        this.targetMorphTypeName = targetMorphTypeName;
    }
    setCollector(collector, conditions, reader) {
        conditions.unshift(new DataConditionMatcher_1.DataConditionMatcher(this.targetMorphTypeName, '=', this.morphTypeValue, reader));
        return super.setCollector(collector, conditions, reader);
    }
    setQuery(query) {
        query.where(this.targetMorphTypeName, this.morphTypeValue);
        return super.setQuery(query);
    }
}
exports.MorphManyExecutor = MorphManyExecutor;
