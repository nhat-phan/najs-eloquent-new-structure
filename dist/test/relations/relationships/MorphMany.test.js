"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const Sinon = require("sinon");
const Helpers = require("../../../lib/util/helpers");
const MorphMany_1 = require("../../../lib/relations/relationships/MorphMany");
const HasOneOrMany_1 = require("../../../lib/relations/relationships/HasOneOrMany");
const Relationship_1 = require("../../../lib/relations/Relationship");
const RelationshipType_1 = require("../../../lib/relations/RelationshipType");
const MorphManyExecutor_1 = require("../../../lib/relations/relationships/executors/MorphManyExecutor");
const factory_1 = require("../../../lib/util/factory");
const RelationUtilities_1 = require("../../../lib/relations/RelationUtilities");
describe('MorphMany', function () {
    it('extends HasOneOrMany and implements Autoload under name "NajsEloquent.Relation.Relationship.MorphMany"', function () {
        const rootModel = {};
        const morphMany = new MorphMany_1.MorphMany(rootModel, 'test', 'Target', 'target_type', 'target_id', 'id');
        expect(morphMany).toBeInstanceOf(HasOneOrMany_1.HasOneOrMany);
        expect(morphMany).toBeInstanceOf(Relationship_1.Relationship);
        expect(morphMany.getClassName()).toEqual('NajsEloquent.Relation.Relationship.MorphMany');
    });
    describe('.getType()', function () {
        it('returns literal string "MorphMany"', function () {
            const rootModel = {};
            const morphMany = new MorphMany_1.MorphMany(rootModel, 'test', 'Target', 'target_type', 'target_id', 'id');
            expect(morphMany.getType()).toEqual(RelationshipType_1.RelationshipType.MorphMany);
        });
    });
    describe('.getExecutor()', function () {
        it('returns an cached instance of MorphManyExecutor in property "executor"', function () {
            const isModelStub = Sinon.stub(Helpers, 'isModel');
            const findMorphTypeSpy = Sinon.spy(Relationship_1.Relationship, 'findMorphType');
            isModelStub.returns(true);
            const rootModel = {
                getModelName() {
                    return 'Root';
                }
            };
            const morphMany = new MorphMany_1.MorphMany(rootModel, 'test', 'Target', 'target_type', 'target_id', 'id');
            morphMany['targetModelInstance'] = {};
            const getDataBucketStub = Sinon.stub(morphMany, 'getDataBucket');
            getDataBucketStub.returns({});
            expect(morphMany.getExecutor()).toBeInstanceOf(MorphManyExecutor_1.MorphManyExecutor);
            expect(morphMany.getExecutor()['targetMorphTypeName']).toEqual('target_type');
            expect(morphMany.getExecutor()['morphTypeValue']).toEqual('Root');
            expect(morphMany.getExecutor() === morphMany['executor']).toBe(true);
            expect(findMorphTypeSpy.calledWith(rootModel)).toBe(true);
            findMorphTypeSpy.restore();
            isModelStub.restore();
        });
    });
    describe('.associate()', function () {
        it('is chainable, calls RelationUtilities.associateMany() with a setTargetAttributes which sets targetKeyName and targetMorphTypeName to target model', function () {
            const stub = Sinon.stub(MorphMany_1.MorphMany, 'findMorphType');
            stub.returns('MorphType');
            const rootModel = {
                getAttribute() {
                    return 'anything';
                },
                getModelName() {
                    return 'ModelName';
                },
                once() { }
            };
            const model1 = {
                setAttribute() { },
                save() {
                    return Promise.resolve(true);
                }
            };
            const model2 = {
                setAttribute() { },
                save() {
                    return Promise.resolve(true);
                }
            };
            const model3 = {
                setAttribute() { },
                save() {
                    return Promise.resolve(true);
                }
            };
            const model4 = {
                setAttribute() { },
                save() {
                    return Promise.resolve(true);
                }
            };
            const hasMany = new MorphMany_1.MorphMany(rootModel, 'test', 'Target', 'target_type', 'target_id', 'id');
            const setAttribute1Spy = Sinon.spy(model1, 'setAttribute');
            const setAttribute2Spy = Sinon.spy(model2, 'setAttribute');
            const setAttribute3Spy = Sinon.spy(model3, 'setAttribute');
            const setAttribute4Spy = Sinon.spy(model4, 'setAttribute');
            const spy = Sinon.spy(RelationUtilities_1.RelationUtilities, 'associateMany');
            expect(hasMany.associate(model1, [model2], factory_1.make_collection([model3, model4])) === hasMany).toBe(true);
            expect(stub.calledWith('ModelName')).toBe(true);
            expect(spy.calledWith([model1, [model2], factory_1.make_collection([model3, model4])], rootModel, 'id')).toBe(true);
            expect(setAttribute1Spy.firstCall.calledWith('target_id', 'anything')).toBe(true);
            expect(setAttribute1Spy.secondCall.calledWith('target_type', 'MorphType')).toBe(true);
            expect(setAttribute2Spy.firstCall.calledWith('target_id', 'anything')).toBe(true);
            expect(setAttribute2Spy.secondCall.calledWith('target_type', 'MorphType')).toBe(true);
            expect(setAttribute3Spy.firstCall.calledWith('target_id', 'anything')).toBe(true);
            expect(setAttribute3Spy.secondCall.calledWith('target_type', 'MorphType')).toBe(true);
            expect(setAttribute4Spy.firstCall.calledWith('target_id', 'anything')).toBe(true);
            expect(setAttribute4Spy.secondCall.calledWith('target_type', 'MorphType')).toBe(true);
            stub.restore();
        });
    });
});
