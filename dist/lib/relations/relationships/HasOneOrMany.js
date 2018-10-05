"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const najs_binding_1 = require("najs-binding");
const Relationship_1 = require("../Relationship");
const DataConditionMatcher_1 = require("../../data/DataConditionMatcher");
class HasOneOrMany extends Relationship_1.Relationship {
    constructor(root, relationName, target, targetKey, rootKey) {
        super(root, relationName);
        this.rootKeyName = rootKey;
        this.targetDefinition = target;
        this.targetKeyName = targetKey;
    }
    get targetModel() {
        if (!this.targetModelInstance) {
            this.targetModelInstance = najs_binding_1.make(this.targetDefinition);
        }
        return this.targetModelInstance;
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
        return this.executeCollector(collector);
    }
    async fetchData(type) {
        const query = this.getQueryBuilder(`${this.getType()}:${this.targetModel.getModelName()}`);
        if (type === 'lazy') {
            query.where(this.targetKeyName, this.rootModel.getAttribute(this.rootKeyName));
        }
        else {
            const dataBucket = this.getDataBucket();
            if (!dataBucket) {
                return this.getEmptyValue();
            }
            const dataBuffer = dataBucket.getDataOf(this.rootModel);
            const reader = dataBuffer.getDataReader();
            const ids = dataBuffer.map(item => reader.getAttribute(item, this.rootKeyName));
            query.whereIn(this.targetKeyName, ids);
        }
        return this.executeQuery(query);
    }
    isInverseOf(relation) {
        return false;
    }
}
exports.HasOneOrMany = HasOneOrMany;
