"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelationUtilities = {
    isLoadedInDataBucket(relation, model, name) {
        const bucket = relation.getDataBucket();
        if (!bucket) {
            return false;
        }
        return bucket.getMetadataOf(model).loaded.indexOf(name) !== -1;
    },
    markLoadedInDataBucket(relation, model, name) {
        const bucket = relation.getDataBucket();
        if (!bucket) {
            return;
        }
        bucket.getMetadataOf(model).loaded.push(name);
    }
};
