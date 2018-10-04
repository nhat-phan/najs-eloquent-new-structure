"use strict";
/// <reference path="../../definitions/model/IModel.ts" />
/// <reference path="../../definitions/model/IModelRelation.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelationPublicApi = {
    getRelationshipByName(name) {
        return this.driver.getRelationFeature().findByName(this, name);
    },
    defineRelation(name) {
        return this.driver
            .getRelationFeature()
            .findDataByName(this, name)
            .getFactory();
    }
};
