"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const Sinon = require("sinon");
const HasOneRelation_1 = require("../../lib/relations/basic/HasOneRelation");
const RelationUtilities_1 = require("../../lib/relations/RelationUtilities");
describe('Relation', function () {
    function makeRelation(model, name) {
        return new HasOneRelation_1.HasOneRelation(model, name);
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
        // TODO: implementation needed
        it('does nothing for now', function () {
            const rootModel = {};
            const relation = makeRelation(rootModel, 'test');
            relation.load();
        });
    });
    describe('.loadData()', function () {
        // TODO: implementation needed
        it('does nothing for now', function () {
            const rootModel = {
                getDriver() {
                    return {
                        getRelationFeature() {
                            return {
                                findDataByName() {
                                    return {
                                        setLoadType() { }
                                    };
                                }
                            };
                        }
                    };
                }
            };
            const relation = makeRelation(rootModel, 'test');
            relation['loadData']('lazy');
        });
    });
});
