"use strict";
/// <reference path="../../definitions/collect.js/index.d.ts" />
/// <reference path="../../definitions/model/IModel.ts" />
/// <reference path="../../definitions/relations/IRelationship.ts" />
/// <reference path="../../definitions/relations/IMorphManyRelationship.ts" />
/// <reference path="../../definitions/data/IDataCollector.ts" />
/// <reference path="../../definitions/query-builders/IQueryBuilder.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const najs_binding_1 = require("najs-binding");
const HasOneOrMany_1 = require("./HasOneOrMany");
const RelationshipType_1 = require("../RelationshipType");
const constants_1 = require("../../constants");
const MorphManyExecutor_1 = require("./executors/MorphManyExecutor");
class MorphMany extends HasOneOrMany_1.HasOneOrMany {
    constructor(root, relationName, target, targetType, targetKey, rootKey) {
        super(root, relationName, target, targetKey, rootKey);
        this.targetMorphTypeName = targetType;
    }
    getClassName() {
        return constants_1.NajsEloquent.Relation.Relationship.MorphMany;
    }
    getType() {
        return RelationshipType_1.RelationshipType.MorphMany;
    }
    getExecutor() {
        if (!this.executor) {
            this.executor = new MorphManyExecutor_1.MorphManyExecutor(this.getDataBucket(), this.targetModel, this.targetMorphTypeName, HasOneOrMany_1.HasOneOrMany.findMorphType(this.rootModel));
        }
        return this.executor;
    }
}
MorphMany.className = constants_1.NajsEloquent.Relation.Relationship.MorphMany;
exports.MorphMany = MorphMany;
najs_binding_1.register(MorphMany, constants_1.NajsEloquent.Relation.Relationship.MorphMany);
