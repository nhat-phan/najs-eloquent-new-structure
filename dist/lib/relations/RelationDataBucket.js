"use strict";
/// <reference path="../definitions/relations/IRelationDataBucket.ts" />
/// <reference path="../definitions/collect.js/index.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const najs_binding_1 = require("najs-binding");
const constants_1 = require("../constants");
const factory_1 = require("../util/factory");
const accessors_1 = require("../util/accessors");
const GenericData_1 = require("../util/GenericData");
class RelationDataBucket {
    constructor() {
        this.bucket = {};
    }
    getClassName() {
        return constants_1.NajsEloquent.Relation.RelationDataBucket;
    }
    add(model) {
        this.getRecords(model).put(model.getPrimaryKey(), model.getRecord());
        return this;
    }
    makeModel(model, record) {
        const instance = najs_binding_1.make(najs_binding_1.getClassName(model), [record, false]);
        accessors_1.relationFeatureOf(instance).setDataBucket(instance, this);
        return instance;
    }
    getRecords(model) {
        return this.bucket[this.createKey(model)].records;
    }
    getMetadata(model) {
        return this.bucket[this.createKey(model)].metadata;
    }
    createKey(model) {
        const key = accessors_1.relationFeatureOf(model).createKeyForDataBucket(model);
        if (typeof this.bucket[key] === 'undefined') {
            this.bucket[key] = {
                records: factory_1.make_collection({}),
                metadata: new GenericData_1.GenericData({})
            };
        }
        return key;
    }
}
exports.RelationDataBucket = RelationDataBucket;
najs_binding_1.register(RelationDataBucket, constants_1.NajsEloquent.Relation.RelationDataBucket);
