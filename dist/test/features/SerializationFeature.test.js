"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const Sinon = require("sinon");
const Helpers = require("../../lib/util/helpers");
const FeatureBase_1 = require("../../lib/features/FeatureBase");
const SerializationFeature_1 = require("../../lib/features/SerializationFeature");
const SerializationPublicApi_1 = require("../../lib/features/mixin/SerializationPublicApi");
const SettingFeature_1 = require("../../lib/features/SettingFeature");
const factory_1 = require("../../lib/util/factory");
describe('SerializationFeature', function () {
    const serializationFeature = new SerializationFeature_1.SerializationFeature();
    it('extends FeatureBase, implements Najs.Contracts.Autoload under name NajsEloquent.Feature.SerializationFeature', function () {
        expect(serializationFeature).toBeInstanceOf(FeatureBase_1.FeatureBase);
        expect(serializationFeature.getClassName()).toEqual('NajsEloquent.Feature.SerializationFeature');
    });
    describe('.attachPublicApi()', function () {
        it('simply assigns all functions in SerializationPublicApi to the prototype', function () {
            const prototype = {};
            serializationFeature.attachPublicApi(prototype, [{}], {});
            for (const name in SerializationPublicApi_1.SerializationPublicApi) {
                expect(prototype[name] === SerializationPublicApi_1.SerializationPublicApi[name]).toBe(true);
            }
        });
    });
    describe('.getFeatureName()', function () {
        it('returns literally string "Serialization"', function () {
            expect(serializationFeature.getFeatureName()).toEqual('Serialization');
        });
    });
    describe('.getVisible()', function () {
        it('calls and returns SettingFeature.getArrayUniqueSetting() with property "visible", default value []', function () {
            const settingFeature = {
                getArrayUniqueSetting() {
                    return 'result';
                }
            };
            const model = {
                getDriver() {
                    return {
                        getSettingFeature() {
                            return settingFeature;
                        }
                    };
                }
            };
            const stub = Sinon.stub(settingFeature, 'getArrayUniqueSetting');
            stub.returns('anything');
            expect(serializationFeature.getVisible(model)).toEqual('anything');
            expect(stub.calledWith(model, 'visible', [])).toBe(true);
        });
    });
    describe('.getHidden()', function () {
        it('calls and returns SettingFeature.getArrayUniqueSetting() with property "hidden", default value []', function () {
            const settingFeature = {
                getArrayUniqueSetting() {
                    return 'result';
                }
            };
            const model = {
                getDriver() {
                    return {
                        getSettingFeature() {
                            return settingFeature;
                        }
                    };
                }
            };
            const stub = Sinon.stub(settingFeature, 'getArrayUniqueSetting');
            stub.returns('anything');
            expect(serializationFeature.getHidden(model)).toEqual('anything');
            expect(stub.calledWith(model, 'hidden', [])).toBe(true);
        });
    });
    describe('.markVisible()', function () {
        it('calls and returns SettingFeature.pushToUniqueArraySetting() with property "visible" and passed param', function () {
            const settingFeature = {
                pushToUniqueArraySetting() {
                    return 'result';
                }
            };
            const model = {
                getDriver() {
                    return {
                        getSettingFeature() {
                            return settingFeature;
                        }
                    };
                }
            };
            const stub = Sinon.stub(settingFeature, 'pushToUniqueArraySetting');
            stub.returns('anything');
            const keys = ['a', ['b', 'c']];
            expect(serializationFeature.markVisible(model, keys)).toEqual('anything');
            expect(stub.calledWith(model, 'visible', keys)).toBe(true);
        });
    });
    describe('.markHidden()', function () {
        it('calls and returns SettingFeature.pushToUniqueArraySetting() with property "hidden" and passed param', function () {
            const settingFeature = {
                pushToUniqueArraySetting() {
                    return 'result';
                }
            };
            const model = {
                getDriver() {
                    return {
                        getSettingFeature() {
                            return settingFeature;
                        }
                    };
                }
            };
            const stub = Sinon.stub(settingFeature, 'pushToUniqueArraySetting');
            stub.returns('anything');
            const keys = ['a', ['b', 'c']];
            expect(serializationFeature.markHidden(model, keys)).toEqual('anything');
            expect(stub.calledWith(model, 'hidden', keys)).toBe(true);
        });
    });
    describe('.isVisible()', function () {
        it('calls and returns SettingFeature.isInWhiteList() with params from .getVisible() and .getHidden()', function () {
            const settingFeature = {
                isInWhiteList() {
                    return 'result';
                }
            };
            const model = {
                getDriver() {
                    return {
                        getSettingFeature() {
                            return settingFeature;
                        }
                    };
                }
            };
            const getFillableResult = {};
            const getFillableStub = Sinon.stub(serializationFeature, 'getVisible');
            getFillableStub.returns(getFillableResult);
            const getGuardedResult = {};
            const getGuardedStub = Sinon.stub(serializationFeature, 'getHidden');
            getGuardedStub.returns(getGuardedResult);
            const stub = Sinon.stub(settingFeature, 'isInWhiteList');
            stub.returns('anything');
            const keys = ['a', ['b', 'c']];
            expect(serializationFeature.isVisible(model, keys)).toEqual('anything');
            expect(getFillableStub.calledWith(model)).toBe(true);
            expect(getGuardedStub.calledWith(model)).toBe(true);
            expect(stub.calledWith(model, keys, getFillableResult, getGuardedResult)).toBe(true);
            getFillableStub.restore();
            getGuardedStub.restore();
        });
    });
    describe('.isHidden()', function () {
        it('calls and returns SettingFeature.isInBlackList() with params from and .getHidden()', function () {
            const settingFeature = {
                isInBlackList() {
                    return 'result';
                }
            };
            const model = {
                getDriver() {
                    return {
                        getSettingFeature() {
                            return settingFeature;
                        }
                    };
                }
            };
            const getGuardedResult = {};
            const getGuardedStub = Sinon.stub(serializationFeature, 'getHidden');
            getGuardedStub.returns(getGuardedResult);
            const stub = Sinon.stub(settingFeature, 'isInBlackList');
            stub.returns('anything');
            const keys = ['a', ['b', 'c']];
            expect(serializationFeature.isHidden(model, keys)).toEqual('anything');
            expect(getGuardedStub.calledWith(model)).toBe(true);
            expect(stub.calledWith(model, keys, getGuardedResult)).toBe(true);
            getGuardedStub.restore();
        });
    });
    describe('.attributesToObject()', function () {
        it('calls and returns with data from RecordManager.toObject()', function () {
            const data = {};
            const model = {
                getDriver() {
                    return {
                        getRecordManager() {
                            return {
                                toObject() {
                                    return data;
                                }
                            };
                        }
                    };
                }
            };
            const stub = Sinon.stub(serializationFeature, 'applyVisibleAndHiddenFor');
            stub.returns('anything');
            expect(serializationFeature.attributesToObject(model, false) === data).toBe(true);
            expect(stub.called).toBe(false);
            stub.restore();
        });
        it('calls and returns .applyVisibleAndHiddenFor() with data from RecordManager.toObject()', function () {
            const data = {};
            const model = {
                getDriver() {
                    return {
                        getRecordManager() {
                            return {
                                toObject() {
                                    return data;
                                }
                            };
                        }
                    };
                }
            };
            const stub = Sinon.stub(serializationFeature, 'applyVisibleAndHiddenFor');
            stub.returns('anything');
            expect(serializationFeature.attributesToObject(model)).toEqual('anything');
            expect(stub.calledWith(model, data)).toBe(true);
            stub.restore();
        });
    });
    describe('.relationDataToObject()', function () {
        it('calls RelationFeature.getEmptyValueForSerializedRelation() if the data is not model or collection', function () {
            const relationFeature = {
                getEmptyValueForSerializedRelation() {
                    return 'empty-value';
                }
            };
            const model = {
                getDriver() {
                    return {
                        getRelationFeature() {
                            return relationFeature;
                        }
                    };
                }
            };
            const spy = Sinon.spy(relationFeature, 'getEmptyValueForSerializedRelation');
            expect(serializationFeature.relationDataToObject(model, 'data', [], 'name', true)).toEqual('empty-value');
            expect(spy.calledWith(model, 'name')).toBe(true);
        });
        it('calls & returns data.toObject() with data, chains and formatName options', function () {
            const serializationFeatureNextModel = {
                toObject() {
                    return 'anything';
                }
            };
            const model = {
                getDriver() {
                    return {
                        getSerializationFeature() {
                            return serializationFeatureNextModel;
                        }
                    };
                }
            };
            const stub = Sinon.stub(Helpers, 'isModel');
            stub.returns(true);
            const spy = Sinon.spy(serializationFeatureNextModel, 'toObject');
            expect(serializationFeature.relationDataToObject({}, model, ['chains', 'x', 'y'], 'name', false)).toEqual('anything');
            expect(spy.calledWith(model, ['chains', 'x', 'y'], false)).toBe(true);
            stub.restore();
        });
        it('maps item then calls & returns data.toObject() with data, chains and formatName options if the data is collection', function () {
            const serializationFeatureNextModel = {
                toObject() {
                    return 'anything';
                }
            };
            const model1 = {
                getDriver() {
                    return {
                        getSerializationFeature() {
                            return serializationFeatureNextModel;
                        }
                    };
                }
            };
            const model2 = {
                getDriver() {
                    return {
                        getSerializationFeature() {
                            return serializationFeatureNextModel;
                        }
                    };
                }
            };
            const spy = Sinon.spy(serializationFeatureNextModel, 'toObject');
            expect(serializationFeature.relationDataToObject({}, factory_1.make_collection([model1, model2]), ['chains', 'x', 'y'], 'name', false)).toEqual(['anything', 'anything']);
            expect(spy.firstCall.calledWith(model1, ['chains', 'x', 'y'], false)).toBe(true);
            expect(spy.secondCall.calledWith(model2, ['chains', 'x', 'y'], false)).toBe(true);
        });
    });
    describe('.relationsToObject()', function () {
        it('calls model.getLoadedRelations() the reduce with .relationDataToObject() if the given names is undefined', function () {
            const relation1 = {
                getName() {
                    return 'relation-1';
                },
                getData() {
                    return 'relation-1-data';
                },
                getChains() {
                    return 'relation-1-chains';
                }
            };
            const relation2 = {
                getName() {
                    return 'relation-2';
                },
                getData() {
                    return 'relation-2-data';
                },
                getChains() {
                    return 'relation-2-chains';
                }
            };
            const model = {
                getLoadedRelations() {
                    return [relation1, relation2];
                },
                formatAttributeName(name) {
                    return 'formatted-' + name;
                }
            };
            const stub = Sinon.stub(serializationFeature, 'relationDataToObject');
            stub.returns('relation-data');
            const applyVisibleAndHiddenForStub = Sinon.stub(serializationFeature, 'applyVisibleAndHiddenFor');
            applyVisibleAndHiddenForStub.returns('applied-result');
            expect(serializationFeature.relationsToObject(model, undefined, false, false)).toEqual({
                'relation-1': 'relation-data',
                'relation-2': 'relation-data'
            });
            expect(stub.firstCall.calledWith(model, 'relation-1-data', 'relation-1-chains', 'relation-1', false)).toBe(true);
            expect(stub.secondCall.calledWith(model, 'relation-2-data', 'relation-2-chains', 'relation-2', false)).toBe(true);
            expect(applyVisibleAndHiddenForStub.called).toBe(false);
            stub.restore();
            applyVisibleAndHiddenForStub.restore();
        });
        it('calls model.getRelations() the reduce with .relationDataToObject() if the given names is not undefined. Case with option formatName = true', function () {
            const relation1 = {
                getName() {
                    return 'relation-1';
                },
                getData() {
                    return 'relation-1-data';
                },
                getChains() {
                    return 'relation-1-chains';
                }
            };
            const relation2 = {
                getName() {
                    return 'relation-2';
                },
                getData() {
                    return 'relation-2-data';
                },
                getChains() {
                    return 'relation-2-chains';
                }
            };
            const model = {
                getRelations() {
                    return [relation1, relation2];
                },
                formatAttributeName(name) {
                    return 'formatted-' + name;
                }
            };
            const stub = Sinon.stub(serializationFeature, 'relationDataToObject');
            stub.returns('relation-data');
            const applyVisibleAndHiddenForStub = Sinon.stub(serializationFeature, 'applyVisibleAndHiddenFor');
            applyVisibleAndHiddenForStub.returns('applied-result');
            const spy = Sinon.spy(model, 'getRelations');
            expect(serializationFeature.relationsToObject(model, ['a', 'b'], true, false)).toEqual({
                'formatted-relation-1': 'relation-data',
                'formatted-relation-2': 'relation-data'
            });
            expect(stub.firstCall.calledWith(model, 'relation-1-data', 'relation-1-chains', 'relation-1', true)).toBe(true);
            expect(stub.secondCall.calledWith(model, 'relation-2-data', 'relation-2-chains', 'relation-2', true)).toBe(true);
            expect(spy.calledWith(['a', 'b'])).toBe(true);
            expect(applyVisibleAndHiddenForStub.called).toBe(false);
            stub.restore();
            applyVisibleAndHiddenForStub.restore();
        });
        it('calls .applyVisibleAndHiddenForStub() with result if needed', function () {
            const relation1 = {
                getName() {
                    return 'relation-1';
                },
                getData() {
                    return 'relation-1-data';
                },
                getChains() {
                    return 'relation-1-chains';
                }
            };
            const relation2 = {
                getName() {
                    return 'relation-2';
                },
                getData() {
                    return 'relation-2-data';
                },
                getChains() {
                    return 'relation-2-chains';
                }
            };
            const model = {
                getRelations() {
                    return [relation1, relation2];
                },
                formatAttributeName(name) {
                    return 'formatted-' + name;
                }
            };
            const stub = Sinon.stub(serializationFeature, 'relationDataToObject');
            stub.returns('relation-data');
            const applyVisibleAndHiddenForStub = Sinon.stub(serializationFeature, 'applyVisibleAndHiddenFor');
            applyVisibleAndHiddenForStub.returns('applied-result');
            const spy = Sinon.spy(model, 'getRelations');
            expect(serializationFeature.relationsToObject(model, ['a', 'b'], true)).toEqual('applied-result');
            expect(stub.firstCall.calledWith(model, 'relation-1-data', 'relation-1-chains', 'relation-1', true)).toBe(true);
            expect(stub.secondCall.calledWith(model, 'relation-2-data', 'relation-2-chains', 'relation-2', true)).toBe(true);
            expect(spy.calledWith(['a', 'b'])).toBe(true);
            expect(applyVisibleAndHiddenForStub.calledWith({
                'formatted-relation-1': 'relation-data',
                'formatted-relation-2': 'relation-data'
            })).toBe(false);
            stub.restore();
            applyVisibleAndHiddenForStub.restore();
        });
    });
    describe('.applyVisibleAndHiddenFor()', function () {
        const dataset = [
            {
                data: { a: 1, b: 2, c: 3, d: 4 },
                visible: [],
                hidden: [],
                result: { a: 1, b: 2, c: 3, d: 4 }
            },
            {
                data: { a: 1, b: 2, c: 3, d: 4 },
                visible: [],
                hidden: ['a'],
                result: { b: 2, c: 3, d: 4 }
            },
            {
                data: { a: 1, b: 2, c: 3, d: 4 },
                visible: ['a', 'b'],
                hidden: [],
                result: { a: 1, b: 2 }
            },
            {
                data: { a: 1, b: 2, c: 3, d: 4 },
                visible: ['a', 'c'],
                hidden: ['b'],
                result: { a: 1, c: 3 }
            }
        ];
        for (const item of dataset) {
            it('filters data if the attribute name matches SettingFeature.isKeyInWhiteList()', function () {
                const model = {
                    getDriver() {
                        return {
                            getSettingFeature() {
                                return new SettingFeature_1.SettingFeature();
                            },
                            getRecordManager() {
                                return {
                                    getKnownAttributes() {
                                        return [];
                                    }
                                };
                            }
                        };
                    }
                };
                const getVisibleResult = item.visible;
                const getVisibleStub = Sinon.stub(serializationFeature, 'getVisible');
                getVisibleStub.returns(getVisibleResult);
                const getHiddenResult = item.hidden;
                const getHiddenStub = Sinon.stub(serializationFeature, 'getHidden');
                getHiddenStub.returns(getHiddenResult);
                expect(serializationFeature.applyVisibleAndHiddenFor(model, item.data)).toEqual(item.result);
                getVisibleStub.restore();
                getHiddenStub.restore();
            });
        }
    });
    describe('.toObject()', function () {
        it('calls .attributesToObject() & .relationsToObject() with option shouldApplyVisibleAndHidden = false then merges and ', function () {
            const attributesToObjectStub = Sinon.stub(serializationFeature, 'attributesToObject');
            const relationsToObjectStub = Sinon.stub(serializationFeature, 'relationsToObject');
            const applyVisibleAndHiddenForStub = Sinon.stub(serializationFeature, 'applyVisibleAndHiddenFor');
            attributesToObjectStub.returns({ a: 1 });
            relationsToObjectStub.returns({ b: 2 });
            applyVisibleAndHiddenForStub.returns('anything');
            const relations = {};
            const model = {};
            expect(serializationFeature.toObject(model, relations, true)).toEqual('anything');
            expect(attributesToObjectStub.calledWith(model, false)).toBe(true);
            expect(relationsToObjectStub.calledWith(model, relations, true, false)).toBe(true);
            expect(applyVisibleAndHiddenForStub.calledWith(model, { a: 1, b: 2 })).toBe(true);
            attributesToObjectStub.restore();
            relationsToObjectStub.restore();
            applyVisibleAndHiddenForStub.restore();
        });
    });
    describe('.toJson()', function () {
        it('simply calls JSON.stringify() with data provided from .toObject()', function () {
            const stub = Sinon.stub(JSON, 'stringify');
            stub.returns('anything');
            const toObjectStub = Sinon.stub(serializationFeature, 'toObject');
            toObjectStub.returns('object');
            const model = {};
            expect(serializationFeature.toJson(model, 'replacer', 'space')).toEqual('anything');
            expect(toObjectStub.calledWith(model)).toBe(true);
            expect(stub.calledWith('object', 'replacer', 'space')).toBe(true);
            toObjectStub.restore();
            stub.restore();
        });
    });
});
