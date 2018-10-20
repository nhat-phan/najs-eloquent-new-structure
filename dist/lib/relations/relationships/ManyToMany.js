"use strict";
/// <reference path="../../definitions/model/IModel.ts" />
/// <reference path="../../definitions/relations/IRelationship.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const Relationship_1 = require("../Relationship");
const RelationshipType_1 = require("../RelationshipType");
const constants_1 = require("../../constants");
class ManyToMany extends Relationship_1.Relationship {
    constructor(root, relationName, target, pivot, pivotTargetKeyName, pivotRootKeyName, targetKeyName, rootKeyName) {
        super(root, relationName);
        this.targetDefinition = target;
        this.pivot = pivot;
        this.pivotTargetKeyName = pivotTargetKeyName;
        this.pivotRootKeyName = pivotRootKeyName;
        this.targetKeyName = targetKeyName;
        this.rootKeyName = rootKeyName;
    }
    getType() {
        return RelationshipType_1.RelationshipType.ManyToMany;
    }
    getClassName() {
        return constants_1.NajsEloquent.Relation.Relationship.ManyToMany;
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
ManyToMany.className = constants_1.NajsEloquent.Relation.Relationship.ManyToMany;
exports.ManyToMany = ManyToMany;
