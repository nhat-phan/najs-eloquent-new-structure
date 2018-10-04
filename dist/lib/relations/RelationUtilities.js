"use strict";
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
    }
};
