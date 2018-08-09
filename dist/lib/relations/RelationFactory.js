"use strict";
/// <reference path="../definitions/model/IModel.ts" />
/// <reference path="../definitions/relations/IRelation.ts" />
/// <reference path="../definitions/relations/IRelationFactory.ts" />
/// <reference path="../definitions/relations/IHasOne.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
require("./basic/HasOneRelation");
const najs_binding_1 = require("najs-binding");
const constants_1 = require("../constants");
class RelationFactory {
    constructor(rootModel, name) {
        this.rootModel = rootModel;
        this.name = name;
    }
    make(className, params, modifier) {
        if (!this.relation) {
            this.relation = najs_binding_1.make(className, [this.rootModel, this.name, ...params]);
            if (modifier) {
                modifier(this.relation);
            }
        }
        return this.relation;
    }
    hasOne(model, foreignKey, localKey) {
        return this.make(constants_1.NajsEloquent.Relation.HasOneRelation, []);
    }
}
exports.RelationFactory = RelationFactory;
