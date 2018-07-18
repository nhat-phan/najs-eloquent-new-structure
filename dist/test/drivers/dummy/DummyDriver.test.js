"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const Sinon = require("sinon");
const NajsBinding = require("najs-binding");
const DummyDriver_1 = require("../../../lib/drivers/dummy/DummyDriver");
const RecordManager_1 = require("../../../lib/features/RecordManager");
describe('DummyDriver', function () {
    it('implements Najs.Contracts.Autoload under name NajsEloquent.Driver.DummyDriver', function () {
        const dummyDriver = new DummyDriver_1.DummyDriver();
        expect(dummyDriver.getClassName()).toEqual('NajsEloquent.Driver.DummyDriver');
    });
    describe('constructor()', function () {
        it('creates instance of RecordManager via NajsBinding.make() and assigned to property recordManager', function () {
            const makeSpy = Sinon.spy(NajsBinding, 'make');
            const dummyDriver = new DummyDriver_1.DummyDriver();
            expect(dummyDriver['recordManager']).toBeInstanceOf(RecordManager_1.RecordManager);
            expect(makeSpy.lastCall.calledWith('NajsEloquent.Feature.RecordManager')).toBe(true);
            makeSpy.restore();
        });
    });
    describe('.getRecordManager()', function () {
        it('simply returns "recordManager" property', function () {
            const recordManager = {};
            const dummyDriver = new DummyDriver_1.DummyDriver();
            dummyDriver['recordManager'] = recordManager;
            expect(dummyDriver.getRecordManager() === recordManager).toBe(true);
        });
    });
});
