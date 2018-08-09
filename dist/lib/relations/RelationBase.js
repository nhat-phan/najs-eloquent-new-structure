"use strict";
/// <reference path="../definitions/model/IModel.ts" />
/// <reference path="../definitions/relations/IRelation.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const accessors_1 = require("../util/accessors");
const RelationUtilities_1 = require("./RelationUtilities");
class RelationBase {
    constructor(rootModel, name, utilities) {
        this.rootModel = rootModel;
        this.name = name;
        this.loadChains = [];
        this.utils = utilities || new RelationUtilities_1.RelationUtilities(this);
    }
    getName() {
        return this.name;
    }
    getRelationData() {
        return accessors_1.relationFeatureOf(this.rootModel).findDataByName(this.rootModel, this.name);
    }
    with(...relations) {
        this.loadChains = lodash_1.flatten(arguments).filter(item => item !== '');
        return this;
    }
    isLoaded() {
        return this.getRelationData().isLoaded() || this.utils.isRelationLoadedInDataBucket(this.rootModel, this.name);
    }
    getData() {
        if (this.isLoaded()) {
            return undefined;
        }
        const relationData = this.getRelationData();
        if (relationData.isBuilt()) {
            return relationData.getData();
        }
        // TODO: here
        return undefined;
    }
    async load() {
        const relationData = this.getRelationData();
        if (relationData.isBuilt()) {
            return relationData.getData();
        }
        // here
        return undefined;
    }
    getDataBucket() {
        return accessors_1.relationFeatureOf(this.rootModel).getDataBucket(this.rootModel);
    }
}
exports.RelationBase = RelationBase;
