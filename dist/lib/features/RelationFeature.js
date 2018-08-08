"use strict";
/// <reference path="../definitions/model/IModel.ts" />
/// <reference path="../definitions/features/IRelationFeature.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const najs_binding_1 = require("najs-binding");
const FeatureBase_1 = require("./FeatureBase");
const constants_1 = require("../constants");
const RelationDataBucket_1 = require("../relations/RelationDataBucket");
class RelationFeature extends FeatureBase_1.FeatureBase {
    getPublicApi() {
        return {};
    }
    getFeatureName() {
        return 'Relation';
    }
    getClassName() {
        return constants_1.NajsEloquent.Feature.RelationFeature;
    }
    makeDataBucket(model) {
        return new RelationDataBucket_1.RelationDataBucket();
    }
    getDataBucket(model) {
        return this.useInternalOf(model).relationDataBucket;
    }
    setDataBucket(model, dataBucket) {
        this.useInternalOf(model).relationDataBucket = dataBucket;
    }
    createKeyForDataBucket(model) {
        return this.useRecordManagerOf(model).getRecordName(model);
    }
}
exports.RelationFeature = RelationFeature;
najs_binding_1.register(RelationFeature, constants_1.NajsEloquent.Feature.RelationFeature);
