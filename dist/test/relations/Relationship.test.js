"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const NajsBinding = require("najs-binding");
const Sinon = require("sinon");
const HasOne_1 = require("../../lib/relations/relationships/HasOne");
const RelationUtilities_1 = require("../../lib/relations/RelationUtilities");
const RelationNotFoundInNewInstanceError_1 = require("../../lib/errors/RelationNotFoundInNewInstanceError");
describe('Relation', function () {
    function makeRelation(model, name) {
        return new HasOne_1.HasOne(model, name, {}, '', '');
    }
    describe('constructor()', function () {
        it('assigns rootModel, name properties respectively and create default RelationUtilities if not provided', function () {
            const rootModel = {};
            const relation = makeRelation(rootModel, 'test');
            expect(relation['rootModel'] === rootModel).toBe(true);
            expect(relation['name']).toEqual('test');
            expect(relation['loadChains']).toEqual([]);
        });
    });
    describe('.targetModel', function () {
        it('calls make() to creates an instance of Target model, then assigns to reuse property "targetModelInstance"', function () {
            const instance = {};
            const makeStub = Sinon.stub(NajsBinding, 'make');
            makeStub.returns(instance);
            const relation = makeRelation({}, 'test');
            relation['targetDefinition'] = 'Target';
            expect(relation['targetModel'] === instance).toBe(true);
            expect(makeStub.calledWith('Target')).toBe(true);
            makeStub.resetHistory();
            expect(relation['targetModel'] === instance).toBe(true);
            expect(makeStub.calledWith('Target')).toBe(false);
            makeStub.restore();
        });
    });
    describe('.getName()', function () {
        it('simply returns the name property', function () {
            const rootModel = {};
            const relation = makeRelation(rootModel, 'test');
            const name = {};
            relation['name'] = name;
            expect(relation.getName() === name).toBe(true);
        });
    });
    describe('.getRelationData()', function () {
        it('calls and returns RelationFeature.findDataByName()', function () {
            const relationFeature = {
                findDataByName() {
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
                }
            };
            const relation = makeRelation(rootModel, 'test');
            const spy = Sinon.spy(relationFeature, 'findDataByName');
            expect(relation.getRelationData()).toEqual('anything');
            expect(spy.calledWith(rootModel, 'test')).toBe(true);
        });
    });
    describe('.getDataBucket()', function () {
        it('calls and returns RelationFeature.getDataBucket()', function () {
            const relationFeature = {
                getDataBucket() {
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
                }
            };
            const relation = makeRelation(rootModel, 'test');
            const spy = Sinon.spy(relationFeature, 'getDataBucket');
            expect(relation.getDataBucket()).toEqual('anything');
            expect(spy.calledWith(rootModel)).toBe(true);
        });
    });
    describe('.with()', function () {
        it('is chainable, flattens arguments then append to property loadChains', function () {
            const rootModel = {};
            const relation = makeRelation(rootModel, 'test');
            expect(relation.with('a', 'b', ['c', 'd']) === relation).toBe(true);
            expect(relation['loadChains']).toEqual(['a', 'b', 'c', 'd']);
            expect(relation.with(['a', 'e'], 'b', 'f', ['c', 'd']) === relation).toBe(true);
            expect(relation['loadChains']).toEqual(['a', 'b', 'c', 'd', 'e', 'f']);
        });
    });
    describe('.isLoaded()', function () {
        it('return true if getRelationData().isLoaded() is true', function () {
            const relationFeature = {
                findDataByName() {
                    return {
                        isLoaded() {
                            return true;
                        }
                    };
                }
            };
            const rootModel = {
                getDriver() {
                    return {
                        getRelationFeature() {
                            return relationFeature;
                        }
                    };
                }
            };
            const relation = makeRelation(rootModel, 'test');
            expect(relation.isLoaded()).toBe(true);
        });
        it('return true if RelationUtilities.isLoadedInDataBucket() is true', function () {
            const relationFeature = {
                findDataByName() {
                    return {
                        isLoaded() {
                            return false;
                        }
                    };
                }
            };
            const rootModel = {
                getDriver() {
                    return {
                        getRelationFeature() {
                            return relationFeature;
                        }
                    };
                }
            };
            const relation = makeRelation(rootModel, 'test');
            const stub = Sinon.stub(RelationUtilities_1.RelationUtilities, 'isLoadedInDataBucket');
            stub.returns(true);
            expect(relation.isLoaded()).toBe(true);
            expect(stub.calledWith(relation, rootModel, 'test')).toBe(true);
            stub.restore();
        });
        it('return false if both case above return false', function () {
            const relationFeature = {
                findDataByName() {
                    return {
                        isLoaded() {
                            return false;
                        }
                    };
                }
            };
            const rootModel = {
                getDriver() {
                    return {
                        getRelationFeature() {
                            return relationFeature;
                        }
                    };
                }
            };
            const relation = makeRelation(rootModel, 'test');
            const stub = Sinon.stub(RelationUtilities_1.RelationUtilities, 'isLoadedInDataBucket');
            stub.returns(false);
            expect(relation.isLoaded()).toBe(false);
            expect(stub.calledWith(relation, rootModel, 'test')).toBe(true);
            stub.restore();
        });
    });
    describe('.getData()', function () {
        it('returns undefined if .isLoaded() returns false', function () {
            const relationData = {
                hasData() {
                    return false;
                },
                getData() {
                    return 'anything';
                },
                setData(data) {
                    return data;
                }
            };
            const rootModel = {};
            const relation = makeRelation(rootModel, 'test');
            const stub = Sinon.stub(relation, 'isLoaded');
            stub.returns(false);
            const getRelationDataStub = Sinon.stub(relation, 'getRelationData');
            getRelationDataStub.returns(relationData);
            const collectDataStub = Sinon.stub(relation, 'collectData');
            collectDataStub.returns('collected-data');
            const setDataSpy = Sinon.spy(relationData, 'setData');
            const markInverseRelationsToLoadedSpy = Sinon.spy(relation, 'markInverseRelationsToLoaded');
            expect(relation.getData()).toBeUndefined();
            expect(getRelationDataStub.called).toBe(false);
            expect(setDataSpy.called).toBe(false);
            expect(collectDataStub.called).toBe(false);
            expect(markInverseRelationsToLoadedSpy.called).toBe(false);
        });
        it('returns getRelationData().getData() if the relation has data', function () {
            const relationData = {
                hasData() {
                    return true;
                },
                getData() {
                    return 'anything';
                },
                setData(data) {
                    return data;
                }
            };
            const rootModel = {};
            const relation = makeRelation(rootModel, 'test');
            const stub = Sinon.stub(relation, 'isLoaded');
            stub.returns(true);
            const getRelationDataStub = Sinon.stub(relation, 'getRelationData');
            getRelationDataStub.returns(relationData);
            const collectDataStub = Sinon.stub(relation, 'collectData');
            collectDataStub.returns('collected-data');
            const setDataSpy = Sinon.spy(relationData, 'setData');
            const markInverseRelationsToLoadedSpy = Sinon.spy(relation, 'markInverseRelationsToLoaded');
            expect(relation.getData()).toEqual('anything');
            expect(getRelationDataStub.called).toBe(true);
            expect(setDataSpy.called).toBe(false);
            expect(collectDataStub.called).toBe(false);
            expect(markInverseRelationsToLoadedSpy.called).toBe(false);
        });
        it('calls .collectData(), then RelationData.setData() then calls and returns .markInverseRelationsToLoaded()', function () {
            const relationData = {
                hasData() {
                    return false;
                },
                getData() {
                    return 'anything';
                },
                setData(data) {
                    return data;
                }
            };
            const rootModel = {};
            const relation = makeRelation(rootModel, 'test');
            const stub = Sinon.stub(relation, 'isLoaded');
            stub.returns(true);
            const getRelationDataStub = Sinon.stub(relation, 'getRelationData');
            getRelationDataStub.returns(relationData);
            const collectDataStub = Sinon.stub(relation, 'collectData');
            collectDataStub.returns('collected-data');
            const setDataSpy = Sinon.spy(relationData, 'setData');
            const markInverseRelationsToLoadedSpy = Sinon.spy(relation, 'markInverseRelationsToLoaded');
            expect(relation.getData()).toEqual('collected-data');
            expect(getRelationDataStub.called).toBe(true);
            expect(setDataSpy.calledWith('collected-data')).toBe(true);
            expect(collectDataStub.called).toBe(true);
            expect(markInverseRelationsToLoadedSpy.calledWith('collected-data')).toBe(true);
        });
    });
    describe('.lazyLoad()', function () {
        it('calls and return .loadData() with type = "lazy"', async function () {
            const rootModel = {};
            const relation = makeRelation(rootModel, 'test');
            const stub = Sinon.stub(relation, 'loadData');
            stub.returns('anything');
            const result = await relation.lazyLoad();
            expect(result).toEqual('anything');
            expect(stub.calledWith('lazy')).toBe(true);
        });
    });
    describe('.eagerLoad()', function () {
        it('calls and return .loadData() with type = "eager"', async function () {
            const rootModel = {};
            const relation = makeRelation(rootModel, 'test');
            const stub = Sinon.stub(relation, 'loadData');
            stub.returns('anything');
            const result = await relation.eagerLoad();
            expect(result).toEqual('anything');
            expect(stub.calledWith('eager')).toBe(true);
        });
    });
    describe('.markInverseRelationsToLoaded()', function () {
        // TODO: implementation needed
        it('does nothing for now', function () {
            const rootModel = {};
            const relation = makeRelation(rootModel, 'test');
            relation.markInverseRelationsToLoaded({});
        });
    });
    describe('.load()', function () {
        it('calls and returns this.getData() if the relation is loaded', async function () {
            const rootModel = {};
            const relation = makeRelation(rootModel, 'test');
            const isLoadedStub = Sinon.stub(relation, 'isLoaded');
            isLoadedStub.returns(true);
            const getDataStub = Sinon.stub(relation, 'getData');
            getDataStub.returns('get-data-result');
            const getDataBucketStub = Sinon.stub(relation, 'getDataBucket');
            getDataBucketStub.returns({});
            const lazyLoadStub = Sinon.stub(relation, 'lazyLoad');
            lazyLoadStub.returns(Promise.resolve('lazy-load-result'));
            const eagerLoadStub = Sinon.stub(relation, 'eagerLoad');
            eagerLoadStub.returns(Promise.resolve('eager-load-result'));
            expect(await relation.load()).toEqual('get-data-result');
        });
        it('calls and returns this.eagerLoad() if the relation is not loaded and dataBucket is found', async function () {
            const rootModel = {};
            const relation = makeRelation(rootModel, 'test');
            const isLoadedStub = Sinon.stub(relation, 'isLoaded');
            isLoadedStub.returns(false);
            const getDataBucketStub = Sinon.stub(relation, 'getDataBucket');
            getDataBucketStub.returns({});
            const lazyLoadStub = Sinon.stub(relation, 'lazyLoad');
            lazyLoadStub.returns(Promise.resolve('lazy-load-result'));
            const eagerLoadStub = Sinon.stub(relation, 'eagerLoad');
            eagerLoadStub.returns(Promise.resolve('eager-load-result'));
            expect(await relation.load()).toEqual('eager-load-result');
        });
        it('calls and returns this.lazyLoad() if the relation is not loaded and dataBucket is NOT found', async function () {
            const rootModel = {
                isNew() {
                    return false;
                }
            };
            const relation = makeRelation(rootModel, 'test');
            const isLoadedStub = Sinon.stub(relation, 'isLoaded');
            isLoadedStub.returns(false);
            const getDataBucketStub = Sinon.stub(relation, 'getDataBucket');
            getDataBucketStub.returns(undefined);
            const lazyLoadStub = Sinon.stub(relation, 'lazyLoad');
            lazyLoadStub.returns(Promise.resolve('lazy-load-result'));
            const eagerLoadStub = Sinon.stub(relation, 'eagerLoad');
            eagerLoadStub.returns(Promise.resolve('eager-load-result'));
            expect(await relation.load()).toEqual('lazy-load-result');
        });
        it('throws an RelationNotFoundInNewInstanceError if the dataBucket NOT found and the model is new instance', async function () {
            const rootModel = {
                isNew() {
                    return true;
                },
                getModelName() {
                    return 'ModelName';
                }
            };
            const relation = makeRelation(rootModel, 'test');
            const isLoadedStub = Sinon.stub(relation, 'isLoaded');
            isLoadedStub.returns(false);
            const getDataBucketStub = Sinon.stub(relation, 'getDataBucket');
            getDataBucketStub.returns(undefined);
            const lazyLoadStub = Sinon.stub(relation, 'lazyLoad');
            lazyLoadStub.returns(Promise.resolve('lazy-load-result'));
            const eagerLoadStub = Sinon.stub(relation, 'eagerLoad');
            eagerLoadStub.returns(Promise.resolve('eager-load-result'));
            try {
                await relation.load();
            }
            catch (error) {
                expect(error).toBeInstanceOf(RelationNotFoundInNewInstanceError_1.RelationNotFoundInNewInstanceError);
                return;
            }
            expect('should not reach this line').toEqual('hm');
        });
    });
    describe('.loadData()', function () {
        it('always sets load type to relationData', async function () {
            const relationData = {
                setLoadType() {
                    return this;
                },
                setData() { }
            };
            const rootModel = {};
            const relation = makeRelation(rootModel, 'test');
            const getRelationDataStub = Sinon.stub(relation, 'getRelationData');
            getRelationDataStub.returns(relationData);
            const spy = Sinon.spy(relationData, 'setLoadType');
            const fetchDataStub = Sinon.stub(relation, 'fetchData');
            fetchDataStub.returns('anything');
            await relation.lazyLoad();
            expect(spy.calledWith('lazy')).toBe(true);
            spy.resetHistory();
            await relation.eagerLoad();
            expect(spy.calledWith('eager')).toBe(true);
        });
        it('calls .fetchData() to get result, and always returns the result', async function () {
            const relationData = {
                setLoadType() {
                    return this;
                },
                setData() { }
            };
            const rootModel = {};
            const relation = makeRelation(rootModel, 'test');
            const getRelationDataStub = Sinon.stub(relation, 'getRelationData');
            getRelationDataStub.returns(relationData);
            const fetchDataStub = Sinon.stub(relation, 'fetchData');
            fetchDataStub.returns('anything');
            expect(await relation.lazyLoad()).toEqual('anything');
        });
        it('call RelationData.setData() if the load type is "lazy"', async function () {
            const relationData = {
                setLoadType() {
                    return this;
                },
                setData() { }
            };
            const rootModel = {};
            const relation = makeRelation(rootModel, 'test');
            const getRelationDataStub = Sinon.stub(relation, 'getRelationData');
            getRelationDataStub.returns(relationData);
            const spy = Sinon.spy(relationData, 'setData');
            const fetchDataStub = Sinon.stub(relation, 'fetchData');
            fetchDataStub.returns('anything');
            await relation.lazyLoad();
            expect(spy.calledWith('anything')).toBe(true);
            spy.resetHistory();
            await relation.eagerLoad();
            expect(spy.called).toBe(false);
        });
    });
});
