"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const najs_binding_1 = require("najs-binding");
const constants_1 = require("../constants");
const factory_1 = require("../util/factory");
function relationFeatureOf(model) {
    return model.getDriver().getRelationFeature();
}
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
        relationFeatureOf(instance).setDataBucket(instance, this);
        return instance;
    }
    getRecords(model) {
        const key = relationFeatureOf(model).createKeyForDataBucket(model);
        if (typeof this.bucket[key] === 'undefined') {
            this.bucket[key] = factory_1.make_collection({});
        }
        return this.bucket[key];
    }
}
exports.RelationDataBucket = RelationDataBucket;
najs_binding_1.register(RelationDataBucket, constants_1.NajsEloquent.Relation.RelationDataBucket);
