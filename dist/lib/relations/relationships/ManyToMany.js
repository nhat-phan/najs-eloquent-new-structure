"use strict";
/// <reference path="../../definitions/collect.js/index.d.ts" />
/// <reference path="../../definitions/model/IModel.ts" />
/// <reference path="../../definitions/data/IDataReader.ts" />
/// <reference path="../../definitions/relations/IRelationship.ts" />
/// <reference path="../../definitions/relations/IRelationDataBucket.ts" />
/// <reference path="../../definitions/relations/IManyToManyRelationship.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
// import { flatten } from 'lodash'
const najs_binding_1 = require("najs-binding");
const ManyToManyBase_1 = require("./ManyToManyBase");
const RelationshipType_1 = require("../RelationshipType");
const constants_1 = require("../../constants");
// import { isModel, isCollection } from '../../util/helpers'
const ModelEvent_1 = require("../../model/ModelEvent");
const RelationUtilities_1 = require("../RelationUtilities");
const factory_1 = require("../../util/factory");
const DataConditionMatcher_1 = require("../../data/DataConditionMatcher");
class ManyToMany extends ManyToManyBase_1.ManyToManyBase {
    getType() {
        return RelationshipType_1.RelationshipType.ManyToMany;
    }
    getClassName() {
        return constants_1.NajsEloquent.Relation.Relationship.ManyToMany;
    }
    collectPivotData(dataBucket) {
        const rootPrimaryKey = this.rootModel.getAttribute(this.rootKeyName);
        if (!rootPrimaryKey) {
            return {};
        }
        const dataBuffer = dataBucket.getDataOf(this.pivotModel);
        const reader = dataBuffer.getDataReader();
        const raw = dataBuffer
            .getCollector()
            .filterBy({
            $and: [new DataConditionMatcher_1.DataConditionMatcher(this.pivotRootKeyName, '=', rootPrimaryKey, reader)]
        })
            .exec();
        const pivotTargetKeyName = this.pivotTargetKeyName;
        return raw.reduce(function (memo, item) {
            const targetPrimaryKey = reader.getAttribute(item, pivotTargetKeyName);
            memo[targetPrimaryKey.toString()] = item;
            return memo;
        }, {});
    }
    collectData() {
        const dataBucket = this.getDataBucket();
        if (!dataBucket) {
            return factory_1.make_collection([]);
        }
        const pivotData = this.collectPivotData(dataBucket);
        const dataBuffer = dataBucket.getDataOf(this.targetModel);
        const reader = dataBuffer.getDataReader();
        const collector = dataBuffer.getCollector().filterBy({
            $and: [new DataConditionMatcher_1.DataConditionMatcher(this.targetKeyName, 'in', Object.keys(pivotData), reader)]
        });
        const pivotModel = this.pivotModel;
        return factory_1.make_collection(collector.exec(), item => {
            const instance = dataBucket.makeModel(this.targetModel, item);
            const targetPrimaryKey = reader.getAttribute(item, this.targetKeyName).toString();
            instance['pivot'] = dataBucket.makeModel(pivotModel, pivotData[targetPrimaryKey]);
            return instance;
        });
    }
    async fetchPivotData(type) {
        const name = `${this.getType()}Pivot:${this.targetModel.getModelName()}-${this.rootModel.getModelName()}`;
        if (type === 'lazy') {
            return this.newPivotQuery(name).get();
        }
        const dataBucket = this.getDataBucket();
        if (!dataBucket) {
            return factory_1.make_collection([]);
        }
        const query = this.newPivotQuery(name, true);
        const ids = RelationUtilities_1.RelationUtilities.getAttributeListInDataBucket(dataBucket, this.rootModel, this.rootKeyName);
        return query.whereIn(this.pivotRootKeyName, ids).get();
    }
    async fetchData(type) {
        const pivotData = await this.fetchPivotData(type);
        const queryName = `${this.getType()}:${this.targetModel.getModelName()}-${this.rootModel.getModelName()}`;
        const query = this.getQueryBuilder(queryName);
        const targetKeysInPivot = pivotData.map(item => item.getAttribute(this.pivotTargetKeyName)).all();
        return query.whereIn(this.targetKeyName, targetKeysInPivot).get();
    }
    async attach(id) {
        const result = this.attachByTargetId(id);
        if (typeof result === 'undefined') {
            return this;
        }
        await result;
        return this;
    }
    // flattenArguments(...models: Array<T | T[] | CollectJs.Collection<T>>): T[] {
    //   return flatten(
    //     models.map(item => {
    //       return isCollection(item) ? (item as CollectJs.Collection<T>).all() : (item as T | T[])
    //     })
    //   )
    // }
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
