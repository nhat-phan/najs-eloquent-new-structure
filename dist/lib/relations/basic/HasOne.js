"use strict";
/// <reference path="../../definitions/relations/IRelation.ts" />
/// <reference path="../../definitions/relations/IHasOne.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const najs_binding_1 = require("najs-binding");
const RelationBase_1 = require("../RelationBase");
const constants_1 = require("../../constants");
class HasOne extends RelationBase_1.RelationBase {
    getClassName() {
        return constants_1.NajsEloquent.Relation.HasOne;
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
exports.HasOne = HasOne;
najs_binding_1.register(HasOne, constants_1.NajsEloquent.Relation.HasOne);
