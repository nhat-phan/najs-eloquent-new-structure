"use strict";
/// <reference path="../definitions/model/IModel.ts" />
/// <reference path="../definitions/relations/IRelationship.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const najs_binding_1 = require("najs-binding");
const lodash_1 = require("lodash");
const accessors_1 = require("../util/accessors");
const RelationUtilities_1 = require("./RelationUtilities");
const functions_1 = require("../util/functions");
const RelationNotFoundInNewInstanceError_1 = require("../errors/RelationNotFoundInNewInstanceError");
// import { isModel, isCollection } from '../util/helpers'
class Relationship {
    constructor(rootModel, name) {
        this.rootModel = rootModel;
        this.name = name;
        this.loadChains = [];
    }
    get targetModel() {
        if (!this.targetModelInstance) {
            this.targetModelInstance = najs_binding_1.make(this.targetDefinition);
        }
        return this.targetModelInstance;
    }
    getName() {
        return this.name;
    }
    getRelationData() {
        return accessors_1.relationFeatureOf(this.rootModel).findDataByName(this.rootModel, this.name);
    }
    getDataBucket() {
        return accessors_1.relationFeatureOf(this.rootModel).getDataBucket(this.rootModel);
    }
    with(...relations) {
        this.loadChains = functions_1.array_unique(this.loadChains, lodash_1.flatten(arguments).filter(item => item !== ''));
        return this;
    }
    isLoaded() {
        return this.getRelationData().isLoaded() || RelationUtilities_1.RelationUtilities.isLoadedInDataBucket(this, this.rootModel, this.name);
    }
    getData() {
        if (!this.isLoaded()) {
            return undefined;
        }
        const relationData = this.getRelationData();
        if (relationData.hasData()) {
            return relationData.getData();
        }
        return this.markInverseRelationsToLoaded(relationData.setData(this.collectData()));
    }
    markInverseRelationsToLoaded(result) {
        // TODO: implementation needed
        // if (!result) {
        //   return result
        // }
        // if (isModel(result)) {
        // }
        // if (isCollection(result)) {
        // }
        return result;
    }
    async lazyLoad() {
        return this.loadData('lazy');
    }
    async eagerLoad() {
        return this.loadData('eager');
    }
    // protected distinctModelByClassInCollection(collection: CollectJs.Collection<Model>) {
    //   const result: Model[] = []
    //   if (!isCollection(collection) || collection.isEmpty()) {
    //     return result
    //   }
    //   const collected = {}
    //   for (let i = 0, l = collection.count(); i < l; i++) {
    //     const model = collection.get(i)!
    //     if (collected[model.getModelName()] === true) {
    //       continue
    //     }
    //     collected[model.getModelName()] = true
    //     result.push(model)
    //   }
    //   return result
    // }
    async loadData(type) {
        // const relationData = this.getRelationData().setLoadType(type)
        this.getRelationData().setLoadType(type);
        const result = await this.fetchData(type);
        // return this.loadChainRelations(result)
        // return type === 'lazy' ? relationData.setData(result) : result
        return result;
    }
    async load() {
        if (this.isLoaded()) {
            return this.getData();
        }
        const dataBucket = this.getDataBucket();
        if (!dataBucket) {
            if (this.rootModel.isNew()) {
                throw new RelationNotFoundInNewInstanceError_1.RelationNotFoundInNewInstanceError(this.name, this.rootModel.getModelName());
            }
            return await this.lazyLoad();
        }
        return await this.eagerLoad();
    }
}
exports.Relationship = Relationship;
