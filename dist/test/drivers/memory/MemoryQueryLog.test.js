"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const Sinon = require("sinon");
const MemoryQueryLog_1 = require("../../../lib/drivers/memory/MemoryQueryLog");
const QueryLogBase_1 = require("../../../lib/drivers/QueryLogBase");
describe('MemoryQueryLog', function () {
    it('extends QueryLogBase', function () {
        const logger = new MemoryQueryLog_1.MemoryQueryLog();
        expect(logger).toBeInstanceOf(QueryLogBase_1.QueryLogBase);
    });
    describe('.getDefaultData()', function () {
        it('simply calls and returns .getEmptyData()', function () {
            const logger = new MemoryQueryLog_1.MemoryQueryLog();
            const stub = Sinon.stub(logger, 'getEmptyData');
            stub.returns('anything');
            expect(logger.getDefaultData()).toEqual('anything');
        });
    });
    describe('.dataSource()', function () {
        it('assigns the className of DataSource class to dataSource property', function () {
            const logger = new MemoryQueryLog_1.MemoryQueryLog();
            const dataSource = {
                getClassName() {
                    return 'anything';
                }
            };
            expect(logger.dataSource(dataSource) === logger).toBe(true);
            expect(logger['data']['dataSource']).toEqual('anything');
        });
    });
});
