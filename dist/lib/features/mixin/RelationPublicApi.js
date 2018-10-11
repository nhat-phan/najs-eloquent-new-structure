"use strict";
/// <reference path="../../definitions/model/IModel.ts" />
/// <reference path="../../definitions/model/IModelRelation.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
exports.RelationPublicApi = {
    getRelationshipByName(name) {
        return this.driver.getRelationFeature().findByName(this, name);
    },
    defineRelation(name) {
        return this.driver
            .getRelationFeature()
            .findDataByName(this, name)
            .getFactory();
    },
    load(...args) {
        const relationNames = lodash_1.flatten(arguments);
        return Promise.all(relationNames.map(name => {
            return this.getRelationshipByName(name).load();
        }));
    }
};
