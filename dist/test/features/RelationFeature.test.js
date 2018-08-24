"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const Sinon = require("sinon");
const FeatureBase_1 = require("../../lib/features/FeatureBase");
const RelationFeature_1 = require("../../lib/features/RelationFeature");
const RelationDataBucket_1 = require("../../lib/relations/RelationDataBucket");
const RelationPublicApi_1 = require("../../lib/features/mixin/RelationPublicApi");
const RelationData_1 = require("../../lib/relations/RelationData");
const RelationFactory_1 = require("../../lib/relations/RelationFactory");
const RelationNotDefinedError_1 = require("../../lib/errors/RelationNotDefinedError");
const RelationDefinitionFinder_1 = require("../../lib/relations/RelationDefinitionFinder");
describe('RelationFeature', function () {
    const feature = new RelationFeature_1.RelationFeature();
    it('extends FeatureBase and implements Autoload under name "NajsEloquent.Feature.RelationFeature"', function () {
        expect(feature).toBeInstanceOf(FeatureBase_1.FeatureBase);
        expect(feature.getClassName()).toEqual('NajsEloquent.Feature.RelationFeature');
    });
    describe('.getFeatureName()', function () {
        it('returns literally string "Relation"', function () {
            expect(feature.getFeatureName()).toEqual('Relation');
        });
    });
    describe('.getPublicApi()', function () {
        it('returns an RelationPublicApi object', function () {
            expect(feature.getPublicApi() === RelationPublicApi_1.RelationPublicApi).toBe(true);
        });
    });
    describe('.makeDataBucket()', function () {
        it('simply returns an instance of RelationDataBucket', function () {
            const model = {};
            expect(feature.makeDataBucket(model)).toBeInstanceOf(RelationDataBucket_1.RelationDataBucket);
        });
    });
    describe('.makeFactory()', function () {
        it('makes and returns an instance of RelationFactory', function () {
            const model = {};
            const factory = feature.makeFactory(model, 'test');
            expect(factory).toBeInstanceOf(RelationFactory_1.RelationFactory);
            expect(factory['rootModel'] === model).toBe(true);
            expect(factory['name'] === 'test').toBe(true);
        });
    });
    describe('.getDataBucket()', function () {
        it('simply returns an property "relationDataBucket" of model', function () {
            const relationDataBucket = {};
            const model = {
                internalData: {
                    relationDataBucket: relationDataBucket
                }
            };
            expect(feature.getDataBucket(model) === relationDataBucket).toBe(true);
        });
    });
    describe('.setDataBucket()', function () {
        it('simply sets an property "relationDataBucket" of model', function () {
            const relationDataBucket = {};
            const model = {
                internalData: {}
            };
            feature.setDataBucket(model, relationDataBucket);
            expect(model.internalData.relationDataBucket === relationDataBucket).toBe(true);
        });
    });
    describe('.createKeyForDataBucket()', function () {
        it('returns a record name of the Record via .getRecordName()', function () {
            const model = {
                getDriver() {
                    return {
                        getRecordManager() {
                            return {
                                getRecordName() {
                                    return 'anything';
                                }
                            };
                        }
                    };
                }
            };
            expect(feature.createKeyForDataBucket(model)).toEqual('anything');
        });
    });
    describe('.getDefinitions()', function () {
        it('simply returns an property sharedMetadata."relationDefinitions" of model', function () {
            const relationDefinitions = {};
            const model = {
                sharedMetadata: {
                    relationDefinitions: relationDefinitions
                }
            };
            expect(feature.getDefinitions(model) === relationDefinitions).toBe(true);
        });
    });
    describe('.buildDefinitions()', function () {
        it('creates an instance of RelationDefinitionFinder then calls .getDefinitions()', function () {
            const model = {};
            const prototype = {};
            const bases = [];
            const stub = Sinon.stub(RelationDefinitionFinder_1.RelationDefinitionFinder.prototype, 'getDefinitions');
            stub.returns('anything');
            expect(feature.buildDefinitions(model, prototype, bases)).toEqual('anything');
            stub.restore();
        });
    });
    describe('.findByName()', function () {
        it('throws a RelationNotDefinedError if the relationDefinitions of model is not found', function () {
            const model = {
                getModelName() {
                    return 'Test';
                }
            };
            try {
                feature.findByName(model, 'any');
            }
            catch (error) {
                expect(error).toBeInstanceOf(RelationNotDefinedError_1.RelationNotDefinedError);
                expect(error.message).toEqual('Relation any is not defined in model Test.');
                return;
            }
            expect('should not reach here').toEqual('hm');
        });
        it('throws a RelationNotDefinedError if the name is not found in sharedMetadata.relationDefinitions', function () {
            const model = {
                sharedMetadata: {
                    relationDefinitions: {
                        test: true
                    }
                },
                getModelName() {
                    return 'Test';
                }
            };
            try {
                feature.findByName(model, 'any');
            }
            catch (error) {
                expect(error).toBeInstanceOf(RelationNotDefinedError_1.RelationNotDefinedError);
                expect(error.message).toEqual('Relation any is not defined in model Test.');
                return;
            }
            expect('should not reach here').toEqual('hm');
        });
        it('gets definitions in relationDefinition, then trigger the target type "getter"', function () {
            const relation = {};
            const model = {
                sharedMetadata: {
                    relationDefinitions: {
                        test: {
                            accessor: 'test',
                            target: 'relation',
                            targetType: 'getter'
                        }
                    }
                },
                get relation() {
                    return relation;
                }
            };
            expect(feature.findByName(model, 'test') === relation).toBe(true);
        });
        it('gets definitions in relationDefinition, then trigger the target type "function"', function () {
            const relation = {};
            const model = {
                sharedMetadata: {
                    relationDefinitions: {
                        test: {
                            accessor: 'test',
                            target: 'getRelation',
                            targetType: 'function'
                        }
                    }
                },
                getRelation() {
                    return relation;
                }
            };
            expect(feature.findByName(model, 'test') === relation).toBe(true);
        });
        it('splits input by dot, and find the relation by first part, then passes the rest to relation.with()', function () {
            const relation = {
                with() { }
            };
            const model = {
                sharedMetadata: {
                    relationDefinitions: {
                        test: {
                            accessor: 'test',
                            target: 'getRelation',
                            targetType: 'function'
                        }
                    }
                },
                getRelation() {
                    return relation;
                }
            };
            const withSpy = Sinon.spy(relation, 'with');
            expect(feature.findByName(model, 'test.a.b') === relation).toBe(true);
            expect(withSpy.calledWith('a.b')).toBe(true);
        });
    });
    describe('.findDataByName()', function () {
        it('returns an instance if given name is found in "relations" property', function () {
            const data = {};
            const model = {
                internalData: {
                    relations: {
                        test: data
                    }
                }
            };
            expect(feature.findDataByName(model, 'test') === data).toBe(true);
        });
        it('create an instance of RelationData, then call defineAccessor if name not found in "relations"', function () {
            const model = {
                internalData: {
                    relations: {}
                }
            };
            const makeFactorySpy = Sinon.spy(feature, 'makeFactory');
            const defineAccessorSpy = Sinon.spy(feature, 'defineAccessor');
            expect(feature.findDataByName(model, 'test')).toBeInstanceOf(RelationData_1.RelationData);
            expect(makeFactorySpy.calledWith(model, 'test')).toBe(true);
            expect(defineAccessorSpy.calledWith(model, 'test')).toBe(true);
            makeFactorySpy.restore();
            defineAccessorSpy.restore();
        });
    });
    describe('.defineAccessor()', function () {
        it('does nothing if the accessor already defined in prototype', function () {
            class A {
                get test() {
                    return 'anything';
                }
            }
            const model = new A();
            feature.defineAccessor(model, 'test');
            expect(model.test).toEqual('anything');
        });
        it('defines an accessor which call this.getRelationByName(accessor).getData() in model prototype', function () {
            class B {
                getRelationByName(name) {
                    return {
                        getData() {
                            return name + '-data';
                        }
                    };
                }
            }
            const model = new B();
            feature.defineAccessor(model, 'test');
            expect(model.test).toEqual('test-data');
            expect(model['not-found']).toBeUndefined();
        });
    });
});
