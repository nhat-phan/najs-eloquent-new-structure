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
const HasManyExecutor_1 = require("./executors/HasManyExecutor");
const ModelEvent_1 = require("../../model/ModelEvent");
const helpers_1 = require("../../util/helpers");
const accessors_1 = require("../../util/accessors");
class HasMany extends HasOneOrMany_1.HasOneOrMany {
    getClassName() {
        return constants_1.NajsEloquent.Relation.Relationship.HasMany;
    }
    getType() {
        return RelationshipType_1.RelationshipType.HasMany;
    }
    getExecutor() {
        if (!this.executor) {
            this.executor = new HasManyExecutor_1.HasManyExecutor(this.getDataBucket(), this.targetModel);
        }
        return this.executor;
    }
    flattenArguments(...models) {
        return lodash_1.flatten(models.map(item => {
            return helpers_1.isCollection(item) ? item.all() : item;
        }));
    }
    associate(...models) {
        // root provides primary key for target, whenever the root get saved target should be updated as well
        const associatedModels = this.flattenArguments.apply(this, arguments);
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
    dissociate(...models) {
        const dissociatedModels = this.flattenArguments.apply(this, arguments);
        dissociatedModels.forEach(model => {
            model.setAttribute(this.targetKeyName, accessors_1.relationFeatureOf(model).getEmptyValueForRelationshipForeignKey(model, this.targetKeyName));
        });
        this.rootModel.once(ModelEvent_1.ModelEvent.Saved, async () => {
            await Promise.all(dissociatedModels.map(model => model.save()));
        });
        return this;
    }
}
HasMany.className = constants_1.NajsEloquent.Relation.Relationship.HasMany;
exports.HasMany = HasMany;
najs_binding_1.register(HasMany, constants_1.NajsEloquent.Relation.Relationship.HasMany);
