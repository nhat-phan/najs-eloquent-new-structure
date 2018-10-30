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
describe('HasMany', function () {
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
});
