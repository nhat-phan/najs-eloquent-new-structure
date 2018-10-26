"use strict";
/// <reference path="../../definitions/collect.js/index.d.ts" />
/// <reference path="../../definitions/model/IModel.ts" />
/// <reference path="../../definitions/data/IDataReader.ts" />
/// <reference path="../../definitions/relations/IRelationship.ts" />
/// <reference path="../../definitions/relations/IRelationDataBucket.ts" />
/// <reference path="../../definitions/relations/IManyToManyRelationship.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const najs_binding_1 = require("najs-binding");
const Relationship_1 = require("../Relationship");
const constants_1 = require("../../constants");
const PivotModel_1 = require("./pivot/PivotModel");
const helpers_1 = require("../../util/helpers");
const functions_1 = require("../../util/functions");
class ManyToManyBase extends Relationship_1.Relationship {
    constructor(root, relationName, target, pivot, pivotTargetKeyName, pivotRootKeyName, targetKeyName, rootKeyName) {
        super(root, relationName);
        this.targetDefinition = target;
        this.pivot = pivot;
        this.pivotTargetKeyName = pivotTargetKeyName;
        this.pivotRootKeyName = pivotRootKeyName;
        this.targetKeyName = targetKeyName;
        this.rootKeyName = rootKeyName;
        this.pivotOptions = {
            foreignKeys: [this.pivotRootKeyName, this.pivotTargetKeyName].sort()
        };
    }
    isInverseOf(relation) {
        return false;
    }
    get pivotModel() {
        if (!this.pivotModelInstance) {
            this.pivotModelInstance = this.newPivot();
        }
        return this.pivotModelInstance;
    }
    getQueryBuilder(name) {
        const queryBuilder = this.targetModel.newQuery(name);
        queryBuilder.handler.setRelationDataBucket(this.getDataBucket());
        return this.applyCustomQuery(queryBuilder);
    }
    newPivot(data, isGuarded) {
        if (typeof this.pivot === 'string') {
            if (najs_binding_1.ClassRegistry.has(this.pivot)) {
                const instance = najs_binding_1.make(this.pivot);
                if (helpers_1.isModel(instance)) {
                    this.setPivotDefinition(najs_binding_1.ClassRegistry.findOrFail(this.pivot).instanceConstructor);
                    return instance;
                }
            }
            // the pivot is not a model then we should create an pivot model
            this.setPivotDefinition(PivotModel_1.PivotModel.createPivotClass(this.pivot, this.getPivotOptions(this.pivot)));
            return Reflect.construct(this.pivotDefinition, Array.from(arguments));
        }
        this.setPivotDefinition(this.pivot);
        return Reflect.construct(this.pivot, Array.from(arguments));
    }
    newPivotQuery(name, raw = false) {
        const queryBuilder = this.applyPivotCustomQuery(this.pivotModel.newQuery(name));
        queryBuilder.handler.setRelationDataBucket(this.getDataBucket());
        if (raw) {
            return queryBuilder;
        }
        const rootPrimaryKey = this.rootModel.getAttribute(this.rootKeyName);
        if (rootPrimaryKey) {
            return queryBuilder.where(this.pivotRootKeyName, rootPrimaryKey);
        }
        return queryBuilder;
    }
    applyPivotCustomQuery(queryBuilder) {
        if (typeof this.pivotCustomQueryFn === 'function') {
            this.pivotCustomQueryFn.call(queryBuilder, queryBuilder);
        }
        return queryBuilder;
    }
    withPivot(...fields) {
        const input = lodash_1.flatten(fields);
        if (typeof this.pivotOptions.fields === 'undefined') {
            this.pivotOptions.fields = input;
        }
        else {
            this.pivotOptions.fields = functions_1.array_unique(this.pivotOptions.fields.concat(input));
        }
        return this;
    }
    queryPivot(cb) {
        this.pivotCustomQueryFn = cb;
        return this;
    }
    getPivotOptions(name) {
        if (name && !this.pivotOptions.name) {
            this.pivotOptions.name = name;
        }
        return this.pivotOptions;
    }
    setPivotDefinition(definition) {
        const options = this.getPivotOptions();
        this.pivotDefinition = definition;
        this.pivotDefinition['options'] = options;
        if (typeof options.fields !== 'undefined') {
            if (typeof this.pivotDefinition['fillable'] === 'undefined') {
                this.pivotDefinition['fillable'] = [].concat(options.foreignKeys, options.fields);
            }
            else {
                this.pivotDefinition['fillable'] = functions_1.array_unique([].concat(this.pivotDefinition['fillable'], options.foreignKeys, options.fields));
            }
        }
    }
}
ManyToManyBase.className = constants_1.NajsEloquent.Relation.Relationship.ManyToMany;
exports.ManyToManyBase = ManyToManyBase;
