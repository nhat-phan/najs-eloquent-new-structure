"use strict";
/// <reference path="../../definitions/model/IModel.ts" />
/// <reference path="../../definitions/relations/IRelationship.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
// import QueryBuilderInternal = NajsEloquent.QueryBuilder.QueryBuilderInternal
const najs_binding_1 = require("najs-binding");
const Relationship_1 = require("../Relationship");
const RelationshipType_1 = require("../RelationshipType");
const constants_1 = require("../../constants");
const PivotModel_1 = require("./pivot/PivotModel");
const helpers_1 = require("../../util/helpers");
// import { make_collection } from '../../util/factory'
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
    get pivotModel() {
        if (!this.pivotModelInstance) {
            this.pivotModelInstance = this.getPivotModel();
        }
        return this.pivotModelInstance;
    }
    getPivotModel() {
        if (typeof this.pivot === 'string') {
            if (najs_binding_1.ClassRegistry.has(this.pivot)) {
                const instance = najs_binding_1.make(this.pivot);
                if (helpers_1.isModel(instance)) {
                    return instance;
                }
            }
            // the pivot is not a model then we should create an pivot model
            this.pivotDefinition = PivotModel_1.PivotModel.createPivotClass(this.pivot, {
                foreignKeys: [this.pivotRootKeyName, this.pivotTargetKeyName].sort()
            });
            return Reflect.construct(this.pivotDefinition, []);
        }
        return Reflect.construct(this.pivot, []);
    }
    collectData() {
        return undefined;
    }
    // getPivotQueryBuilder(name: string | undefined): IQueryBuilder<any> {
    //   const queryBuilder = this.pivotModel.newQuery(name as any) as QueryBuilderInternal
    //   queryBuilder.handler.setRelationDataBucket(this.getDataBucket())
    //   return queryBuilder
    // }
    // getQueryBuilder(name: string | undefined): IQueryBuilder<any> {
    //   const queryBuilder = this.targetModel.newQuery(name as any) as QueryBuilderInternal
    //   queryBuilder.handler.setRelationDataBucket(this.getDataBucket())
    //   return this.applyCustomQuery(queryBuilder)
    // }
    // async fetchPivotData(type: RelationshipFetchType) {
    //   const query = this.getPivotQueryBuilder(
    //     `${this.getType()}Pivot:${this.targetModel.getModelName()}-${this.rootModel.getModelName()}`
    //   )
    //   if (type === 'lazy') {
    //     query.where(this.pivotRootKeyName, this.rootModel.getAttribute(this.rootKeyName))
    //   } else {
    //     const dataBucket = this.getDataBucket()
    //     if (!dataBucket) {
    //       return make_collection([])
    //     }
    //     const dataBuffer = dataBucket.getDataOf(this.rootModel)
    //     const reader = dataBuffer.getDataReader()
    //     const ids = dataBuffer.map(item => reader.getAttribute(item, this.rootKeyName))
    //     query.whereIn(this.pivotRootKeyName, ids)
    //   }
    //   return query.get()
    // }
    async fetchData(type) {
        return undefined;
    }
    isInverseOf(relation) {
        return false;
    }
}
ManyToMany.className = constants_1.NajsEloquent.Relation.Relationship.ManyToMany;
exports.ManyToMany = ManyToMany;
najs_binding_1.register(ManyToMany, constants_1.NajsEloquent.Relation.Relationship.ManyToMany);
