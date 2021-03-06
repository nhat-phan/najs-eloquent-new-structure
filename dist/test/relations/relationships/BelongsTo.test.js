"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const Sinon = require("sinon");
const BelongsTo_1 = require("../../../lib/relations/relationships/BelongsTo");
const HasOneOrMany_1 = require("../../../lib/relations/relationships/HasOneOrMany");
const Relationship_1 = require("../../../lib/relations/Relationship");
const RelationshipType_1 = require("../../../lib/relations/RelationshipType");
const HasOneExecutor_1 = require("../../../lib/relations/relationships/executors/HasOneExecutor");
describe('BelongsTo', function () {
    it('extends HasOneOrMany and implements Autoload under name "NajsEloquent.Relation.Relationship.BelongsTo"', function () {
        const rootModel = {};
        const belongsTo = new BelongsTo_1.BelongsTo(rootModel, 'test', 'Target', 'target_id', 'id');
        expect(belongsTo).toBeInstanceOf(HasOneOrMany_1.HasOneOrMany);
        expect(belongsTo).toBeInstanceOf(Relationship_1.Relationship);
        expect(belongsTo.getClassName()).toEqual('NajsEloquent.Relation.Relationship.BelongsTo');
    });
    describe('.getType()', function () {
        it('returns literal string "BelongsTo"', function () {
            const rootModel = {};
            const belongsTo = new BelongsTo_1.BelongsTo(rootModel, 'test', 'Target', 'target_id', 'id');
            expect(belongsTo.getType()).toEqual(RelationshipType_1.RelationshipType.BelongsTo);
        });
    });
    describe('.getExecutor()', function () {
        it('returns an cached instance of HasOneExecutor in property "executor"', function () {
            const rootModel = {};
            const belongsTo = new BelongsTo_1.BelongsTo(rootModel, 'test', 'Target', 'target_id', 'id');
            belongsTo['targetModelInstance'] = {};
            const getDataBucketStub = Sinon.stub(belongsTo, 'getDataBucket');
            getDataBucketStub.returns({});
            expect(belongsTo.getExecutor()).toBeInstanceOf(HasOneExecutor_1.HasOneExecutor);
            expect(belongsTo.getExecutor() === belongsTo['executor']).toBe(true);
        });
    });
    describe('.dissociate()', function () {
        it('is NOT chainable, simply set attributes "rootKey" of rootModel to empty value which get from RelationFeature.getEmptyValueForRelationshipForeignKey()', function () {
            const relationFeature = {
                getEmptyValueForRelationshipForeignKey() {
                    return 'anything';
                }
            };
            const rootModel = {
                getDriver() {
                    return {
                        getRelationFeature() {
                            return relationFeature;
                        }
                    };
                },
                setAttribute() {
                    return undefined;
                }
            };
            const getEmptyValueForRelationshipForeignKeySpy = Sinon.spy(relationFeature, 'getEmptyValueForRelationshipForeignKey');
            const setAttributeSpy = Sinon.spy(rootModel, 'setAttribute');
            const belongsTo = new BelongsTo_1.BelongsTo(rootModel, 'test', 'Parent', 'id', 'parent_id');
            expect(belongsTo.dissociate()).toBeUndefined();
            expect(getEmptyValueForRelationshipForeignKeySpy.calledWith(rootModel, 'parent_id')).toBe(true);
            expect(setAttributeSpy.calledWith('parent_id', 'anything')).toBe(true);
        });
    });
});
