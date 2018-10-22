"use strict";
/// <reference path="../definitions/relations/IRelationDataBucket.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelationUtilities = {
    isLoadedInDataBucket(relationship, model, name) {
        const bucket = relationship.getDataBucket();
        if (!bucket) {
            return false;
        }
        return bucket.getMetadataOf(model).loaded.indexOf(name) !== -1;
    },
    markLoadedInDataBucket(relationship, model, name) {
        const bucket = relationship.getDataBucket();
        if (!bucket) {
            return;
        }
        bucket.getMetadataOf(model).loaded.push(name);
    },
    getAttributeListInDataBucket(dataBucket, model, attribute) {
        const dataBuffer = dataBucket.getDataOf(model);
        const reader = dataBuffer.getDataReader();
        return dataBuffer.map(item => reader.getAttribute(item, attribute));
    }
};
