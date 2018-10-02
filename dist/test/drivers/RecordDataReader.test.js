"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const Sinon = require("sinon");
const Record_1 = require("../../lib/drivers/Record");
const RecordDataReader_1 = require("../../lib/drivers/RecordDataReader");
describe('RecordDataReader', function () {
    describe('.getAttribute()', function () {
        it('calls and returns data.getAttribute()', function () {
            const record = new Record_1.Record();
            const stub = Sinon.stub(record, 'getAttribute');
            stub.returns('anything');
            expect(RecordDataReader_1.RecordDataReader.getAttribute(record, 'a')).toEqual('anything');
            expect(stub.calledWith('a')).toBe(true);
        });
    });
    describe('.pick()', function () {
        it('creates new Record instance with the Lodash.pick() data', function () {
            const record = new Record_1.Record({ id: 1, first_name: 'a', last_name: 'x', age: 30 });
            const result = RecordDataReader_1.RecordDataReader.pick(record, ['first_name', 'last_name']);
            expect(result === record).toBe(false);
            expect(result.toObject()).toEqual({ first_name: 'a', last_name: 'x' });
        });
    });
});
