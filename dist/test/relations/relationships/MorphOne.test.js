"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const Sinon = require("sinon");
const Helpers = require("../../../lib/util/helpers");
const MorphOne_1 = require("../../../lib/relations/relationships/MorphOne");
const HasOneOrMany_1 = require("../../../lib/relations/relationships/HasOneOrMany");
const Relationship_1 = require("../../../lib/relations/Relationship");
const RelationshipType_1 = require("../../../lib/relations/RelationshipType");
const MorphOneExecutor_1 = require("../../../lib/relations/relationships/executors/MorphOneExecutor");
describe('HasOne', function () {
    it('extends HasOneOrMany and implements Autoload under name "NajsEloquent.Relation.Relationship.MorphOne"', function () {
        const rootModel = {};
        const morphOne = new MorphOne_1.MorphOne(rootModel, 'test', 'Target', 'target_type', 'target_id', 'id');
        expect(morphOne).toBeInstanceOf(HasOneOrMany_1.HasOneOrMany);
        expect(morphOne).toBeInstanceOf(Relationship_1.Relationship);
        expect(morphOne.getClassName()).toEqual('NajsEloquent.Relation.Relationship.MorphOne');
    });
    describe('.getType()', function () {
        it('returns literal string "MorphOne"', function () {
            const rootModel = {};
            const morphOne = new MorphOne_1.MorphOne(rootModel, 'test', 'Target', 'target_type', 'target_id', 'id');
            expect(morphOne.getType()).toEqual(RelationshipType_1.RelationshipType.MorphOne);
        });
    });
    describe('.getExecutor()', function () {
        it('returns an cached instance of MorphOneExecutor in property "executor"', function () {
            const isModelStub = Sinon.stub(Helpers, 'isModel');
            const findMorphTypeSpy = Sinon.spy(Relationship_1.Relationship, 'findMorphType');
            isModelStub.returns(true);
            const rootModel = {
                getModelName() {
                    return 'Root';
                }
            };
            const morphOne = new MorphOne_1.MorphOne(rootModel, 'test', 'Target', 'target_type', 'target_id', 'id');
            morphOne['targetModelInstance'] = {};
            const getDataBucketStub = Sinon.stub(morphOne, 'getDataBucket');
            getDataBucketStub.returns({});
            expect(morphOne.getExecutor()).toBeInstanceOf(MorphOneExecutor_1.MorphOneExecutor);
            expect(morphOne.getExecutor()['targetMorphTypeName']).toEqual('target_type');
            expect(morphOne.getExecutor()['morphTypeValue']).toEqual('Root');
            expect(morphOne.getExecutor() === morphOne['executor']).toBe(true);
            expect(findMorphTypeSpy.calledWith(rootModel)).toBe(true);
            findMorphTypeSpy.restore();
            isModelStub.restore();
        });
    });
});
