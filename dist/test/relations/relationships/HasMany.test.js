"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const Sinon = require("sinon");
const HasMany_1 = require("../../../lib/relations/relationships/HasMany");
const HasOneOrMany_1 = require("../../../lib/relations/relationships/HasOneOrMany");
const Relationship_1 = require("../../../lib/relations/Relationship");
const RelationshipType_1 = require("../../../lib/relations/RelationshipType");
const ManyRowsExecutor_1 = require("../../../lib/relations/relationships/executors/ManyRowsExecutor");
describe('HasOne', function () {
    it('extends HasOneOrMany and implements Autoload under name "NajsEloquent.Relation.Relationship.HasMany"', function () {
        const rootModel = {};
        const hasMany = new HasMany_1.HasMany(rootModel, 'test', 'Target', 'target_id', 'id');
        expect(hasMany).toBeInstanceOf(HasOneOrMany_1.HasOneOrMany);
        expect(hasMany).toBeInstanceOf(Relationship_1.Relationship);
        expect(hasMany.getClassName()).toEqual('NajsEloquent.Relation.Relationship.HasMany');
    });
    describe('.getType()', function () {
        it('returns literal string "HasMany"', function () {
            const rootModel = {};
            const hasMany = new HasMany_1.HasMany(rootModel, 'test', 'Target', 'target_id', 'id');
            expect(hasMany.getType()).toEqual(RelationshipType_1.RelationshipType.HasMany);
        });
    });
    describe('.getExecutor()', function () {
        it('returns an cached instance of ManyRowsExecutor in property "executor"', function () {
            const rootModel = {};
            const hasMany = new HasMany_1.HasMany(rootModel, 'test', 'Target', 'target_id', 'id');
            hasMany['targetModelInstance'] = {};
            const getDataBucketStub = Sinon.stub(hasMany, 'getDataBucket');
            getDataBucketStub.returns({});
            expect(hasMany.getExecutor()).toBeInstanceOf(ManyRowsExecutor_1.ManyRowsExecutor);
            expect(hasMany.getExecutor() === hasMany['executor']).toBe(true);
        });
    });
    describe('.associate()', function () {
        it('is chainable, sets targetKeyName with key get from root model, then save the model when root model get saved', async function () {
            const rootModel = {
                getAttribute() {
                    return 'anything';
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
            const hasMany = new HasMany_1.HasMany(rootModel, 'test', 'Target', 'target_id', 'id');
            const onceSpy = Sinon.spy(rootModel, 'once');
            const setAttribute1Spy = Sinon.spy(model1, 'setAttribute');
            const setAttribute2Spy = Sinon.spy(model2, 'setAttribute');
            const setAttribute3Spy = Sinon.spy(model3, 'setAttribute');
            const save1Spy = Sinon.spy(model1, 'save');
            const save2Spy = Sinon.spy(model2, 'save');
            const save3Spy = Sinon.spy(model3, 'save');
            expect(hasMany.associate(model1, [model2, model3]) === hasMany).toBe(true);
            expect(setAttribute1Spy.calledWith('target_id', 'anything')).toBe(true);
            expect(setAttribute2Spy.calledWith('target_id', 'anything')).toBe(true);
            expect(setAttribute3Spy.calledWith('target_id', 'anything')).toBe(true);
            expect(onceSpy.calledWith('saved')).toBe(true);
            expect(save1Spy.called).toBe(false);
            expect(save2Spy.called).toBe(false);
            expect(save3Spy.called).toBe(false);
            const handler = onceSpy.lastCall.args[1];
            handler();
            expect(save1Spy.called).toBe(true);
            expect(save2Spy.called).toBe(true);
            expect(save3Spy.called).toBe(true);
        });
        it('is chainable, sets targetKeyName after root model get saved if the key in rootModel is not found', function () {
            const rootModel = {
                getAttribute() {
                    return undefined;
                },
                once() { }
            };
            const model1 = {
                setAttribute() {
                    return this;
                },
                save() {
                    return Promise.resolve(true);
                }
            };
            const model2 = {
                setAttribute() {
                    return this;
                },
                save() {
                    return Promise.resolve(true);
                }
            };
            const model3 = {
                setAttribute() {
                    return this;
                },
                save() {
                    return Promise.resolve(true);
                }
            };
            const hasMany = new HasMany_1.HasMany(rootModel, 'test', 'Target', 'target_id', 'id');
            const onceSpy = Sinon.spy(rootModel, 'once');
            const setAttribute1Spy = Sinon.spy(model1, 'setAttribute');
            const setAttribute2Spy = Sinon.spy(model2, 'setAttribute');
            const setAttribute3Spy = Sinon.spy(model3, 'setAttribute');
            const save1Spy = Sinon.spy(model1, 'save');
            const save2Spy = Sinon.spy(model2, 'save');
            const save3Spy = Sinon.spy(model3, 'save');
            expect(hasMany.associate([model1, model2, model3]) === hasMany).toBe(true);
            expect(setAttribute1Spy.called).toBe(false);
            expect(setAttribute2Spy.called).toBe(false);
            expect(setAttribute3Spy.called).toBe(false);
            expect(onceSpy.calledWith('saved')).toBe(true);
            expect(save1Spy.called).toBe(false);
            expect(save2Spy.called).toBe(false);
            expect(save3Spy.called).toBe(false);
            const handler = onceSpy.lastCall.args[1];
            handler();
            expect(save1Spy.called).toBe(true);
            expect(save2Spy.called).toBe(true);
            expect(save3Spy.called).toBe(true);
            expect(setAttribute1Spy.called).toBe(true);
            expect(setAttribute2Spy.called).toBe(true);
            expect(setAttribute3Spy.called).toBe(true);
        });
    });
});
