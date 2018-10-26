"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const Sinon = require("sinon");
const Helpers = require("../../../lib/util/helpers");
const ManyToManyBase_1 = require("../../../lib/relations/relationships/ManyToManyBase");
const ManyToMany_1 = require("../../../lib/relations/relationships/ManyToMany");
const isPromise_1 = require("../../../lib/util/isPromise");
const RelationUtilities_1 = require("../../../lib/relations/RelationUtilities");
const factory_1 = require("../../../lib/util/factory");
const Record_1 = require("../../../lib/drivers/Record");
const DataBuffer_1 = require("../../../lib/data/DataBuffer");
const reader = {
    getAttribute(data, field) {
        return data[field];
    },
    pick(data, fields) {
        return data;
    }
};
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
    describe('.getType()', function () {
        it('returns a literally string "ManyToMany"', function () {
            const rootModel = {};
            const relation = new ManyToMany_1.ManyToMany(rootModel, 'a', 'b', 'c', 'd', 'e', 'f', 'g');
            expect(relation.getType()).toEqual('ManyToMany');
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
    describe('.collectPivotData()', function () {
        it('returns an empty object if there is no root primary key', function () {
            const rootModel = {
                getAttribute() {
                    return undefined;
                }
            };
            const relation = new ManyToMany_1.ManyToMany(rootModel, 'name', 'Target', 'pivot', 'root_id', 'target_id', 'id', 'id');
            const dataBucket = {};
            expect(relation.collectPivotData(dataBucket)).toEqual({});
        });
        it('collects pivotModel in dataBucket which has "pivotRootKeyName" match with current rootPrimaryKey', function () {
            const dataBuffer = new DataBuffer_1.DataBuffer('id', reader);
            dataBuffer.add({ id: '1', root_id: 1, target_id: 'x' });
            dataBuffer.add({ id: '2', root_id: 2, target_id: 'x' });
            dataBuffer.add({ id: '3', root_id: 1, target_id: 'y' });
            dataBuffer.add({ id: '4', root_id: 2, target_id: 'y' });
            const dataBucket = {
                getDataOf() {
                    return dataBuffer;
                }
            };
            const pivotModel = {};
            const rootModel = {
                getAttribute() {
                    return 2;
                }
            };
            const relation = new ManyToMany_1.ManyToMany(rootModel, 'name', 'Target', 'pivot', 'target_id', 'root_id', 'id', 'id');
            relation['pivotModelInstance'] = pivotModel;
            expect(relation.collectPivotData(dataBucket)).toEqual({
                x: { id: '2', root_id: 2, target_id: 'x' },
                y: { id: '4', root_id: 2, target_id: 'y' }
            });
        });
    });
    describe('.collectData()', function () {
        it('returns an empty collection if there is no dataBucket', function () {
            const rootModel = {};
            const relation = new ManyToMany_1.ManyToMany(rootModel, 'a', 'b', 'c', 'd', 'e', 'f', 'g');
            const dataBucketStub = Sinon.stub(relation, 'getDataBucket');
            dataBucketStub.returns(undefined);
            const result = relation.collectData();
            expect(Helpers.isCollection(result)).toBe(true);
            expect(result.all()).toEqual([]);
        });
        it('calls .collectPivotData() first, then collect data of targetModel with "in" operator', function () {
            const dataBuffer = new DataBuffer_1.DataBuffer('id', reader);
            dataBuffer.add({ id: 'x' });
            dataBuffer.add({ id: 'y' });
            dataBuffer.add({ id: 'z' });
            const dataBucket = {
                getDataOf() {
                    return dataBuffer;
                },
                makeModel(model, data) {
                    return { model: model.getModelName(), data: data };
                }
            };
            const pivotModel = {
                getModelName() {
                    return 'Pivot';
                }
            };
            const targetModel = {
                getModelName() {
                    return 'Target';
                }
            };
            const rootModel = {
                getAttribute() {
                    return 2;
                }
            };
            const relation = new ManyToMany_1.ManyToMany(rootModel, 'name', 'Target', 'pivot', 'target_id', 'root_id', 'id', 'id');
            relation['pivotModelInstance'] = pivotModel;
            relation['targetModelInstance'] = targetModel;
            const dataBucketStub = Sinon.stub(relation, 'getDataBucket');
            dataBucketStub.returns(dataBucket);
            const collectPivotDataStub = Sinon.stub(relation, 'collectPivotData');
            collectPivotDataStub.returns({
                x: { id: '2', root_id: 2, target_id: 'x' },
                y: { id: '4', root_id: 2, target_id: 'y' }
            });
            expect(relation.collectData().all()).toEqual([
                {
                    data: { id: 'x' },
                    model: 'Target',
                    pivot: { data: { id: '2', root_id: 2, target_id: 'x' }, model: 'Pivot' }
                },
                {
                    data: { id: 'y' },
                    model: 'Target',
                    pivot: { data: { id: '4', root_id: 2, target_id: 'y' }, model: 'Pivot' }
                }
            ]);
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
