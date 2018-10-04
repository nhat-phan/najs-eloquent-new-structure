"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const NajsBinding = require("najs-binding");
const Sinon = require("sinon");
const Relationship_1 = require("../../../lib/relations/Relationship");
const HasOne_1 = require("../../../lib/relations/relationships/HasOne");
const HasOneOrMany_1 = require("../../../lib/relations/relationships/HasOneOrMany");
const DataBuffer_1 = require("../../../lib/data/DataBuffer");
const DataCollector_1 = require("../../../lib/data/DataCollector");
const reader = {
    getAttribute(data, field) {
        return data[field];
    },
    pick(data, fields) {
        return data;
    }
};
describe('HasOneOrMany', function () {
    function makeRelation(model, name, targetDefinition, targetKey, localKey) {
        return new HasOne_1.HasOne(model, name, targetDefinition, targetKey, localKey);
    }
    it('extends Relation', function () {
        const relation = makeRelation({}, 'test', 'Target', 'target_id', 'id');
        expect(relation).toBeInstanceOf(Relationship_1.Relationship);
        expect(relation).toBeInstanceOf(HasOneOrMany_1.HasOneOrMany);
    });
    describe('constructor()', function () {
        it('assign target to "targetDefinition", targetKey to "targetKeyName", rootKey to "rootKeyName"', function () {
            const relation = makeRelation({}, 'test', 'Target', 'target_id', 'id');
            expect(relation['rootKeyName']).toEqual('id');
            expect(relation['targetKeyName']).toEqual('target_id');
            expect(relation['targetDefinition']).toEqual('Target');
        });
    });
    describe('.targetModel', function () {
        it('calls make() to creates an instance of Target model, then assigns to reuse property "targetModelInstance"', function () {
            const instance = {};
            const makeStub = Sinon.stub(NajsBinding, 'make');
            makeStub.returns(instance);
            const relation = makeRelation({}, 'test', 'Target', 'target_id', 'id');
            expect(relation['targetModel'] === instance).toBe(true);
            expect(makeStub.calledWith('Target')).toBe(true);
            makeStub.resetHistory();
            expect(relation['targetModel'] === instance).toBe(true);
            expect(makeStub.calledWith('Target')).toBe(false);
            makeStub.restore();
        });
    });
    describe('.getQueryBuilder()', function () {
        it('returns a queryBuilder from targetModel, which also contains the dataBucket of relation', function () {
            const relation = makeRelation({}, 'test', 'Target', 'target_id', 'id');
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
    });
    describe('.collectData()', function () {
        it('returns undefined if there is no DataBucket', function () {
            const relation = makeRelation({}, 'test', 'Target', 'target_id', 'id');
            const getDataBucketStub = Sinon.stub(relation, 'getDataBucket');
            getDataBucketStub.returns(undefined);
            const spy = Sinon.spy(relation, 'executeCollector');
            expect(relation.collectData()).toBe(undefined);
            expect(spy.called).toBe(false);
        });
        it('creates collector which created for DataBuffer of Target then calls and returns .executorCollector()', function () {
            const rootModel = {
                getAttribute(name) {
                    return name + '-value';
                }
            };
            const relation = makeRelation(rootModel, 'test', 'Target', 'target_id', 'id');
            const dataBuffer = new DataBuffer_1.DataBuffer('id', reader);
            const dataBucket = {
                getDataOf() {
                    return dataBuffer;
                }
            };
            const targetModel = {};
            relation['targetModelInstance'] = targetModel;
            const getDataBucketStub = Sinon.stub(relation, 'getDataBucket');
            getDataBucketStub.returns(dataBucket);
            const getDataOfSpy = Sinon.spy(dataBucket, 'getDataOf');
            const executeCollectorStub = Sinon.stub(relation, 'executeCollector');
            executeCollectorStub.returns('anything');
            expect(relation.collectData()).toEqual('anything');
            expect(getDataOfSpy.calledWith(targetModel));
            const collector = executeCollectorStub.lastCall.args[0];
            expect(collector).toBeInstanceOf(DataCollector_1.DataCollector);
            expect(collector['dataBuffer'] === dataBuffer).toBe(true);
            expect(collector['conditions']).toEqual({
                $and: [
                    {
                        field: 'target_id',
                        operator: '=',
                        value: 'id-value',
                        reader: reader
                    }
                ]
            });
        });
    });
    describe('.fetchData()', function () {
        it('gets query from .getQueryBuilder() then pass .where() then calls and returns .executeQuery() for lazy load', async function () {
            const query = {
                where() { },
                whereIn() { }
            };
            const rootModel = {
                getAttribute(name) {
                    return name + '-value';
                }
            };
            const relation = makeRelation(rootModel, 'test', 'Target', 'target_id', 'id');
            const getDataBucketStub = Sinon.stub(relation, 'getDataBucket');
            getDataBucketStub.returns(undefined);
            const targetModel = {
                getModelName() {
                    return 'Target';
                }
            };
            relation['targetModelInstance'] = targetModel;
            const getQueryBuilderStub = Sinon.stub(relation, 'getQueryBuilder');
            getQueryBuilderStub.returns(query);
            const executeQueryStub = Sinon.stub(relation, 'executeQuery');
            executeQueryStub.returns('anything');
            const whereSpy = Sinon.spy(query, 'where');
            const whereInSpy = Sinon.spy(query, 'whereIn');
            expect(await relation.fetchData('lazy')).toEqual('anything');
            expect(getQueryBuilderStub.calledWith('HasOne:Target')).toBe(true);
            expect(executeQueryStub.calledWith(query)).toBe(true);
            expect(whereSpy.calledWith('target_id', 'id-value')).toBe(true);
            expect(whereInSpy.called).toBe(false);
        });
        it('gets query from .getQueryBuilder() then calls and returns .getEmptyValue() for eager load if there is no dataBucket', async function () {
            const query = {
                where() { },
                whereIn() { }
            };
            const rootModel = {
                getAttribute(name) {
                    return name + '-value';
                }
            };
            const relation = makeRelation(rootModel, 'test', 'Target', 'target_id', 'id');
            const getDataBucketStub = Sinon.stub(relation, 'getDataBucket');
            getDataBucketStub.returns(undefined);
            const targetModel = {
                getModelName() {
                    return 'Target';
                }
            };
            relation['targetModelInstance'] = targetModel;
            const getQueryBuilderStub = Sinon.stub(relation, 'getQueryBuilder');
            getQueryBuilderStub.returns(query);
            const executeQueryStub = Sinon.stub(relation, 'executeQuery');
            executeQueryStub.returns('anything');
            const getEmptyValueStub = Sinon.stub(relation, 'getEmptyValue');
            getEmptyValueStub.returns('empty');
            const whereSpy = Sinon.spy(query, 'where');
            const whereInSpy = Sinon.spy(query, 'whereIn');
            expect(await relation.fetchData('eager')).toEqual('empty');
            expect(getQueryBuilderStub.calledWith('HasOne:Target')).toBe(true);
            expect(executeQueryStub.calledWith(query)).toBe(false);
            expect(whereSpy.called).toBe(false);
            expect(whereInSpy.called).toBe(false);
        });
        it('gets query from .getQueryBuilder() then pass .whereIn() then calls and returns .executeQuery() for lazy load', async function () {
            const query = {
                where() { },
                whereIn() { }
            };
            const rootModel = {
                getAttribute(name) {
                    return name + '-value';
                }
            };
            const relation = makeRelation(rootModel, 'test', 'Target', 'target_id', 'id');
            const dataBuffer = new DataBuffer_1.DataBuffer('id', reader);
            dataBuffer
                .add({ id: 1 })
                .add({ id: 2 })
                .add({ id: 3 });
            const dataBucket = {
                getDataOf() {
                    return dataBuffer;
                }
            };
            const getDataBucketStub = Sinon.stub(relation, 'getDataBucket');
            getDataBucketStub.returns(dataBucket);
            const targetModel = {
                getModelName() {
                    return 'Target';
                }
            };
            relation['targetModelInstance'] = targetModel;
            const getQueryBuilderStub = Sinon.stub(relation, 'getQueryBuilder');
            getQueryBuilderStub.returns(query);
            const executeQueryStub = Sinon.stub(relation, 'executeQuery');
            executeQueryStub.returns('anything');
            const whereSpy = Sinon.spy(query, 'where');
            const whereInSpy = Sinon.spy(query, 'whereIn');
            expect(await relation.fetchData('eager')).toEqual('anything');
            expect(getQueryBuilderStub.calledWith('HasOne:Target')).toBe(true);
            expect(executeQueryStub.calledWith(query)).toBe(true);
            expect(whereSpy.called).toBe(false);
            expect(whereInSpy.calledWith('target_id', [1, 2, 3])).toBe(true);
        });
    });
    describe('.isInverseOf()', function () {
        // TODO: implementation needed
        it('should work', function () {
            const relation = makeRelation({}, 'test', 'Target', 'target_id', 'id');
            relation.isInverseOf({});
        });
    });
});
