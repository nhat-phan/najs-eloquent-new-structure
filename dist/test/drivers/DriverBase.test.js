"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const Sinon = require("sinon");
const NajsBinding = require("najs-binding");
const ClassSetting_1 = require("../../lib/util/ClassSetting");
const DummyDriver_1 = require("../../lib/drivers/DummyDriver");
const FillableFeature_1 = require("../../lib/features/FillableFeature");
const SettingFeature_1 = require("../../lib/features/SettingFeature");
describe('DriverBase', function () {
    function createDriver() {
        return new DummyDriver_1.DummyDriver();
    }
    const driver = createDriver();
    describe('constructor()', function () {
        it('creates instance of common features via NajsBinding.make()', function () {
            const makeSpy = Sinon.spy(NajsBinding, 'make');
            const driverBase = createDriver();
            expect(driverBase['fillableFeature']).toBeInstanceOf(FillableFeature_1.FillableFeature);
            expect(driverBase['settingFeature']).toBeInstanceOf(SettingFeature_1.SettingFeature);
            expect(makeSpy.firstCall.calledWith('NajsEloquent.Feature.FillableFeature')).toBe(true);
            expect(makeSpy.secondCall.calledWith('NajsEloquent.Feature.SettingFeature')).toBe(true);
            makeSpy.restore();
        });
    });
    describe('.getFillableFeature()', function () {
        it('simply returns "fillableFeature" property', function () {
            const fillableFeature = {};
            const driverBase = createDriver();
            driverBase['fillableFeature'] = fillableFeature;
            expect(driverBase.getFillableFeature() === fillableFeature).toBe(true);
        });
    });
    describe('.getSettingFeature()', function () {
        it('simply returns "settingFeature" property', function () {
            const settingFeature = {};
            const driverBase = createDriver();
            driverBase['settingFeature'] = settingFeature;
            expect(driverBase.getSettingFeature() === settingFeature).toBe(true);
        });
    });
    describe('.makeModel()', function () {
        it('does nothing, just returns model if the data is "create-sample"', function () {
            const model = {};
            const initializeSpy = Sinon.spy(driver.getRecordManager(), 'initialize');
            const attachPublicApiIfNeededSpy = Sinon.spy(driver, 'attachPublicApiIfNeeded');
            driver.makeModel(model, ClassSetting_1.CREATE_SAMPLE);
            expect(initializeSpy.called).toBe(false);
            expect(attachPublicApiIfNeededSpy.called).toBe(false);
            initializeSpy.restore();
            attachPublicApiIfNeededSpy.restore();
        });
        it('calls RecordManager.initialize() and .attachPublicApiIfNeeded() then returns the model', function () {
            const initializeStub = Sinon.stub(driver.getRecordManager(), 'initialize');
            const attachPublicApiIfNeededStub = Sinon.stub(driver, 'attachPublicApiIfNeeded');
            const data = {};
            const model = {};
            expect(driver.makeModel(model) === model).toBe(true);
            expect(initializeStub.calledWith(model, true)).toBe(true);
            expect(attachPublicApiIfNeededStub.calledWith(model)).toBe(true);
            initializeStub.reset();
            attachPublicApiIfNeededStub.reset();
            expect(driver.makeModel(model, data) === model).toBe(true);
            expect(initializeStub.calledWith(model, true, data)).toBe(true);
            expect(attachPublicApiIfNeededStub.calledWith(model)).toBe(true);
            initializeStub.reset();
            attachPublicApiIfNeededStub.reset();
            expect(driver.makeModel(model, data, false) === model).toBe(true);
            expect(initializeStub.calledWith(model, false, data)).toBe(true);
            expect(attachPublicApiIfNeededStub.calledWith(model)).toBe(true);
            initializeStub.reset();
            attachPublicApiIfNeededStub.reset();
            expect(driver.makeModel(model, data, true) === model).toBe(true);
            expect(initializeStub.calledWith(model, true, data)).toBe(true);
            expect(attachPublicApiIfNeededStub.calledWith(model)).toBe(true);
            initializeStub.restore();
            attachPublicApiIfNeededStub.restore();
        });
    });
    describe('.attachPublicApiIfNeeded()', function () {
        it('does nothing if the model is not in property "attachedModels"', function () {
            const getFeaturesSpy = Sinon.spy(driver, 'getFeatures');
            driver['attachedModels']['Test'] = true;
            const model = {
                getModelName() {
                    return 'Test';
                }
            };
            driver.attachPublicApiIfNeeded(model);
            getFeaturesSpy.restore();
        });
        it('finds prototype and bases by find_base_prototypes() then loops all features and calls .attachFeatureIfNeeded()', function () {
            class A {
            }
            class Test extends A {
                getModelName() {
                    return 'Test';
                }
            }
            const attachFeatureIfNeededSpy = Sinon.spy(driver, 'attachFeatureIfNeeded');
            const bases = [A.prototype, Object.prototype];
            driver['attachedModels'] = {};
            driver.attachPublicApiIfNeeded(new Test());
            expect(driver['attachedModels']['Test']).toEqual({
                prototype: Test.prototype,
                bases: bases
            });
            expect(attachFeatureIfNeededSpy.callCount).toEqual(3);
            expect(attachFeatureIfNeededSpy.lastCall.calledWith(driver.getRecordManager(), Test.prototype, bases)).toBe(true);
            attachFeatureIfNeededSpy.restore();
        });
    });
    describe('.getSharedFeatures()', function () {
        it('simply returns an array of shared features', function () {
            expect(driver.getSharedFeatures()).toEqual([driver['fillableFeature'], driver['settingFeature']]);
        });
    });
    describe('.getCustomFeatures()', function () {
        it('simply returns an empty array, the concrete driver can provide the custom features by overwrite it', function () {
            expect(driver.getCustomFeatures()).toEqual([]);
        });
    });
    describe('.getFeatures()', function () {
        it('merges and returns the new array with order shared features > custom features > RecordManager', function () {
            const getSharedFeaturesStub = Sinon.stub(driver, 'getSharedFeatures');
            getSharedFeaturesStub.returns(['shared']);
            const getCustomFeatureStub = Sinon.stub(driver, 'getCustomFeatures');
            getCustomFeatureStub.returns(['custom']);
            expect(driver.getFeatures()).toEqual(['shared', 'custom', driver.getRecordManager()]);
            expect(getSharedFeaturesStub.called).toBe(true);
            expect(getCustomFeatureStub.called).toBe(true);
            getSharedFeaturesStub.restore();
            getCustomFeatureStub.restore();
        });
    });
    describe('.attachFeatureIfNeeded()', function () {
        const featureOne = {
            getFeatureName() {
                return 'one';
            },
            attachPublicApi() { }
        };
        const featureTwo = {
            getFeatureName() {
                return 'two';
            },
            attachPublicApi() { }
        };
        it('initialize the sharedMetadata/sharedMetadata.features if needed', function () {
            const prototype = {};
            driver.attachFeatureIfNeeded(featureOne, prototype, []);
            expect(prototype['sharedMetadata']).not.toBeUndefined();
            expect(prototype['sharedMetadata']['features']).not.toBeUndefined();
            expect(prototype['sharedMetadata']['features']).toEqual({ one: true });
            driver.attachFeatureIfNeeded(featureTwo, prototype, []);
            expect(prototype['sharedMetadata']['features']).toEqual({ one: true, two: true });
        });
        it('never call IFeature.attachPublicApi() if it already attached', function () {
            const attachPublicApiSpy = Sinon.spy(featureOne, 'attachPublicApi');
            const prototype = {};
            const bases = [];
            driver.attachFeatureIfNeeded(featureOne, prototype, bases);
            driver.attachFeatureIfNeeded(featureOne, prototype, bases);
            driver.attachFeatureIfNeeded(featureOne, prototype, bases);
            expect(attachPublicApiSpy.calledOnce).toBe(true);
            attachPublicApiSpy.restore();
        });
    });
});