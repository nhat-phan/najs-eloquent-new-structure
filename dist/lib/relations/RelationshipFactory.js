"use strict";
/// <reference path="../definitions/model/IModel.ts" />
/// <reference path="../definitions/relations/IRelationship.ts" />
/// <reference path="../definitions/relations/IRelationshipFactory.ts" />
/// <reference path="../definitions/relations/IHasOneRelationship.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
require("./relationships/HasOne");
const HasOne_1 = require("./relationships/HasOne");
const najs_binding_1 = require("najs-binding");
const functions_1 = require("../util/functions");
class RelationshipFactory {
    constructor(rootModel, name) {
        this.rootModel = rootModel;
        this.name = name;
    }
    make(className, params, modifier) {
        if (!this.relationship) {
            this.relationship = najs_binding_1.make(className, [this.rootModel, this.name, ...params]);
            if (modifier) {
                modifier(this.relationship);
            }
        }
        return this.relationship;
    }
    findForeignKeyName(referencing, referenced) {
        const referencingModel = najs_binding_1.make(referencing);
        const referencedNameParts = functions_1.parse_string_with_dot_notation(referenced.getModelName());
        return referencingModel.formatAttributeName(referencedNameParts.last + '_id');
    }
    hasOne(target, targetKey, localKey) {
        const targetKeyName = typeof targetKey === 'undefined' ? this.findForeignKeyName(target, this.rootModel) : targetKey;
        const rootKeyName = typeof localKey === 'undefined' ? this.rootModel.getPrimaryKeyName() : localKey;
        return this.make(HasOne_1.HasOne.className, [target, targetKeyName, rootKeyName]);
    }
}
exports.RelationshipFactory = RelationshipFactory;
