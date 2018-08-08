"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RelationUtilities {
    constructor(relation) {
        this.relation = relation;
    }
    extractSamplesFrom(result) {
        return [];
    }
    isRelationLoadedInDataBucket(model, relationName) {
        const bucket = this.relation.getDataBucket();
        if (!bucket) {
            return false;
        }
        return (bucket
            .getMetadata(model)
            .get('loaded', [])
            .indexOf(relationName) !== -1);
    }
    setRelationLoadedInDataBucket(model, relationName) {
        const bucket = this.relation.getDataBucket();
        if (!bucket) {
            return;
        }
        const metadata = bucket.getMetadata(model);
        if (!metadata.exists('loaded')) {
            metadata.set('loaded', []);
        }
        metadata.get('loaded').push(relationName);
    }
}
exports.RelationUtilities = RelationUtilities;
