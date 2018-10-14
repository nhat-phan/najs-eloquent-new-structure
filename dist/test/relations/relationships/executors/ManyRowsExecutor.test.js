"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const Sinon = require("sinon");
const ManyRowsExecutor_1 = require("../../../../lib/relations/relationships/executors/ManyRowsExecutor");
const helpers_1 = require("../../../../lib/util/helpers");
describe('ManyRowsExecutor', function () {
    describe('constructor()', function () {
        it('takes dataBucket and targetModel and assigns to the properties "dataBucket", "targetModel" respectively', function () {
            const dataBucket = {};
            const targetModel = {};
            const executor = new ManyRowsExecutor_1.ManyRowsExecutor(dataBucket, targetModel);
            expect(executor['dataBucket'] === dataBucket).toBe(true);
            expect(executor['targetModel'] === targetModel).toBe(true);
        });
    });
    describe('.executeCollector()', function () {
        it('calls collector.exec(), then create a Collection by DataBucket.makeCollection() with the result', function () {
            const collector = {
                exec() { }
            };
            const execStub = Sinon.stub(collector, 'exec');
            const itemOne = {};
            const itemTwo = {};
            const result = [itemOne, itemTwo];
            execStub.returns(result);
            const dataBucket = {
                makeCollection(target, data) {
                    return data;
                }
            };
            const targetModel = {};
            const executor = new ManyRowsExecutor_1.ManyRowsExecutor(dataBucket, targetModel);
            const spy = Sinon.spy(dataBucket, 'makeCollection');
            expect(executor.executeCollector(collector) === result).toBe(true);
            expect(execStub.calledWith()).toBe(true);
            expect(spy.calledWith(targetModel, [itemOne, itemTwo])).toBe(true);
        });
    });
    describe('.executeQuery()', function () {
        it('simply calls and returns query.get()', async function () {
            const dataBucket = {};
            const targetModel = {};
            const executor = new ManyRowsExecutor_1.ManyRowsExecutor(dataBucket, targetModel);
            const query = {
                async get() {
                    return 'anything';
                }
            };
            expect(await executor.executeQuery(query)).toBe('anything');
        });
    });
    describe('.getEmptyValue()', function () {
        it('returns empty collection', function () {
            const dataBucket = {};
            const targetModel = {};
            const executor = new ManyRowsExecutor_1.ManyRowsExecutor(dataBucket, targetModel);
            expect(helpers_1.isCollection(executor.getEmptyValue())).toBe(true);
        });
    });
});
