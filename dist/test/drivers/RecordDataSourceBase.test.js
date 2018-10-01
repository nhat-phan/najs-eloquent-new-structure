"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const Sinon = require("sinon");
const Record_1 = require("../../lib/drivers/Record");
const MemoryDataSource_1 = require("../../lib/drivers/memory/MemoryDataSource");
describe('RecordDataSourceBase', function () {
    const model = {
        getModelName() {
            return 'test';
        },
        getPrimaryKeyName() {
            return 'id';
        }
    };
    describe('constructor()', function () {
        it('assigns modelName and primaryKeyName to respective properties and create new buffer as a Map', function () {
            const ds = new MemoryDataSource_1.MemoryDataSource(model);
            expect(ds.getModelName()).toEqual('test');
            expect(ds.getPrimaryKeyName()).toEqual('id');
            expect(ds.getBuffer()).toBeInstanceOf(Map);
        });
    });
    describe('.add()', function () {
        it('is chainable, simply assigns the record to map with id from .getPrimaryKey()', function () {
            const record = new Record_1.Record();
            const ds = new MemoryDataSource_1.MemoryDataSource(model);
            const stub = Sinon.stub(ds, 'getPrimaryKey');
            stub.returns('anything');
            expect(ds.add(record) === ds).toBe(true);
            expect(ds.getBuffer().get('anything') === record).toBe(true);
        });
    });
    describe('.remove()', function () {
        it('is chainable, simply removes the record out of map with id from .getPrimaryKey()', function () {
            const record = new Record_1.Record();
            const ds = new MemoryDataSource_1.MemoryDataSource(model);
            const stub = Sinon.stub(ds, 'getPrimaryKey');
            stub.returns('anything');
            ds.add(record);
            expect(ds.remove(record) === ds).toBe(true);
            expect(ds.getBuffer().get('anything')).toBeUndefined();
        });
    });
    describe('.filter()', function () {
        it('loops each value item then filters based on the callback', function () {
            const ds = new MemoryDataSource_1.MemoryDataSource(model);
            const a = new Record_1.Record({ name: 'a' });
            const b = new Record_1.Record({ name: 'b' });
            const c = new Record_1.Record({ name: 'c' });
            const d = new Record_1.Record({ name: 'd' });
            ds.add(a)
                .add(b)
                .add(c)
                .add(d);
            const resultOne = ds.filter(item => ['b', 'c'].indexOf(item.getAttribute('name')) !== -1);
            const resultTwo = ds.filter(item => ['a', 'd'].indexOf(item.getAttribute('name')) !== -1);
            const resultThree = ds.filter(item => ['a', 'd'].indexOf(item.getAttribute('name')) !== -1);
            expect(resultOne).toEqual([b, c]);
            expect(resultTwo).toEqual([a, d]);
            expect(resultThree).toEqual([a, d]);
            expect(resultTwo === resultThree).toBe(false);
        });
    });
    describe('[Symbol.iterator]()', function () {
        it('returns the iterator of buffer.values()', function () {
            const ds = new MemoryDataSource_1.MemoryDataSource(model);
            ds.add(new Record_1.Record({ name: 'a' }));
            ds.add(new Record_1.Record({ name: 'b' }));
            ds.add(new Record_1.Record({ name: 'c' }));
            const result = [];
            for (const item of ds) {
                result.push(item.getAttribute('name'));
            }
            expect(result.join('')).toEqual('abc');
        });
    });
});
