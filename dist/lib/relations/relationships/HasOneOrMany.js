"use strict";
/// <reference path="../../definitions/model/IModel.ts" />
/// <reference path="../../definitions/relations/IRelationship.ts" />
/// <reference path="../../definitions/data/IDataCollector.ts" />
/// <reference path="../../definitions/query-builders/IQueryBuilder.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const Relationship_1 = require("../Relationship");
// import { RelationshipType } from '../RelationshipType'
const DataConditionMatcher_1 = require("../../data/DataConditionMatcher");
class HasOneOrMany extends Relationship_1.Relationship {
    constructor(root, relationName, target, targetKey, rootKey) {
        super(root, relationName);
        this.rootKeyName = rootKey;
        this.targetDefinition = target;
        this.targetKeyName = targetKey;
    }
    getQueryBuilder(name) {
        const queryBuilder = this.targetModel.newQuery(name);
        queryBuilder.handler.setRelationDataBucket(this.getDataBucket());
        return queryBuilder;
    }
    collectData() {
        const dataBucket = this.getDataBucket();
        if (!dataBucket) {
            return undefined;
        }
        const dataBuffer = dataBucket.getDataOf(this.targetModel);
        const collector = dataBuffer.getCollector();
        const rootKey = this.rootModel.getAttribute(this.rootKeyName);
        collector.filterBy({
            $and: [new DataConditionMatcher_1.DataConditionMatcher(this.targetKeyName, '=', rootKey, dataBuffer.getDataReader())]
        });
        return this.getExecutor().executeCollector(collector);
    }
    async fetchData(type) {
        const query = this.getQueryBuilder(`${this.getType()}:${this.targetModel.getModelName()}`);
        if (type === 'lazy') {
            query.where(this.targetKeyName, this.rootModel.getAttribute(this.rootKeyName));
        }
        else {
            const dataBucket = this.getDataBucket();
            if (!dataBucket) {
                return this.getExecutor().getEmptyValue();
            }
            const dataBuffer = dataBucket.getDataOf(this.rootModel);
            const reader = dataBuffer.getDataReader();
            const ids = dataBuffer.map(item => reader.getAttribute(item, this.rootKeyName));
            query.whereIn(this.targetKeyName, ids);
        }
        return this.getExecutor().executeQuery(query);
    }
    isInverseOf(relationship) {
        return false;
        // if (!(relationship instanceof HasOneOrMany)) {
        //   console.log('a')
        //   return false
        // }
        // if (!this.isInverseOfTypeMatched(relationship)) {
        //   console.log('b')
        //   return false
        // }
        // console.log('c')
        // return (
        //   this.rootModel.getModelName() === relationship.targetModel.getModelName() &&
        //   this.rootKeyName === relationship.targetKeyName &&
        //   this.targetModel.getModelName() === relationship.rootModel.getModelName() &&
        //   this.targetKeyName === relationship.rootKeyName
        // )
    }
}
exports.HasOneOrMany = HasOneOrMany;
