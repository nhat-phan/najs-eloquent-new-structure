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
                relationDataBucket: relationDataBucket
            };
            expect(feature.getDataBucket(model) === relationDataBucket).toBe(true);
        });
    });
    describe('.setDataBucket()', function () {
        it('simply sets an property "relationDataBucket" of model', function () {
            const relationDataBucket = {};
            const model = {};
            feature.setDataBucket(model, relationDataBucket);
            expect(model.relationDataBucket === relationDataBucket).toBe(true);
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
        it('simply returns an property "relationDefinitions" of model', function () {
            const relationDefinitions = {};
            const model = {
                relationDefinitions: relationDefinitions
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
        it('returns an empty object for now', function () {
            expect(feature.findByName({}, 'test')).toEqual({});
        });
    });
    describe('.findDataByName()', function () {
        it('returns an instance if given name is found in "relations" property', function () {
            const data = {};
            const model = {
                relations: {
                    test: data
                }
            };
            expect(feature.findDataByName(model, 'test') === data).toBe(true);
        });
        it('create an instance of RelationData, then call defineAccessor if name not found in "relations"', function () {
            const model = {
                relations: {}
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
        it('do nothing for now', function () {
            const model = {};
            feature.defineAccessor(model, 'test');
        });
    });
});
