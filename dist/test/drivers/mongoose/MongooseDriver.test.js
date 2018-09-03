"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const Sinon = require("sinon");
const NajsBinding = require("najs-binding");
const DriverBase_1 = require("../../../lib/drivers/DriverBase");
const MongooseDriver_1 = require("../../../lib/drivers/mongoose/MongooseDriver");
const MongooseQueryBuilder_1 = require("../../../lib/drivers/mongoose/MongooseQueryBuilder");
const MongooseDocumentManager_1 = require("../../../lib/drivers/mongoose/MongooseDocumentManager");
describe('MongooseDriver', function () {
    it('extends DriverBase, implements Autoload under name "NajsEloquent.Driver.MongooseDriver"', function () {
        const driver = new MongooseDriver_1.MongooseDriver();
        expect(driver).toBeInstanceOf(DriverBase_1.DriverBase);
        expect(driver.getClassName()).toEqual('NajsEloquent.Driver.MongooseDriver');
    });
    describe('constructor()', function () {
        it('makes RecordManager from "NajsEloquent.Driver.Mongoose.MongooseDocumentManager" class', function () {
            const makeSpy = Sinon.spy(NajsBinding, 'make');
            const driver = new MongooseDriver_1.MongooseDriver();
            expect(makeSpy.lastCall.calledWith('NajsEloquent.Driver.Mongoose.MongooseDocumentManager')).toBe(true);
            expect(driver['documentManager']).toBeInstanceOf(MongooseDocumentManager_1.MongooseDocumentManager);
            makeSpy.restore();
        });
    });
    describe('.getClassName()', function () {
        it('implements Autoload under name "NajsEloquent.Driver.MongooseDriver"', function () {
            const driver = new MongooseDriver_1.MongooseDriver();
            expect(driver.getClassName()).toEqual('NajsEloquent.Driver.MongooseDriver');
        });
    });
    describe('.getRecordManager()', function () {
        it('simply returns property "documentManager"', function () {
            const driver = new MongooseDriver_1.MongooseDriver();
            expect(driver.getRecordManager() === driver['documentManager']).toBe(true);
        });
    });
    describe('.makeQuery()', function () {
        it('creates and returns an instance of MongooseQueryBuilder every calls', function () {
            const model = {
                getRecordName() {
                    return 'model';
                }
            };
            const driver = new MongooseDriver_1.MongooseDriver();
            const query1 = driver.makeQuery(model);
            const query2 = driver.makeQuery(model);
            expect(query1 === query2).toBe(false);
            expect(query1).toBeInstanceOf(MongooseQueryBuilder_1.MongooseQueryBuilder);
        });
    });
});
