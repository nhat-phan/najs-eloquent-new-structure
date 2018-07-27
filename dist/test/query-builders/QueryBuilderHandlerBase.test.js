"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const QueryBuilderHandlerBase_1 = require("../../lib/query-builders/QueryBuilderHandlerBase");
describe('QueryBuilderHandlerBase', function () {
    function makeInstance(model) {
        return Reflect.construct(QueryBuilderHandlerBase_1.QueryBuilderHandlerBase, [model]);
    }
    describe('constructor()', function () {
        it('assigns model to property model, init used = false & softDeleteState = should-add', function () {
            const model = {};
            const query = makeInstance(model);
            expect(query.getModel() === model).toBe(true);
            expect(query.isUsed()).toBe(false);
            expect(query.getSoftDeleteState()).toEqual('should-add');
        });
    });
    describe('.getModel()', function () {
        it('simply returns model', function () {
            const model = {};
            const query = makeInstance(model);
            expect(query.getModel() === model).toBe(true);
        });
    });
    describe('.getPrimaryKeyName()', function () {
        it('simply returns model.getPrimaryKeyName()', function () {
            const model = {
                getPrimaryKeyName() {
                    return 'result';
                }
            };
            const query = makeInstance(model);
            expect(query.getPrimaryKeyName()).toEqual('result');
        });
    });
    describe('.setQueryName()', function () {
        it('sets queryName by passed param value', function () {
            const model = {};
            const query = makeInstance(model);
            query.setQueryName('test');
            expect(query.getQueryName()).toEqual('test');
        });
    });
    describe('.getQueryName()', function () {
        it('simply returns queryName value', function () {
            const model = {};
            const query = makeInstance(model);
            query.setQueryName('test');
            expect(query.getQueryName()).toEqual('test');
        });
    });
    describe('.setLogGroup()', function () {
        it('sets logGroup by passed param value', function () {
            const model = {};
            const query = makeInstance(model);
            query.setLogGroup('test');
            expect(query.getLogGroup()).toEqual('test');
        });
    });
    describe('.getLogGroup()', function () {
        it('simply returns logGroup value', function () {
            const model = {};
            const query = makeInstance(model);
            query.setLogGroup('test');
            expect(query.getLogGroup()).toEqual('test');
        });
    });
    describe('.markUsed()', function () {
        it('assigns true to used property', function () {
            const model = {};
            const query = makeInstance(model);
            query.markUsed();
            expect(query.isUsed()).toBe(true);
        });
    });
    describe('.isUsed()', function () {
        it('simply returns used property', function () {
            const model = {};
            const query = makeInstance(model);
            query.markUsed();
            expect(query.isUsed()).toBe(true);
        });
    });
    describe('.hasSoftDeletes()', function () {
        it('calls .hasSoftDeletes() from SoftDeletesFeature of the model', function () {
            const model = {
                getDriver() {
                    return {
                        getSoftDeletesFeature() {
                            return {
                                hasSoftDeletes() {
                                    return 'result';
                                }
                            };
                        }
                    };
                }
            };
            const query = makeInstance(model);
            expect(query.hasSoftDeletes()).toEqual('result');
        });
    });
    describe('.getSoftDeletesSetting()', function () {
        it('calls .getSoftDeletesSetting() from SoftDeletesFeature of the model', function () {
            const model = {
                getDriver() {
                    return {
                        getSoftDeletesFeature() {
                            return {
                                getSoftDeletesSetting() {
                                    return 'result';
                                }
                            };
                        }
                    };
                }
            };
            const query = makeInstance(model);
            expect(query.getSoftDeletesSetting()).toEqual('result');
        });
    });
    describe('.hasTimestamps()', function () {
        it('calls .hasTimestamps() from TimestampsFeature of the model', function () {
            const model = {
                getDriver() {
                    return {
                        getTimestampsFeature() {
                            return {
                                hasTimestamps() {
                                    return 'result';
                                }
                            };
                        }
                    };
                }
            };
            const query = makeInstance(model);
            expect(query.hasTimestamps()).toEqual('result');
        });
    });
    describe('.getTimestampsSetting()', function () {
        it('calls .getTimestampsSetting() from TimestampsFeature of the model', function () {
            const model = {
                getDriver() {
                    return {
                        getTimestampsFeature() {
                            return {
                                getTimestampsSetting() {
                                    return 'result';
                                }
                            };
                        }
                    };
                }
            };
            const query = makeInstance(model);
            expect(query.getTimestampsSetting()).toEqual('result');
        });
    });
    describe('.markSoftDeleteState()', function () {
        it('sets softDeleteState by passed param value', function () {
            const model = {};
            const query = makeInstance(model);
            query.markSoftDeleteState('added');
            expect(query.getSoftDeleteState()).toEqual('added');
        });
    });
    describe('.getSoftDeleteState()', function () {
        it('simply returns logGroup value', function () {
            const model = {};
            const query = makeInstance(model);
            query.markSoftDeleteState('should-not-add');
            expect(query.getSoftDeleteState()).toEqual('should-not-add');
        });
    });
    describe('.shouldAddSoftDeleteCondition()', function () {
        it('returns true if softDeleteState is should-add AND model .hasSoftDeletes', function () {
            const dataset = [
                {
                    state: 'should-add',
                    hasSoftDeletes: false,
                    result: false
                },
                {
                    state: 'should-not-add',
                    hasSoftDeletes: false,
                    result: false
                },
                {
                    state: 'added',
                    hasSoftDeletes: false,
                    result: false
                },
                {
                    state: 'should-add',
                    hasSoftDeletes: true,
                    result: true
                },
                {
                    state: 'should-not-add',
                    hasSoftDeletes: true,
                    result: false
                },
                {
                    state: 'added',
                    hasSoftDeletes: true,
                    result: false
                }
            ];
            for (const data of dataset) {
                const model = {
                    getDriver() {
                        return {
                            getSoftDeletesFeature() {
                                return {
                                    hasSoftDeletes() {
                                        return data.hasSoftDeletes;
                                    }
                                };
                            }
                        };
                    }
                };
                const query = makeInstance(model);
                query.markSoftDeleteState(data.state);
                expect(query.shouldAddSoftDeleteCondition()).toBe(data.result);
            }
        });
    });
    describe('.createCollection()', function () {
        it('do something', function () {
            // TODO: implement test
            const model = {};
            const query = makeInstance(model);
            query.createCollection([]);
        });
    });
    describe('.createInstance()', function () {
        it('do something', function () {
            // TODO: implement test
            const model = {};
            const query = makeInstance(model);
            query.createInstance({});
        });
    });
});
