"use strict";
/// <reference path="../definitions/model/IModel.ts" />
/// <reference path="../definitions/relations/IRelation.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const RelationState_1 = require("./RelationState");
const accessors_1 = require("../util/accessors");
const RelationUtilities_1 = require("./RelationUtilities");
class RelationBase {
    constructor(rootModel, name, utilities) {
        this.rootModel = rootModel;
        this.name = name;
        this.utils = utilities || new RelationUtilities_1.RelationUtilities(this);
    }
    getRelationData() {
        return {};
    }
    isLoaded() {
        return (this.getRelationData().state === RelationState_1.RelationState.Loaded ||
            this.utils.isRelationLoadedInDataBucket(this.rootModel, this.name));
    }
    getData() {
        if (this.isLoaded()) {
            return undefined;
        }
        const relationData = this.getRelationData();
        if (relationData.state === RelationState_1.RelationState.Built) {
            return relationData.data;
        }
        // TODO: here
        return undefined;
    }
    async load() {
        const relationData = this.getRelationData();
        if (relationData.state === RelationState_1.RelationState.Built) {
            return relationData.data;
        }
        // here
        return undefined;
    }
    getDataBucket() {
        return accessors_1.relationFeatureOf(this.rootModel).getDataBucket(this.rootModel);
    }
}
exports.RelationBase = RelationBase;
