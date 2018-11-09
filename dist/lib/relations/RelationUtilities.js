"use strict";
/// <reference path="../definitions/relations/IRelationship.ts" />
/// <reference path="../definitions/relations/IRelationDataBucket.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const ModelEvent_1 = require("./../model/ModelEvent");
exports.RelationUtilities = {
    bundleRelations(relations) {
        return Object.values(relations.reduce(function (memo, relation) {
            if (typeof memo[relation.getName()] === 'undefined') {
                memo[relation.getName()] = relation;
            }
            else {
                memo[relation.getName()].with(relation.getChains());
            }
            return memo;
        }, {}));
    },
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
    },
    associateOne(model, rootModel, rootKeyName, setTargetAttributes) {
        // root provides primary key for target, whenever the root get saved target should be updated as well
        const primaryKey = rootModel.getAttribute(rootKeyName);
        if (!primaryKey) {
            rootModel.once(ModelEvent_1.ModelEvent.Saved, async () => {
                setTargetAttributes(model);
                await model.save();
            });
            return;
        }
        setTargetAttributes(model);
        rootModel.once(ModelEvent_1.ModelEvent.Saved, async () => {
            await model.save();
        });
    }
};
