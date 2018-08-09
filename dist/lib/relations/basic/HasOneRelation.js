"use strict";
/// <reference path="../../definitions/relations/IRelation.ts" />
/// <reference path="../../definitions/relations/IHasOne.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const najs_binding_1 = require("najs-binding");
const Relation_1 = require("../Relation");
const constants_1 = require("../../constants");
class HasOneRelation extends Relation_1.Relation {
    getClassName() {
        return constants_1.NajsEloquent.Relation.HasOneRelation;
    }
    getType() {
        return 'HasOne';
    }
    buildData() {
        return undefined;
    }
    async lazyLoad() {
        return undefined;
    }
    async eagerLoad() {
        return undefined;
    }
    isInverseOf(relation) {
        return false;
    }
}
exports.HasOneRelation = HasOneRelation;
najs_binding_1.register(HasOneRelation, constants_1.NajsEloquent.Relation.HasOneRelation);
