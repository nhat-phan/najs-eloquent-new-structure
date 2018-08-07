"use strict";
/// <reference path="../definitions/relations/IRelationDataBucket.ts" />
/// <reference path="../definitions/collect.js/index.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const najs_binding_1 = require("najs-binding");
const constants_1 = require("../constants");
const factory_1 = require("../util/factory");
class RelationDataBucket {
    constructor() {
        this.bucket = {};
    }
    getClassName() {
        return constants_1.NajsEloquent.Relation.RelationDataBucket;
    }
    gather(model) {
        const key = this.createKeyForModel(model);
        this.bucket[key].put(model.getPrimaryKey(), model.getRecord());
        return this;
    }
    makeModel(model, record) {
        const instance = najs_binding_1.make(najs_binding_1.getClassName(model), [record, false]);
        instance.relationDataBucket = this;
        return instance;
    }
    getRecords(model) {
        return this.bucket[this.createKeyForModel(model)];
    }
    createKeyForModel(model) {
        const key = model.getRecordName();
        if (typeof this.bucket[key] === undefined) {
            this.bucket[key] = factory_1.make_collection([]);
        }
        return key;
    }
}
exports.RelationDataBucket = RelationDataBucket;
najs_binding_1.register(RelationDataBucket, constants_1.NajsEloquent.Relation.RelationDataBucket);
