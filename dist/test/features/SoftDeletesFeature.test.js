"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const Sinon = require("sinon");
const FeatureBase_1 = require("../../lib/features/FeatureBase");
const SoftDeletesFeature_1 = require("../../lib/features/SoftDeletesFeature");
const SoftDeletesPublicApi_1 = require("../../lib/features/mixin/SoftDeletesPublicApi");
describe('FillableFeature', function () {
    const softDeletesFeature = new SoftDeletesFeature_1.SoftDeletesFeature();
    it('extends FeatureBase, implements Najs.Contracts.Autoload under name NajsEloquent.Feature.SoftDeletesFeature', function () {
        expect(softDeletesFeature).toBeInstanceOf(FeatureBase_1.FeatureBase);
        expect(softDeletesFeature.getClassName()).toEqual('NajsEloquent.Feature.SoftDeletesFeature');
    });
    describe('.attachPublicApi()', function () {
        it('simply assigns all functions in FillablePublicApi to the prototype', function () {
            const prototype = {};
            softDeletesFeature.attachPublicApi(prototype, [{}], {});
            for (const name in SoftDeletesPublicApi_1.SoftDeletesPublicApi) {
                expect(prototype[name] === SoftDeletesPublicApi_1.SoftDeletesPublicApi[name]).toBe(true);
            }
        });
    });
    describe('.getFeatureName()', function () {
        it('returns literally string "SoftDeletes"', function () {
            expect(softDeletesFeature.getFeatureName()).toEqual('SoftDeletes');
        });
    });
    describe('.hasSoftDeletes()', function () {
        it('calls and returns SettingFeature.hasSetting() with property "softDeletes"', function () {
            const settingFeature = {
                hasSetting() {
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
            const stub = Sinon.stub(settingFeature, 'hasSetting');
            stub.returns('anything');
            expect(softDeletesFeature.hasSoftDeletes(model)).toEqual('anything');
            expect(stub.calledWith(model, 'softDeletes')).toBe(true);
        });
    });
    describe('.getSoftDeletesSetting()', function () {
        it('calls and returns SettingFeature.getSettingWithDefaultForTrueValue() with property "softDeletes", default = SoftDeletesFeature.DefaultSetting', function () {
            const settingFeature = {
                getSettingWithDefaultForTrueValue() {
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
            const stub = Sinon.stub(settingFeature, 'getSettingWithDefaultForTrueValue');
            stub.returns('anything');
            expect(softDeletesFeature.getSoftDeletesSetting(model)).toEqual('anything');
            expect(stub.calledWith(model, 'softDeletes', SoftDeletesFeature_1.SoftDeletesFeature.DefaultSetting)).toBe(true);
        });
    });
    describe('.trashed()', function () {
        it('returns false if .hasSoftDeletes() returns false', function () {
            const stub = Sinon.stub(softDeletesFeature, 'getSoftDeletesSetting');
            stub.returns({ deletedAt: 'deleted_at' });
            const hasSoftDeletesStub = Sinon.stub(softDeletesFeature, 'hasSoftDeletes');
            hasSoftDeletesStub.returns(false);
            const model = {
                getAttribute() {
                    // tslint:disable-next-line
                    return null;
                }
            };
            const spy = Sinon.spy(model, 'getAttribute');
            expect(softDeletesFeature.trashed(model)).toBe(false);
            expect(spy.calledWith('deleted_at')).toBe(false);
            hasSoftDeletesStub.restore();
            stub.restore();
        });
        it('returns false if .hasSoftDeletes() returns true but the attribute in setting returns null', function () {
            const stub = Sinon.stub(softDeletesFeature, 'getSoftDeletesSetting');
            stub.returns({ deletedAt: 'deleted_at' });
            const hasSoftDeletesStub = Sinon.stub(softDeletesFeature, 'hasSoftDeletes');
            hasSoftDeletesStub.returns(true);
            const model = {
                getAttribute() {
                    // tslint:disable-next-line
                    return null;
                }
            };
            const spy = Sinon.spy(model, 'getAttribute');
            expect(softDeletesFeature.trashed(model)).toBe(false);
            expect(spy.calledWith('deleted_at')).toBe(true);
            hasSoftDeletesStub.restore();
            stub.restore();
        });
        it('returns true if the attribute in setting has value !== null', function () {
            const stub = Sinon.stub(softDeletesFeature, 'getSoftDeletesSetting');
            stub.returns({ deletedAt: 'deleted_at' });
            const hasSoftDeletesStub = Sinon.stub(softDeletesFeature, 'hasSoftDeletes');
            hasSoftDeletesStub.returns(true);
            const model = {
                getAttribute() {
                    return 'anything';
                }
            };
            const spy = Sinon.spy(model, 'getAttribute');
            expect(softDeletesFeature.trashed(model)).toBe(true);
            expect(spy.calledWith('deleted_at')).toBe(true);
            hasSoftDeletesStub.restore();
            stub.restore();
        });
    });
    describe('.forceDelete()', function () {
        it('fires events "deleting" & "deleted"', async function () {
            const model = {
                fire() {
                    return Promise.resolve(true);
                }
            };
            const spy = Sinon.spy(model, 'fire');
            await softDeletesFeature.forceDelete(model);
            expect(spy.callCount).toEqual(2);
            expect(spy.firstCall.calledWith('deleting')).toBe(true);
            expect(spy.secondCall.calledWith('deleted')).toBe(true);
        });
        // TODO: implement test for forceDelete()
    });
    describe('.restore()', function () {
        it('fires events "restoring" & "restored"', async function () {
            const model = {
                fire() {
                    return Promise.resolve(true);
                }
            };
            const spy = Sinon.spy(model, 'fire');
            await softDeletesFeature.restore(model);
            expect(spy.callCount).toEqual(2);
            expect(spy.firstCall.calledWith('restoring')).toBe(true);
            expect(spy.secondCall.calledWith('restored')).toBe(true);
        });
        // TODO: implement test for restore()
    });
});