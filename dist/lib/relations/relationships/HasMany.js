"use strict";
/// <reference path="../../definitions/collect.js/index.d.ts" />
/// <reference path="../../definitions/model/IModel.ts" />
/// <reference path="../../definitions/relations/IRelationship.ts" />
/// <reference path="../../definitions/relations/IHasManyRelationship.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const najs_binding_1 = require("najs-binding");
const HasOneOrMany_1 = require("./HasOneOrMany");
const RelationshipType_1 = require("../RelationshipType");
const constants_1 = require("../../constants");
const factory_1 = require("../../util/factory");
const ModelEvent_1 = require("../../model/ModelEvent");
class HasMany extends HasOneOrMany_1.HasOneOrMany {
    getClassName() {
        return constants_1.NajsEloquent.Relation.Relationship.HasMany;
    }
    getType() {
        return RelationshipType_1.RelationshipType.HasMany;
    }
    async executeQuery(queryBuilder) {
        return queryBuilder.get();
    }
    executeCollector(collector) {
        return this.getDataBucket().makeCollection(this.targetModel, collector.exec());
    }
    getEmptyValue() {
        return factory_1.make_collection([]);
    }
    associate(...models) {
        // root provides primary key for target, whenever the root get saved target should be updated as well
        const associatedModels = lodash_1.flatten(models);
        const primaryKey = this.rootModel.getAttribute(this.rootKeyName);
        if (!primaryKey) {
            this.rootModel.once(ModelEvent_1.ModelEvent.Saved, async () => {
                await Promise.all(associatedModels.map(model => model.setAttribute(this.targetKeyName, this.rootModel.getAttribute(this.rootKeyName)).save()));
            });
            return this;
        }
        associatedModels.forEach(model => model.setAttribute(this.targetKeyName, primaryKey));
        this.rootModel.once(ModelEvent_1.ModelEvent.Saved, async () => {
            await Promise.all(associatedModels.map(model => model.save()));
        });
        return this;
    }
}
HasMany.className = constants_1.NajsEloquent.Relation.Relationship.HasMany;
exports.HasMany = HasMany;
najs_binding_1.register(HasMany, constants_1.NajsEloquent.Relation.Relationship.HasMany);
