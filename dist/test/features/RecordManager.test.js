"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const Sinon = require("sinon");
const najs_binding_1 = require("najs-binding");
const Record_1 = require("../../lib/features/Record");
const RecordManager_1 = require("../../lib/features/RecordManager");
const RecordManagerBase_1 = require("../../lib/features/RecordManagerBase");
const SettingFeature_1 = require("./../../lib/features/SettingFeature");
describe('RecordManager', function () {
    const recordManager = new RecordManager_1.RecordManager();
    it('extends RecordManagerBase and implements Autoload under name "NajsEloquent.Feature.RecordManager"', function () {
        expect(recordManager).toBeInstanceOf(RecordManagerBase_1.RecordManagerBase);
        expect(recordManager.getClassName()).toEqual('NajsEloquent.Feature.RecordManager');
    });
    describe('.initialize()', function () {
        it('simply assigns the data to model.attributes if data is instance of Record', function () {
            const data = new Record_1.Record();
            const model = {};
            recordManager.initialize(model, true, data);
            expect(model.attributes === data).toBe(true);
        });
        it('creates new Record instance if data not found or not a raw object', function () {
            const modelA = {};
            recordManager.initialize(modelA, true);
            expect(modelA.attributes).toBeInstanceOf(Record_1.Record);
            const modelB = {};
            recordManager.initialize(modelB, true, 123);
            expect(modelB.attributes).toBeInstanceOf(Record_1.Record);
        });
        it('creates new Record instance which wrap data if data is a raw object and isGuarded is false', function () {
            const data = {};
            const model = {
                fill() { }
            };
            const spy = Sinon.stub(model, 'fill');
            recordManager.initialize(model, false, data);
            expect(model.attributes).toBeInstanceOf(Record_1.Record);
            expect(model.attributes['data'] === data).toBe(true);
            expect(spy.called).toBe(false);
        });
        it('creates new Record instance and use model.fill() if data is raw object and isGuarded is true', function () {
            const data = {};
            const model = {
                fill() { }
            };
            const spy = Sinon.stub(model, 'fill');
            recordManager.initialize(model, true, data);
            expect(model.attributes).toBeInstanceOf(Record_1.Record);
            expect(model.attributes['data'] === data).toBe(false);
            expect(spy.called).toBe(true);
        });
    });
    describe('.getAttribute()', function () {
        it('calls and returns model.attributes.getAttribute()', function () {
            const model = {
                attributes: {
                    getAttribute() {
                        return 'result';
                    }
                }
            };
            const stub = Sinon.stub(model.attributes, 'getAttribute');
            stub.returns('anything');
            expect(recordManager.getAttribute(model, 'test')).toEqual('anything');
            expect(stub.calledWith('test')).toBe(true);
        });
    });
    describe('.setAttribute()', function () {
        it('calls and returns model.attributes.setAttribute()', function () {
            const model = {
                attributes: {
                    setAttribute() {
                        return 'result';
                    }
                }
            };
            const stub = Sinon.stub(model.attributes, 'setAttribute');
            stub.returns('anything');
            expect(recordManager.setAttribute(model, 'test', 'value')).toEqual('anything');
            expect(stub.calledWith('test', 'value')).toBe(true);
        });
    });
    describe('.hasAttribute()', function () {
        it('always returns true', function () {
            const model = {};
            expect(recordManager.hasAttribute(model, 'a')).toBe(true);
            expect(recordManager.hasAttribute(model, 'b')).toBe(true);
            expect(recordManager.hasAttribute(model, 'c')).toBe(true);
        });
    });
    describe('.getPrimaryKeyName()', function () {
        it('uses SettingFeature.getSettingProperty() with property "primaryKey" and default value = "id"', function () {
            class ModelWithoutCustomPrimaryKey {
                getClassName() {
                    return 'ModelWithoutCustomPrimaryKey';
                }
                getDriver() {
                    return {
                        getSettingFeature() {
                            return new SettingFeature_1.SettingFeature();
                        }
                    };
                }
            }
            najs_binding_1.register(ModelWithoutCustomPrimaryKey);
            class ModelWithCustomPrimaryKey {
                constructor() {
                    this.primaryKey = 'test';
                }
                getClassName() {
                    return 'ModelWithCustomPrimaryKey';
                }
                getDriver() {
                    return {
                        getSettingFeature() {
                            return new SettingFeature_1.SettingFeature();
                        }
                    };
                }
            }
            najs_binding_1.register(ModelWithCustomPrimaryKey);
            expect(recordManager.getPrimaryKeyName(new ModelWithoutCustomPrimaryKey())).toEqual('id');
            expect(recordManager.getPrimaryKeyName(new ModelWithCustomPrimaryKey())).toEqual('test');
        });
    });
    describe('.toObject()', function () {
        it('calls and returns model.attributes.toObject()', function () {
            const model = {
                attributes: {
                    toObject() {
                        return 'result';
                    }
                }
            };
            const stub = Sinon.stub(model.attributes, 'toObject');
            stub.returns('anything');
            expect(recordManager.toObject(model)).toEqual('anything');
            expect(stub.calledWith()).toBe(true);
        });
    });
    describe('.markModified()', function () {
        it('flattens the keys and calls model.attributes.markModified()', function () {
            const model = {
                attributes: {
                    markModified() {
                        return 'result';
                    }
                }
            };
            const spy = Sinon.stub(model.attributes, 'markModified');
            recordManager.markModified(model, [['a', ['b', 'c']]]);
            expect(spy.callCount).toEqual(3);
            expect(spy.firstCall.calledWith('a')).toBe(true);
            expect(spy.secondCall.calledWith('b')).toBe(true);
            expect(spy.thirdCall.calledWith('c')).toBe(true);
        });
    });
    describe('.isModified()', function () {
        it('flattens the keys and returns true if all keys in model.attributes.getModified()', function () {
            const model = {
                attributes: {
                    getModified() {
                        return ['a', 'b'];
                    }
                }
            };
            expect(recordManager.isModified(model, [['a', ['b']]])).toBe(true);
            expect(recordManager.isModified(model, [['a', ['b', 'c']]])).toBe(false);
        });
    });
    describe('.getModified()', function () {
        it('calls and returns model.attributes.getModified()', function () {
            const model = {
                attributes: {
                    getModified() {
                        return 'result';
                    }
                }
            };
            const stub = Sinon.stub(model.attributes, 'getModified');
            stub.returns('anything');
            expect(recordManager.getModified(model)).toEqual('anything');
            expect(stub.calledWith()).toBe(true);
        });
    });
});
