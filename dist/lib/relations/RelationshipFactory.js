"use strict";
/// <reference path="../definitions/model/IModel.ts" />
/// <reference path="../definitions/relations/IRelationship.ts" />
/// <reference path="../definitions/relations/IRelationshipFactory.ts" />
/// <reference path="../definitions/relations/IHasOneRelationship.ts" />
/// <reference path="../definitions/relations/IBelongsToManyRelationship.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const pluralize = require("pluralize");
const HasOne_1 = require("./relationships/HasOne");
const BelongsTo_1 = require("./relationships/BelongsTo");
const HasMany_1 = require("./relationships/HasMany");
const BelongsToMany_1 = require("./relationships/BelongsToMany");
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
        const referencedNameParts = functions_1.parse_string_with_dot_notation(referenced.getModelName());
        return referencing.formatAttributeName(referencedNameParts.last + '_id');
    }
    findHasOneOrHasManyKeys(target, targetKey, localKey) {
        const targetKeyName = typeof targetKey === 'undefined' ? this.findForeignKeyName(najs_binding_1.make(target), this.rootModel) : targetKey;
        const rootKeyName = typeof localKey === 'undefined' ? this.rootModel.getPrimaryKeyName() : localKey;
        return { targetKeyName, rootKeyName };
    }
    hasOne(target, targetKey, localKey) {
        const keys = this.findHasOneOrHasManyKeys(target, targetKey, localKey);
        return this.make(HasOne_1.HasOne.className, [target, keys.targetKeyName, keys.rootKeyName]);
    }
    hasMany(target, targetKey, localKey) {
        const keys = this.findHasOneOrHasManyKeys(target, targetKey, localKey);
        return this.make(HasMany_1.HasMany.className, [target, keys.targetKeyName, keys.rootKeyName]);
    }
    belongsTo(target, targetKey, localKey) {
        const targetModel = najs_binding_1.make(target);
        const targetKeyName = typeof targetKey === 'undefined' ? targetModel.getPrimaryKeyName() : targetKey;
        const rootKeyName = typeof localKey === 'undefined' ? this.findForeignKeyName(this.rootModel, targetModel) : localKey;
        return this.make(BelongsTo_1.BelongsTo.className, [target, targetKeyName, rootKeyName]);
    }
    findPivotTableName(a, b) {
        const names = [
            a.formatAttributeName(functions_1.parse_string_with_dot_notation(a.getModelName()).last),
            b.formatAttributeName(functions_1.parse_string_with_dot_notation(b.getModelName()).last)
        ];
        return pluralize(names
            .sort(function (a, b) {
            const comparedA = a.toLowerCase();
            const comparedB = b.toLowerCase();
            if (comparedA === comparedB) {
                return 0;
            }
            return comparedA > comparedB ? 1 : -1;
        })
            .join('_'));
    }
    findPivotReferenceName(model) {
        const targetName = functions_1.parse_string_with_dot_notation(model.getModelName()).last;
        return model.formatAttributeName(targetName + '_id');
    }
    belongsToMany(target, pivot, pivotTargetKeyName, pivotRootKeyName, targetKeyName, rootKeyName) {
        const targetModel = najs_binding_1.make(target);
        if (!pivot) {
            pivot = this.findPivotTableName(targetModel, this.rootModel);
        }
        if (!pivotTargetKeyName) {
            pivotTargetKeyName = this.findPivotReferenceName(targetModel);
        }
        if (!pivotRootKeyName) {
            pivotRootKeyName = this.findPivotReferenceName(this.rootModel);
        }
        if (!targetKeyName) {
            targetKeyName = targetModel.getPrimaryKeyName();
        }
        if (!rootKeyName) {
            rootKeyName = this.rootModel.getPrimaryKeyName();
        }
        return this.make(BelongsToMany_1.BelongsToMany.className, [
            target,
            pivot,
            pivotTargetKeyName,
            pivotRootKeyName,
            targetKeyName,
            rootKeyName
        ]);
    }
}
exports.RelationshipFactory = RelationshipFactory;
