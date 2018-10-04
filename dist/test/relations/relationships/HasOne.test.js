"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const Sinon = require("sinon");
const HasOne_1 = require("../../../lib/relations/relationships/HasOne");
const HasOneOrMany_1 = require("../../../lib/relations/relationships/HasOneOrMany");
const Relationship_1 = require("../../../lib/relations/Relationship");
const RelationshipType_1 = require("../../../lib/relations/RelationshipType");
describe('HasOne', function () {
    it('extends HasOneOrMany and implements Autoload under name "NajsEloquent.Relation.HasOneRelation"', function () {
        const rootModel = {};
        const hasOne = new HasOne_1.HasOne(rootModel, 'test', 'Target', 'target_id', 'id');
        expect(hasOne).toBeInstanceOf(HasOneOrMany_1.HasOneOrMany);
        expect(hasOne).toBeInstanceOf(Relationship_1.Relationship);
        expect(hasOne.getClassName()).toEqual('NajsEloquent.Relation.Relationship.HasOne');
    });
    describe('.getType()', function () {
        it('returns literal string "HasOne"', function () {
            const rootModel = {};
            const hasOne = new HasOne_1.HasOne(rootModel, 'test', 'Target', 'target_id', 'id');
            expect(hasOne.getType()).toEqual(RelationshipType_1.RelationshipType.HasOne);
        });
    });
    describe('.executeCollector()', function () {
        it('calls collector.limit(1) then exec() and returns undefined if there is no result', function () {
            const collector = {
                limit() { },
                exec() { }
            };
            const limitSpy = Sinon.spy(collector, 'limit');
            const execStub = Sinon.stub(collector, 'exec');
            execStub.returns([]);
            const rootModel = {};
            const hasOne = new HasOne_1.HasOne(rootModel, 'test', 'Target', 'target_id', 'id');
            expect(hasOne.executeCollector(collector)).toBeUndefined();
            expect(limitSpy.calledWith(1)).toBe(true);
            expect(execStub.calledWith()).toBe(true);
        });
        it('calls collector.limit(1) then exec(), then create a Model by DataBucket.makeModel() with the first item of result', function () {
            const collector = {
                limit() { },
                exec() { }
            };
            const limitSpy = Sinon.spy(collector, 'limit');
            const execStub = Sinon.stub(collector, 'exec');
            const itemOne = {};
            const itemTwo = {};
            execStub.returns([itemOne, itemTwo]);
            const rootModel = {};
            const hasOne = new HasOne_1.HasOne(rootModel, 'test', 'Target', 'target_id', 'id');
            const targetModel = {};
            hasOne['targetModelInstance'] = targetModel;
            const dataBucket = {
                makeModel(target, data) {
                    return data;
                }
            };
            const getDataBucketStub = Sinon.stub(hasOne, 'getDataBucket');
            getDataBucketStub.returns(dataBucket);
            const spy = Sinon.spy(dataBucket, 'makeModel');
            expect(hasOne.executeCollector(collector) === itemOne).toBe(true);
            expect(limitSpy.calledWith(1)).toBe(true);
            expect(execStub.calledWith()).toBe(true);
            expect(spy.calledWith(targetModel, itemOne)).toBe(true);
        });
    });
    describe('.executeQuery()', function () {
        it('returns query.first()', async function () {
            const rootModel = {};
            const hasOne = new HasOne_1.HasOne(rootModel, 'test', 'Target', 'target_id', 'id');
            const query = {
                async first() {
                    return 'anything';
                }
            };
            expect(await hasOne.executeQuery(query)).toBe('anything');
        });
    });
    describe('.getEmptyValue()', function () {
        it('returns undefined', function () {
            const rootModel = {};
            const hasOne = new HasOne_1.HasOne(rootModel, 'test', 'Target', 'target_id', 'id');
            expect(hasOne.getEmptyValue()).toBeUndefined();
        });
    });
});
