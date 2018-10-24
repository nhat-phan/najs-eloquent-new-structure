"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const Sinon = require("sinon");
const najs_binding_1 = require("najs-binding");
const Helpers = require("../../../lib/util/helpers");
const Relationship_1 = require("../../../lib/relations/Relationship");
const ManyToMany_1 = require("../../../lib/relations/relationships/ManyToMany");
const PivotModel_1 = require("./../../../lib/relations/relationships/pivot/PivotModel");
const isPromise_1 = require("../../../lib/util/isPromise");
const RelationUtilities_1 = require("../../../lib/relations/RelationUtilities");
const factory_1 = require("../../../lib/util/factory");
const Record_1 = require("../../../lib/drivers/Record");
describe('ManyToMany', function () {
    it('extends Relationship class and implements Autoload under name "NajsEloquent.Relation.Relationship.ManyToMany"', function () {
        const rootModel = {};
        const relation = new ManyToMany_1.ManyToMany(rootModel, 'a', 'b', 'c', 'd', 'e', 'f', 'g');
        expect(relation).toBeInstanceOf(Relationship_1.Relationship);
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
    describe('.getType()', function () {
        it('returns a literally string "ManyToMany"', function () {
            const rootModel = {};
            const relation = new ManyToMany_1.ManyToMany(rootModel, 'a', 'b', 'c', 'd', 'e', 'f', 'g');
            expect(relation.getType()).toEqual('ManyToMany');
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
    describe('.attachByTargetId()', function () {
        it('create new pivot via .newPivot(), then set rootPrimaryKey to the pivotRootPrimaryKey & returns promise of Pivot.save()', async function () {
            const pivotModel = {
                setAttribute(name, value) {
                    this[name] = value;
                },
                async save() {
                    return 'anything';
                }
            };
            const rootModel = {
                getAttribute() {
                    return 'id';
                }
            };
            const relation = new ManyToMany_1.ManyToMany(rootModel, 'a', 'b', 'c', 'pivot_target_id', 'pivot_root_id', 'id', 'id');
            const newPivotStub = Sinon.stub(relation, 'newPivot');
            newPivotStub.returns(pivotModel);
            const result = relation.attachByTargetId('test');
            expect(pivotModel.pivot_target_id).toEqual('test');
            expect(pivotModel.pivot_root_id).toEqual('id');
            expect(isPromise_1.isPromise(result)).toBe(true);
            expect(await result).toBe('anything');
        });
        it('returns undefined but already register to rootModel.once(saved) event to saved pivot in case rootModel has no id yet', async function () {
            const pivotModel = {
                setAttribute(name, value) {
                    this[name] = value;
                },
                async save() {
                    return 'anything';
                }
            };
            const rootModel = {
                id: undefined,
                getAttribute() {
                    return this.id;
                },
                once() { }
            };
            const relation = new ManyToMany_1.ManyToMany(rootModel, 'a', 'b', 'c', 'pivot_target_id', 'pivot_root_id', 'id', 'id');
            const newPivotStub = Sinon.stub(relation, 'newPivot');
            newPivotStub.returns(pivotModel);
            const onceSpy = Sinon.spy(rootModel, 'once');
            const saveSpy = Sinon.spy(pivotModel, 'save');
            const result = relation.attachByTargetId('test');
            expect(result).toBeUndefined;
            expect(onceSpy.calledWith('saved')).toBe(true);
            expect(pivotModel.pivot_target_id).toEqual('test');
            expect(pivotModel.pivot_root_id).toBeUndefined();
            expect(saveSpy.called).toBe(false);
            rootModel.id = 'new-id';
            const handler = onceSpy.lastCall.args[1];
            await handler();
            expect(pivotModel.pivot_target_id).toEqual('test');
            expect(pivotModel.pivot_root_id).toEqual('new-id');
            expect(saveSpy.called).toBe(true);
        });
    });
    // TODO: implementation needed
    describe('.collectData()', function () {
        it('does nothing for now', function () {
            const rootModel = {};
            const relation = new ManyToMany_1.ManyToMany(rootModel, 'a', 'b', 'c', 'd', 'e', 'f', 'g');
            relation.collectData();
        });
    });
    describe('.fetchPivotData()', function () {
        it('simply calls and return .newPivotQuery() with get when the type is "lazy"', async function () {
            const targetModel = {
                getModelName() {
                    return 'Target';
                }
            };
            const rootModel = {
                getModelName() {
                    return 'Root';
                }
            };
            const relation = new ManyToMany_1.ManyToMany(rootModel, 'name', 'target', 'root', 'd', 'e', 'f', 'g');
            relation['targetModelInstance'] = targetModel;
            const query = {
                get() {
                    return Promise.resolve('anything');
                }
            };
            const newPivotQueryStub = Sinon.stub(relation, 'newPivotQuery');
            newPivotQueryStub.returns(query);
            const result = await relation.fetchPivotData('lazy');
            expect(result).toEqual('anything');
            expect(newPivotQueryStub.calledWith('ManyToManyPivot:Target-Root')).toBe(true);
        });
        it('returns an empty collection if type is "eager", but there is not dataBucket', async function () {
            const targetModel = {
                getModelName() {
                    return 'Target';
                }
            };
            const rootModel = {
                getModelName() {
                    return 'Root';
                }
            };
            const relation = new ManyToMany_1.ManyToMany(rootModel, 'name', 'target', 'root', 'd', 'e', 'f', 'g');
            relation['targetModelInstance'] = targetModel;
            const query = {
                get() {
                    return Promise.resolve('anything');
                }
            };
            const newPivotQueryStub = Sinon.stub(relation, 'newPivotQuery');
            newPivotQueryStub.returns(query);
            const dataBucketStub = Sinon.stub(relation, 'getDataBucket');
            dataBucketStub.returns(undefined);
            const result = await relation.fetchPivotData('eager');
            expect(Helpers.isCollection(result)).toBe(true);
            expect(result.all()).toEqual([]);
        });
        it('calls .newPivotQuery() with raw = true, then use RelationUtilities.getAttributeListInDataBucket() to get a list of id for querying with .whereIn()', async function () {
            const targetModel = {
                getModelName() {
                    return 'Target';
                }
            };
            const rootModel = {
                getModelName() {
                    return 'Root';
                }
            };
            const relation = new ManyToMany_1.ManyToMany(rootModel, 'name', 'target', 'root', 'd', 'pivot_root_id', 'f', 'root-key');
            relation['targetModelInstance'] = targetModel;
            const query = {
                whereIn() {
                    return this;
                },
                get() {
                    return Promise.resolve('anything');
                }
            };
            const newPivotQueryStub = Sinon.stub(relation, 'newPivotQuery');
            newPivotQueryStub.returns(query);
            const dataBucket = {};
            const dataBucketStub = Sinon.stub(relation, 'getDataBucket');
            dataBucketStub.returns(dataBucket);
            const getAttributeListInDataBucketStub = Sinon.stub(RelationUtilities_1.RelationUtilities, 'getAttributeListInDataBucket');
            getAttributeListInDataBucketStub.returns([1, 2]);
            const whereInSpy = Sinon.spy(query, 'whereIn');
            const result = await relation.fetchPivotData('eager');
            expect(whereInSpy.calledWith('pivot_root_id', [1, 2]));
            expect(getAttributeListInDataBucketStub.calledWith(dataBucket, rootModel, 'root-key')).toBe(true);
            expect(result).toEqual('anything');
        });
    });
    describe('.fetchData()', function () {
        it('calls .fetchPivotData() to get pivot data, then use query from getQueryBuilder to find targets via .whereIn()', async function () {
            const targetModel = {
                getModelName() {
                    return 'Target';
                }
            };
            const rootModel = {
                getModelName() {
                    return 'Root';
                }
            };
            const relation = new ManyToMany_1.ManyToMany(rootModel, 'name', 'target', 'pivot', 'target_id', 'root_id', 'id', 'id');
            const stub = Sinon.stub(relation, 'fetchPivotData');
            const recordA = new Record_1.Record({ target_id: 1, root_id: 1 });
            const recordB = new Record_1.Record({ target_id: 2, root_id: 1 });
            stub.returns(factory_1.make_collection([recordA, recordB]));
            const query = {
                whereIn() {
                    return this;
                },
                get() {
                    return Promise.resolve('anything');
                }
            };
            const getQueryBuilderStub = Sinon.stub(relation, 'getQueryBuilder');
            getQueryBuilderStub.returns(query);
            relation['targetModelInstance'] = targetModel;
            const whereInSpy = Sinon.spy(query, 'whereIn');
            const result = await relation.fetchData('lazy');
            expect(result).toEqual('anything');
            expect(getQueryBuilderStub.calledWith('ManyToMany:Target-Root')).toBe(true);
            expect(whereInSpy.calledWith('id', [1, 2])).toBe(true);
        });
    });
    // TODO: implementation needed
    describe('.isInverseOf()', function () {
        it('does nothing for now', function () {
            const rootModel = {};
            const relation = new ManyToMany_1.ManyToMany(rootModel, 'a', 'b', 'c', 'd', 'e', 'f', 'g');
            relation.isInverseOf({});
        });
    });
    // TODO: implementation another cases
    describe('.attach()', function () {
        it('calls .attachByTargetId() and returns this in case the result is undefined', async function () {
            const rootModel = {};
            const relation = new ManyToMany_1.ManyToMany(rootModel, 'a', 'b', 'c', 'pivot_target_id', 'pivot_root_id', 'id', 'id');
            const attachByTargetIdStub = Sinon.stub(relation, 'attachByTargetId');
            attachByTargetIdStub.returns(undefined);
            expect((await relation.attach('id')) === relation).toBe(true);
            expect(attachByTargetIdStub.calledWith('id')).toBe(true);
        });
        it('resolve .attachByTargetId() result and returns this in case the result is a promise', async function () {
            const rootModel = {};
            const relation = new ManyToMany_1.ManyToMany(rootModel, 'a', 'b', 'c', 'pivot_target_id', 'pivot_root_id', 'id', 'id');
            const promiseHandler = Sinon.spy(() => { });
            const attachByTargetIdStub = Sinon.stub(relation, 'attachByTargetId');
            attachByTargetIdStub.returns(new Promise(resolve => {
                setTimeout(function () {
                    promiseHandler();
                    resolve(true);
                }, 300);
            }));
            expect(promiseHandler.called).toBe(false);
            expect((await relation.attach('id')) === relation).toBe(true);
            expect(attachByTargetIdStub.calledWith('id')).toBe(true);
            expect(promiseHandler.called).toBe(true);
        });
    });
});
