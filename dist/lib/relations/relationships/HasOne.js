"use strict";
/// <reference path="../../definitions/model/IModel.ts" />
/// <reference path="../../definitions/relations/IRelationship.ts" />
/// <reference path="../../definitions/relations/IHasOneRelationship.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const najs_binding_1 = require("najs-binding");
const HasOneOrMany_1 = require("./HasOneOrMany");
const RelationshipType_1 = require("../RelationshipType");
const constants_1 = require("../../constants");
const ModelEvent_1 = require("../../model/ModelEvent");
class HasOne extends HasOneOrMany_1.HasOneOrMany {
    getClassName() {
        return constants_1.NajsEloquent.Relation.Relationship.HasOne;
    }
    getType() {
        return RelationshipType_1.RelationshipType.HasOne;
    }
    async executeQuery(queryBuilder) {
        return queryBuilder.first();
    }
    executeCollector(collector) {
        collector.limit(1);
        const result = collector.exec();
        if (result.length === 0) {
            return undefined;
        }
        return this.getDataBucket().makeModel(this.targetModel, result[0]);
    }
    getEmptyValue() {
        return undefined;
    }
    associate(model) {
        // root provides primary key for target, whenever the root get saved target should be updated as well
        const primaryKey = this.rootModel.getAttribute(this.rootKeyName);
        if (!primaryKey) {
            this.rootModel.once(ModelEvent_1.ModelEvent.Saved, async () => {
                model.setAttribute(this.targetKeyName, this.rootModel.getAttribute(this.rootKeyName));
                await model.save();
            });
            return this;
        }
        model.setAttribute(this.targetKeyName, primaryKey);
        this.rootModel.once(ModelEvent_1.ModelEvent.Saved, async () => {
            await model.save();
        });
        return this;
    }
}
HasOne.className = constants_1.NajsEloquent.Relation.Relationship.HasOne;
exports.HasOne = HasOne;
najs_binding_1.register(HasOne, constants_1.NajsEloquent.Relation.Relationship.HasOne);
