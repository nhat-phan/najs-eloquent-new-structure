"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const Sinon = require("sinon");
const Lodash = require("lodash");
const GenericData_1 = require("../../lib/util/GenericData");
describe('RequestDataReader', function () {
    describe('.constructor()', function () {
        it('is constructed by an Object data', function () {
            const data = {};
            const requestData = new GenericData_1.GenericData(data);
            expect(requestData['data'] === data).toBe(true);
        });
    });
    describe('.all()', function () {
        it('returns raw data which passed to constructor before', function () {
            const data = {};
            const requestData = new GenericData_1.GenericData(data);
            expect(requestData.all() === data).toBe(true);
        });
    });
    describe('.has()', function () {
        it('returns true if the item is present and is not falsy values', function () {
            const requestData = new GenericData_1.GenericData({
                a: 0,
                b: 1,
                c: '',
                d: 'd',
                e: undefined,
                // tslint:disable-next-line
                f: null,
                g: false,
                h: true
            });
            expect(requestData.has('a')).toBe(false);
            expect(requestData.has('b')).toBe(true);
            expect(requestData.has('c')).toBe(false);
            expect(requestData.has('d')).toBe(true);
            expect(requestData.has('e')).toBe(false);
            expect(requestData.has('f')).toBe(false);
            expect(requestData.has('g')).toBe(false);
            expect(requestData.has('h')).toBe(true);
        });
    });
    describe('.exists()', function () {
        it('uses Lodash.has() to determine the path exists in this.data', function () {
            const requestData = new GenericData_1.GenericData({});
            const hasSpy = Sinon.spy(Lodash, 'has');
            requestData.exists('test');
            expect(hasSpy.calledWith(requestData['data'], 'test')).toBe(true);
        });
        it('returns true if the item is present', function () {
            const requestData = new GenericData_1.GenericData({
                a: 0,
                b: 1,
                c: '',
                d: 'd',
                e: undefined,
                // tslint:disable-next-line
                f: null,
                g: false,
                h: true
            });
            expect(requestData.exists('a')).toBe(true);
            expect(requestData.exists('b')).toBe(true);
            expect(requestData.exists('c')).toBe(true);
            expect(requestData.exists('d')).toBe(true);
            expect(requestData.exists('e')).toBe(true);
            expect(requestData.exists('f')).toBe(true);
            expect(requestData.exists('g')).toBe(true);
            expect(requestData.exists('h')).toBe(true);
        });
    });
    describe('.get()', function () {
        it('uses Lodash.get() to get a value in this.data', function () {
            const requestData = new GenericData_1.GenericData({});
            const getSpy = Sinon.spy(Lodash, 'get');
            requestData.get('test');
            expect(getSpy.calledWith(requestData['data'], 'test')).toBe(true);
        });
    });
    describe('.only()', function () {
        it('should be immutable', function () {
            const requestData = new GenericData_1.GenericData({});
            expect(requestData.only('a') === requestData.all()).toBe(false);
        });
        it('returns fresh object with keys passed in arguments', function () {
            const requestData = new GenericData_1.GenericData({
                a: 'a',
                b: undefined,
                c: 1,
                d: true,
                e: false,
                f: { a: 1, b: 2 },
                g: []
            });
            expect(requestData.only('a')).toEqual({ a: 'a' });
            expect(requestData.only('a', 'b')).toEqual({ a: 'a', b: undefined });
            expect(requestData.only(['a', 'b', 'c'])).toEqual({ a: 'a', b: undefined, c: 1 });
            expect(requestData.only('a', ['b', 'c'], 'd', 'f')).toEqual({
                a: 'a',
                b: undefined,
                c: 1,
                d: true,
                f: { a: 1, b: 2 }
            });
            expect(requestData.only('a', ['b', 'c'], 'd', 'f.a')).toEqual({
                a: 'a',
                b: undefined,
                c: 1,
                d: true,
                f: { a: 1 }
            });
        });
    });
    describe('.except()', function () {
        it('should be immutable', function () {
            const requestData = new GenericData_1.GenericData({});
            expect(requestData.except('a') === requestData.all()).toBe(false);
        });
        it('returns fresh object with keys not passed in arguments', function () {
            const requestData = new GenericData_1.GenericData({
                a: 'a',
                b: undefined,
                c: 1,
                d: true,
                e: false,
                f: { a: 1, b: 2 },
                g: []
            });
            expect(requestData.except('a')).toEqual({ b: undefined, c: 1, d: true, e: false, f: { a: 1, b: 2 }, g: [] });
            expect(requestData.except('a', 'b')).toEqual({ c: 1, d: true, e: false, f: { a: 1, b: 2 }, g: [] });
            expect(requestData.except(['a', 'b', 'c'])).toEqual({ d: true, e: false, f: { a: 1, b: 2 }, g: [] });
            expect(requestData.except('a', ['b', 'c'], 'd', 'f')).toEqual({ e: false, g: [] });
            expect(requestData.except('a', ['b', 'c'], 'd', 'f.a')).toEqual({ e: false, f: { b: 2 }, g: [] });
        });
    });
    describe('.set()', function () {
        it('is chain-able', function () {
            const writer = new GenericData_1.GenericData({});
            expect(writer.set('test', 'value') === writer).toBe(true);
        });
        it('uses Lodash.set() to set a value in this.data', function () {
            const setSpy = Sinon.spy(Lodash, 'set');
            const writer = new GenericData_1.GenericData({});
            writer.set('test', 'value');
            expect(setSpy.calledWith(writer['data'], 'test', 'value')).toBe(true);
            setSpy.restore();
        });
    });
    describe('.put()', function () {
        it('is an alias of .set()', function () {
            const writer = new GenericData_1.GenericData({});
            const setSpy = Sinon.spy(writer, 'set');
            writer.put('test', 'value');
            expect(setSpy.calledWith('test', 'value')).toBe(true);
            setSpy.restore();
        });
    });
    describe('.push()', function () {
        it('is an alias of .set()', function () {
            const writer = new GenericData_1.GenericData({});
            const setSpy = Sinon.spy(writer, 'set');
            writer.push('test', 'value');
            expect(setSpy.calledWith('test', 'value')).toBe(true);
            setSpy.restore();
        });
    });
    describe('.pull()', function () {
        it('calls .get() to get data, calls .delete() to delete path and returns the value', function () {
            const writer = new GenericData_1.GenericData({ a: 1, b: { c: 2, d: 3 } });
            const getSpy = Sinon.spy(writer, 'get');
            const deleteSpy = Sinon.spy(writer, 'delete');
            expect(writer.pull('a')).toEqual(1);
            expect(getSpy.calledWith('a')).toBe(true);
            expect(deleteSpy.calledWith('a')).toBe(true);
            expect(writer['data']).toEqual({ b: { c: 2, d: 3 } });
            expect(writer.pull('b.c')).toEqual(2);
            expect(getSpy.calledWith('b.c')).toBe(true);
            expect(deleteSpy.calledWith('b.c')).toBe(true);
            expect(writer['data']).toEqual({ b: { d: 3 } });
            expect(writer.pull('f', 4)).toEqual(4);
            expect(getSpy.calledWith('f', 4)).toBe(true);
            expect(deleteSpy.calledWith('f')).toBe(true);
            expect(writer['data']).toEqual({ b: { d: 3 } });
        });
    });
    describe('.delete()', function () {
        it('is chain-able', function () {
            const writer = new GenericData_1.GenericData({});
            expect(writer.delete('test') === writer).toBe(true);
        });
        it('uses Lodash.unset() to delete a value in this.data', function () {
            const unsetSpy = Sinon.spy(Lodash, 'unset');
            const writer = new GenericData_1.GenericData({});
            writer.delete('test');
            expect(unsetSpy.calledWith(writer['data'], 'test')).toBe(true);
            unsetSpy.restore();
        });
    });
    describe('.remove()', function () {
        it('is an alias of .delete()', function () {
            const writer = new GenericData_1.GenericData({});
            const deleteSpy = Sinon.spy(writer, 'delete');
            writer.remove('test');
            expect(deleteSpy.calledWith('test')).toBe(true);
            deleteSpy.restore();
        });
    });
    describe('.forget()', function () {
        it('is an alias of .delete()', function () {
            const writer = new GenericData_1.GenericData({});
            const deleteSpy = Sinon.spy(writer, 'delete');
            writer.forget('test');
            expect(deleteSpy.calledWith('test')).toBe(true);
            deleteSpy.restore();
        });
    });
    describe('.clear()', function () {
        it('is chain-able', function () {
            const writer = new GenericData_1.GenericData({});
            expect(writer.clear() === writer).toBe(true);
        });
        it('set this.data to new Object', function () {
            const writer = new GenericData_1.GenericData({ test: 0 });
            writer.clear();
            expect(writer['data']).toEqual({});
        });
    });
    describe('.flush()', function () {
        it('is an alias of .clear()', function () {
            const writer = new GenericData_1.GenericData({});
            const clearSpy = Sinon.spy(writer, 'clear');
            writer.flush();
            expect(clearSpy.calledWith()).toBe(true);
            clearSpy.restore();
        });
    });
});
