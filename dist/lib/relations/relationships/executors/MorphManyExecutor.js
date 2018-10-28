"use strict";
/// <reference path="../../../definitions/data/IDataCollector.ts" />
/// <reference path="../../../definitions/relations/IRelationDataBucket.ts" />
/// <reference path="../../../definitions/query-builders/IConditionMatcher.ts" />
/// <reference path="../../../definitions/query-builders/IQueryBuilder.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const DataConditionMatcher_1 = require("../../../data/DataConditionMatcher");
const HasManyExecutor_1 = require("./HasManyExecutor");
const Relationship_1 = require("../../Relationship");
class MorphManyExecutor extends HasManyExecutor_1.HasManyExecutor {
    constructor(dataBucket, targetModel, targetMorphTypeName) {
        super(dataBucket, targetModel);
        this.targetMorphType = Relationship_1.Relationship.findMorphType(this.targetModel);
        this.targetMorphTypeName = targetMorphTypeName;
    }
    setCollector(collector, conditions, reader) {
        conditions.unshift(new DataConditionMatcher_1.DataConditionMatcher(this.targetMorphTypeName, '=', this.targetMorphType, reader));
        return super.setCollector(collector, conditions, reader);
    }
    setQuery(query) {
        query.where(this.targetMorphTypeName, '=', this.targetMorphType);
        return super.setQuery(query);
    }
}
exports.MorphManyExecutor = MorphManyExecutor;
