"use strict";
/// <reference path="../definitions/model/IModel.ts" />
/// <reference path="../definitions/features/IRelationFeature.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const najs_binding_1 = require("najs-binding");
const FeatureBase_1 = require("./FeatureBase");
const constants_1 = require("../constants");
const RelationDataBucket_1 = require("../relations/RelationDataBucket");
const RelationData_1 = require("../relations/RelationData");
const RelationFactory_1 = require("../relations/RelationFactory");
const RelationPublicApi_1 = require("./mixin/RelationPublicApi");
const RelationNotDefinedError_1 = require("../errors/RelationNotDefinedError");
const RelationDefinitionFinder_1 = require("../relations/RelationDefinitionFinder");
const functions_1 = require("../util/functions");
class RelationFeature extends FeatureBase_1.FeatureBase {
    getPublicApi() {
        return RelationPublicApi_1.RelationPublicApi;
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
    makeFactory(model, accessor) {
        return new RelationFactory_1.RelationFactory(model, accessor);
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
    getDefinitions(model) {
        return this.useInternalOf(model).relationDefinitions;
    }
    buildDefinitions(model, prototype, bases) {
        const finder = new RelationDefinitionFinder_1.RelationDefinitionFinder(model, prototype, bases);
        return finder.getDefinitions();
    }
    findByName(model, name) {
        const internalModel = this.useInternalOf(model);
        const info = functions_1.parse_string_with_dot_notation(name);
        if (typeof internalModel.relationDefinitions === 'undefined' ||
            typeof internalModel.relationDefinitions[info.first] === 'undefined') {
            throw new RelationNotDefinedError_1.RelationNotDefinedError(info.first, internalModel.getModelName());
        }
        const definition = internalModel.relationDefinitions[info.first];
        const relation = definition.targetType === 'getter'
            ? internalModel[definition.target]
            : internalModel[definition.target].call(this);
        if (info.afterFirst) {
            relation.with(info.afterFirst);
        }
        return relation;
    }
    findDataByName(model, name) {
        const internalModel = this.useInternalOf(model);
        if (typeof internalModel.relations[name] === 'undefined') {
            internalModel.relations[name] = new RelationData_1.RelationData(this.makeFactory(model, name));
            this.defineAccessor(model, name);
        }
        return internalModel.relations[name];
    }
    defineAccessor(model, accessor) {
        const prototype = Object.getPrototypeOf(model);
        const propertyDescriptor = Object.getOwnPropertyDescriptor(prototype, accessor);
        if (!propertyDescriptor) {
            Object.defineProperty(prototype, accessor, {
                get: function () {
                    return this.getRelationByName(accessor).getData();
                }
            });
        }
    }
}
exports.RelationFeature = RelationFeature;
najs_binding_1.register(RelationFeature, constants_1.NajsEloquent.Feature.RelationFeature);
