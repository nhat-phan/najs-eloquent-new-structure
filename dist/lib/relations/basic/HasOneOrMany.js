"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const najs_binding_1 = require("najs-binding");
const Relation_1 = require("../Relation");
class HasOneOrMany extends Relation_1.Relation {
    constructor(root, relationName, target, targetKey, rootKey, is1v1) {
        super(root, relationName);
        this.rootKeyName = rootKey;
        this.targetDefinition = target;
        this.targetKeyName = targetKey;
        this.is1v1 = is1v1;
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
        return undefined;
    }
    async fetchData(type) {
        return undefined;
    }
    isInverseOf(relation) {
        return false;
    }
}
exports.HasOneOrMany = HasOneOrMany;
