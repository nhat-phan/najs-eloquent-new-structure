"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelationUtilities = {
    isLoadedInDataBucket(relation, model, name) {
        const bucket = relation.getDataBucket();
        if (!bucket) {
            return false;
        }
        return (bucket
            .getMetadata(model)
            .get('loaded', [])
            .indexOf(name) !== -1);
    },
    markLoadedInDataBucket(relation, model, name) {
        const bucket = relation.getDataBucket();
        if (!bucket) {
            return;
        }
        const metadata = bucket.getMetadata(model);
        if (!metadata.exists('loaded')) {
            metadata.set('loaded', []);
        }
        metadata.get('loaded').push(name);
    }
};
