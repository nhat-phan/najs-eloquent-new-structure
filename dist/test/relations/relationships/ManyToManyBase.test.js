"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const Sinon = require("sinon");
const najs_binding_1 = require("najs-binding");
const Helpers = require("../../../lib/util/helpers");
const ManyToManyBase_1 = require("../../../lib/relations/relationships/ManyToManyBase");
const ManyToMany_1 = require("../../../lib/relations/relationships/ManyToMany");
const PivotModel_1 = require("../../../lib/relations/relationships/pivot/PivotModel");
describe('ManyToMany', function () {
    it('extends ManyToManyBase class and implements Autoload under name "NajsEloquent.Relation.Relationship.ManyToMany"', function () {
        const rootModel = {};
        const relation = new ManyToMany_1.ManyToMany(rootModel, 'a', 'b', 'c', 'd', 'e', 'f', 'g');
        expect(relation).toBeInstanceOf(ManyToManyBase_1.ManyToManyBase);
        expect(relation.getClassName()).toEqual('NajsEloquent.Relation.Relationship.ManyToMany');
    });
    describe('constructor()', function () {
        it('assigns params to respective attributes', function () {
            const rootModel = {};
            const relation = new ManyToMany_1.ManyToMany(rootModel, 'test', 'target', 'pivot', 'pivot_a', 'pivot_b', 'target_key', 'root_key');
            expect(relation['targetDefinition']).toEqual('target');
            expect(relation['pivot']).toEqual('pivot');
            expect(relation['pivotTargetKeyName']).toEqual('pivot_a');
            expect(relation['pivotRootKeyName']).toEqual('pivot_b');
            expect(relation['targetKeyName']).toEqual('target_key');
            expect(relation['rootKeyName']).toEqual('root_key');
        });
    });
    describe('.isInverseOf()', function () {
        it('always returns false', function () {
            const rootModel = {};
            const relation = new ManyToMany_1.ManyToMany(rootModel, 'a', 'b', 'c', 'd', 'e', 'f', 'g');
            expect(relation.isInverseOf({})).toBe(false);
        });
    });
    describe('get pivotModel()', function () {
        it('returns an property "pivotModelInstance" if there is a created instance', function () {
            const rootModel = {};
            const relation = new ManyToMany_1.ManyToMany(rootModel, 'a', 'b', 'c', 'd', 'e', 'f', 'g');
            const pivot = {};
            relation['pivotModelInstance'] = pivot;
            expect(relation['pivotModel'] === pivot).toBe(true);
        });
        it('calls .newPivot() then set the result to property "pivotModelInstance" if there is no created instance', function () {
            const rootModel = {};
            const relation = new ManyToMany_1.ManyToMany(rootModel, 'a', 'b', 'c', 'd', 'e', 'f', 'g');
            const newPivotStub = Sinon.stub(relation, 'newPivot');
            newPivotStub.returns('anything');
            expect(newPivotStub.called).toBe(false);
            expect(relation['pivotModelInstance']).toBeUndefined();
            expect(relation['pivotModel']).toEqual('anything');
            expect(newPivotStub.called).toBe(true);
        });
    });
    describe('.getQueryBuilder()', function () {
        it('returns a queryBuilder from targetModel, which also contains the dataBucket of relation', function () {
            const rootModel = {};
            const relation = new ManyToMany_1.ManyToMany(rootModel, 'a', 'b', 'c', 'd', 'e', 'f', 'g');
            const queryBuilder = {
                handler: {
                    setRelationDataBucket() { }
                }
            };
            const targetModel = {
                newQuery() {
                    return queryBuilder;
                }
            };
            relation['targetModelInstance'] = targetModel;
            const dataBucket = {};
            const getDataBucketStub = Sinon.stub(relation, 'getDataBucket');
            getDataBucketStub.returns(dataBucket);
            const setRelationDataBucketSpy = Sinon.spy(queryBuilder.handler, 'setRelationDataBucket');
            const newQuerySpy = Sinon.spy(targetModel, 'newQuery');
            expect(relation.getQueryBuilder('name') === queryBuilder).toBe(true);
            expect(newQuerySpy.calledWith('name')).toBe(true);
            expect(setRelationDataBucketSpy.calledWith(dataBucket)).toBe(true);
        });
        it('passes the queryBuilder to .applyCustomQuery() then returns the result', function () {
            const rootModel = {};
            const relation = new ManyToMany_1.ManyToMany(rootModel, 'a', 'b', 'c', 'd', 'e', 'f', 'g');
            const queryBuilder = {
                handler: {
                    setRelationDataBucket() { }
                }
            };
            const targetModel = {
                newQuery() {
                    return queryBuilder;
                }
            };
            relation['targetModelInstance'] = targetModel;
            const dataBucket = {};
            const getDataBucketStub = Sinon.stub(relation, 'getDataBucket');
            getDataBucketStub.returns(dataBucket);
            const setRelationDataBucketSpy = Sinon.spy(queryBuilder.handler, 'setRelationDataBucket');
            const newQuerySpy = Sinon.spy(targetModel, 'newQuery');
            const applyCustomQueryStub = Sinon.stub(relation, 'applyCustomQuery');
            applyCustomQueryStub.returns('anything');
            expect(relation.getQueryBuilder('name')).toEqual('anything');
            expect(newQuerySpy.calledWith('name')).toBe(true);
            expect(setRelationDataBucketSpy.calledWith(dataBucket)).toBe(true);
            expect(applyCustomQueryStub.calledWith(queryBuilder)).toBe(true);
        });
    });
    describe('.newPivot()', function () {
        it('checks class in ClassRegistry, then use make() to makes and returns an instance if it is a Model', function () {
            class A {
            }
            const stub = Sinon.stub(PivotModel_1.PivotModel, 'createPivotClass');
            stub.returns(A);
            class ClassInRegistry {
            }
            najs_binding_1.register(ClassInRegistry, 'class-in-registry');
            const isModelStub = Sinon.stub(Helpers, 'isModel');
            isModelStub.returns(true);
            const rootModel = {};
            const relation = new ManyToMany_1.ManyToMany(rootModel, 'a', 'b', 'class-in-registry', 'd', 'e', 'f', 'g');
            expect(relation.newPivot()).toBeInstanceOf(ClassInRegistry);
            expect(relation['pivotDefinition'] === ClassInRegistry).toBe(true);
            expect(isModelStub.lastCall.args[0]).toBeInstanceOf(ClassInRegistry);
            expect(stub.called).toBe(false);
            stub.restore();
            isModelStub.restore();
        });
        it('calls PivotModel.createPivotClass() and assigns result to pivotDefinition, then use Reflect.construct() to create an instance if pivot not in ClassRegistry', function () {
            class A {
            }
            const stub = Sinon.stub(PivotModel_1.PivotModel, 'createPivotClass');
            stub.returns(A);
            const rootModel = {};
            const relation = new ManyToMany_1.ManyToMany(rootModel, 'a', 'b', 'pivot', 'root_id', 'target_id', 'f', 'g');
            expect(relation.newPivot()).toBeInstanceOf(A);
            expect(relation['pivotDefinition'] === A).toBe(true);
            expect(stub.calledWith('pivot', {
                name: 'pivot',
                foreignKeys: ['root_id', 'target_id']
            })).toBe(true);
            stub.restore();
        });
        it('calls PivotModel.createPivotClass() and assigns result to pivotDefinition, then use Reflect.construct() to create an instance if pivot in ClassRegistry but not Model instance', function () {
            class A {
            }
            const stub = Sinon.stub(PivotModel_1.PivotModel, 'createPivotClass');
            stub.returns(A);
            class ClassInRegistry {
            }
            najs_binding_1.register(ClassInRegistry, 'class-in-registry');
            const rootModel = {};
            const relation = new ManyToMany_1.ManyToMany(rootModel, 'a', 'b', 'class-in-registry', 'target_id', 'root_id', 'f', 'g');
            expect(relation.newPivot()).toBeInstanceOf(A);
            expect(relation['pivotDefinition'] === A).toBe(true);
            expect(stub.calledWith('class-in-registry', {
                name: 'class-in-registry',
                foreignKeys: ['root_id', 'target_id']
            })).toBe(true);
            stub.restore();
        });
        it('simply calls and returns Reflect.construct(this.pivot) if the pivot is a Constructor function', function () {
            class A {
            }
            const rootModel = {};
            const relation = new ManyToMany_1.ManyToMany(rootModel, 'a', 'b', A, 'd', 'e', 'f', 'g');
            expect(relation.newPivot()).toBeInstanceOf(A);
            expect(relation['pivotDefinition'] === A).toBe(true);
        });
        it('can be created with data and isGuarded params', function () {
            class A {
                constructor(data, isGuarded) {
                    this.data = data;
                    this.isGuarded = isGuarded;
                }
            }
            const rootModel = {};
            const relation = new ManyToMany_1.ManyToMany(rootModel, 'a', 'b', A, 'd', 'e', 'f', 'g');
            const data = {};
            const pivot = relation.newPivot(data, false);
            expect(pivot).toBeInstanceOf(A);
            expect(pivot['data'] === data).toBe(true);
            expect(pivot['isGuarded']).toBe(false);
        });
    });
    describe('.newPivotQuery()', function () {
        it('returns a new query of pivot by calls .pivotModel.newQuery(), it also set the relationDataBucket to queryBuilder', function () {
            const queryBuilder = {
                handler: {
                    setRelationDataBucket() { }
                }
            };
            const pivotModel = {
                newQuery() {
                    return queryBuilder;
                }
            };
            const rootModel = {
                getAttribute() {
                    return undefined;
                }
            };
            const relation = new ManyToMany_1.ManyToMany(rootModel, 'a', 'b', 'c', 'd', 'e', 'f', 'g');
            relation['pivotModelInstance'] = pivotModel;
            const dataBucket = {};
            const getDataBucketStub = Sinon.stub(relation, 'getDataBucket');
            getDataBucketStub.returns(dataBucket);
            const setRelationDataBucketSpy = Sinon.spy(queryBuilder.handler, 'setRelationDataBucket');
            const newQuerySpy = Sinon.spy(pivotModel, 'newQuery');
            expect(relation.newPivotQuery('name') === queryBuilder).toBe(true);
            expect(newQuerySpy.calledWith('name')).toBe(true);
            expect(setRelationDataBucketSpy.calledWith(dataBucket)).toBe(true);
        });
        it('link to rootModel if root model has primaryKey', function () {
            const queryBuilder = {
                handler: {
                    setRelationDataBucket() { }
                },
                where() {
                    return this;
                }
            };
            const pivotModel = {
                newQuery() {
                    return queryBuilder;
                }
            };
            const whereSpy = Sinon.spy(queryBuilder, 'where');
            const rootModel = {
                getAttribute() {
                    return 'value';
                }
            };
            const relation = new ManyToMany_1.ManyToMany(rootModel, 'a', 'b', 'c', 'd', 'pivot_root_id', 'f', 'root-id');
            relation['pivotModelInstance'] = pivotModel;
            const dataBucket = {};
            const getDataBucketStub = Sinon.stub(relation, 'getDataBucket');
            getDataBucketStub.returns(dataBucket);
            const setRelationDataBucketSpy = Sinon.spy(queryBuilder.handler, 'setRelationDataBucket');
            const newQuerySpy = Sinon.spy(pivotModel, 'newQuery');
            expect(relation.newPivotQuery('name') === queryBuilder).toBe(true);
            expect(whereSpy.calledWith('pivot_root_id', 'value')).toBe(true);
            expect(newQuerySpy.calledWith('name')).toBe(true);
            expect(setRelationDataBucketSpy.calledWith(dataBucket)).toBe(true);
        });
        it('does not link to rootModel if the second params is true', function () {
            const queryBuilder = {
                handler: {
                    setRelationDataBucket() { }
                }
            };
            const pivotModel = {
                newQuery() {
                    return queryBuilder;
                }
            };
            const rootModel = {
                getAttribute() {
                    return undefined;
                }
            };
            const getAttributeSpy = Sinon.spy(rootModel, 'getAttribute');
            const relation = new ManyToMany_1.ManyToMany(rootModel, 'a', 'b', 'c', 'd', 'e', 'f', 'g');
            relation['pivotModelInstance'] = pivotModel;
            const dataBucket = {};
            const getDataBucketStub = Sinon.stub(relation, 'getDataBucket');
            getDataBucketStub.returns(dataBucket);
            const setRelationDataBucketSpy = Sinon.spy(queryBuilder.handler, 'setRelationDataBucket');
            const newQuerySpy = Sinon.spy(pivotModel, 'newQuery');
            expect(relation.newPivotQuery('name', true) === queryBuilder).toBe(true);
            expect(getAttributeSpy.called).toBe(false);
            expect(newQuerySpy.calledWith('name')).toBe(true);
            expect(setRelationDataBucketSpy.calledWith(dataBucket)).toBe(true);
        });
    });
    describe('.withPivot()', function () {
        it('flattens arguments then assign to this.pivotOptions.fields if there is no fields in options', function () {
            const rootModel = {};
            const relation = new ManyToMany_1.ManyToMany(rootModel, 'a', 'b', 'c', 'd', 'e', 'f', 'g');
            expect(relation.getPivotOptions().fields).toBeUndefined();
            relation.withPivot('a', ['b', 'c']);
            expect(relation.getPivotOptions().fields).toEqual(['a', 'b', 'c']);
        });
        it('merges the arguments to this.pivotOptions.fields if there is some fields in options', function () {
            const rootModel = {};
            const relation = new ManyToMany_1.ManyToMany(rootModel, 'a', 'b', 'c', 'd', 'e', 'f', 'g');
            expect(relation.getPivotOptions().fields).toBeUndefined();
            relation.withPivot('a', ['b', 'c']);
            expect(relation.getPivotOptions().fields).toEqual(['a', 'b', 'c']);
            relation.withPivot('x', ['b'], 'y');
            expect(relation.getPivotOptions().fields).toEqual(['a', 'b', 'c', 'x', 'y']);
        });
    });
});
