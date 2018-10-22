"use strict";
/// <reference path="../../definitions/model/IModel.ts" />
/// <reference path="../../definitions/relations/IRelationship.ts" />
/// <reference path="../../definitions/relations/IManyToManyRelationship.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
// import { flatten } from 'lodash'
const najs_binding_1 = require("najs-binding");
const Relationship_1 = require("../Relationship");
const RelationshipType_1 = require("../RelationshipType");
const constants_1 = require("../../constants");
const PivotModel_1 = require("./pivot/PivotModel");
const helpers_1 = require("../../util/helpers");
// import { isModel, isCollection } from '../../util/helpers'
const ModelEvent_1 = require("../../model/ModelEvent");
// import { RelationUtilities } from '../RelationUtilities'
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
            this.pivotModelInstance = this.newPivot();
        }
        return this.pivotModelInstance;
    }
    collectData() {
        return undefined;
    }
    // async fetchPivotData(type: RelationshipFetchType): Promise<CollectJs.Collection<Model>> {
    //   const query = this.newPivotQuery(
    //     `${this.getType()}Pivot:${this.targetModel.getModelName()}-${this.rootModel.getModelName()}`
    //   )
    //   if (type === 'lazy') {
    //     query.where(this.pivotRootKeyName, this.rootModel.getAttribute(this.rootKeyName))
    //   } else {
    //     const dataBucket = this.getDataBucket()
    //     if (!dataBucket) {
    //       return make_collection<Model>([])
    //     }
    //     const ids = RelationUtilities.getAttributeListInDataBucket(dataBucket, this.rootModel, this.rootKeyName)
    //     query.whereIn(this.pivotRootKeyName, ids)
    //   }
    //   return query.get()
    // }
    // getQueryBuilder(name: string | undefined): IQueryBuilder<any> {
    //   const queryBuilder = this.targetModel.newQuery(name as any) as QueryBuilderInternal
    //   queryBuilder.handler.setRelationDataBucket(this.getDataBucket())
    //   return this.applyCustomQuery(queryBuilder)
    // }
    async fetchData(type) {
        // const pivotData = await this.fetchPivotData(type)
        // return pivotData as any
        return {};
    }
    isInverseOf(relation) {
        return false;
    }
    newPivot(data, isGuarded) {
        if (typeof this.pivot === 'string') {
            if (najs_binding_1.ClassRegistry.has(this.pivot)) {
                const instance = najs_binding_1.make(this.pivot);
                if (helpers_1.isModel(instance)) {
                    return instance;
                }
            }
            // the pivot is not a model then we should create an pivot model
            this.pivotDefinition = PivotModel_1.PivotModel.createPivotClass(this.pivot, {
                name: this.pivot,
                foreignKeys: [this.pivotRootKeyName, this.pivotTargetKeyName].sort()
            });
            return Reflect.construct(this.pivotDefinition, Array.from(arguments));
        }
        return Reflect.construct(this.pivot, Array.from(arguments));
    }
    newPivotQuery(name, raw = false) {
        const queryBuilder = this.pivotModel.newQuery(name);
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
    // flattenArguments(...models: Array<T | T[] | CollectJs.Collection<T>>): T[] {
    //   return flatten(
    //     models.map(item => {
    //       return isCollection(item) ? (item as CollectJs.Collection<T>).all() : (item as T | T[])
    //     })
    //   )
    // }
    async attach(id) {
        const result = this.attachByTargetId(id);
        if (typeof result === 'undefined') {
            return this;
        }
        await result;
        return this;
    }
    // attach(...models: Array<T | T[] | CollectJs.Collection<T>>) {
    //   const attachedModels = this.flattenArguments.apply(this, arguments)
    //   attachedModels.forEach(function(model: T) {
    //     if (model.isNew()) {
    //       // model.once(ModelEvent.Saved, async function() {
    //       // })
    //     }
    //   })
    // }
    attachByTargetId(targetId) {
        const pivot = this.newPivot();
        pivot.setAttribute(this.pivotTargetKeyName, targetId);
        const rootPrimaryKey = this.rootModel.getAttribute(this.rootKeyName);
        if (rootPrimaryKey) {
            pivot.setAttribute(this.pivotRootKeyName, rootPrimaryKey);
            return pivot.save();
        }
        this.rootModel.once(ModelEvent_1.ModelEvent.Saved, async () => {
            pivot.setAttribute(this.pivotRootKeyName, this.rootModel.getAttribute(this.rootKeyName));
            await pivot.save();
        });
        return undefined;
    }
}
ManyToMany.className = constants_1.NajsEloquent.Relation.Relationship.ManyToMany;
exports.ManyToMany = ManyToMany;
najs_binding_1.register(ManyToMany, constants_1.NajsEloquent.Relation.Relationship.ManyToMany);
