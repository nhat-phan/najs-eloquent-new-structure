"use strict";
/// <reference path="../../definitions/model/IModel.ts" />
/// <reference path="../../definitions/relations/IRelationship.ts" />
/// <reference path="../../definitions/data/IDataCollector.ts" />
/// <reference path="../../definitions/query-builders/IQueryBuilder.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const Relationship_1 = require("../Relationship");
const DataConditionMatcher_1 = require("../../data/DataConditionMatcher");
const RelationUtilities_1 = require("../RelationUtilities");
class MorphOneOrMany extends Relationship_1.Relationship {
    constructor(root, relationName, target, targetType, targetKey, rootKey) {
        super(root, relationName);
        this.rootKeyName = rootKey;
        this.targetDefinition = target;
        this.targetMorphTypeName = targetType;
        this.targetKeyName = targetKey;
    }
    get targetMorphType() {
        return Relationship_1.Relationship.findMorphType(this.targetModel);
    }
    collectData() {
        const dataBucket = this.getDataBucket();
        if (!dataBucket) {
            return undefined;
        }
        const dataBuffer = dataBucket.getDataOf(this.targetModel);
        const collector = dataBuffer.getCollector();
        const rootKey = this.rootModel.getAttribute(this.rootKeyName);
        const reader = dataBuffer.getDataReader();
        collector.filterBy({
            $and: [
                new DataConditionMatcher_1.DataConditionMatcher(this.targetMorphTypeName, '=', this.targetMorphType, reader),
                new DataConditionMatcher_1.DataConditionMatcher(this.targetKeyName, '=', rootKey, reader)
            ]
        });
        return this.getExecutor().executeCollector(collector);
    }
    async fetchData(type) {
        const query = this.createTargetQuery(`${this.getType()}:${this.targetModel.getModelName()}`);
        if (type === 'lazy') {
            query
                .where(this.targetMorphTypeName, this.targetMorphType)
                .where(this.targetKeyName, this.rootModel.getAttribute(this.rootKeyName));
        }
        else {
            const dataBucket = this.getDataBucket();
            if (!dataBucket) {
                return this.getExecutor().getEmptyValue();
            }
            const ids = RelationUtilities_1.RelationUtilities.getAttributeListInDataBucket(dataBucket, this.rootModel, this.rootKeyName);
            query.where(this.targetMorphTypeName, this.targetMorphType).whereIn(this.targetKeyName, ids);
        }
        return this.getExecutor().executeQuery(query);
    }
    isInverseOf(relationship) {
        return false;
    }
}
exports.MorphOneOrMany = MorphOneOrMany;
