"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const RelationData_1 = require("../../lib/relations/RelationData");
describe('RelationData', function () {
    describe('constructor()', function () {
        it('inits the data with RelationFactory and state = "unload"', function () {
            const factory = {};
            const relationData = new RelationData_1.RelationData(factory);
            expect(relationData['factory'] === factory).toBe(true);
            expect(relationData['state']).toEqual('unload');
        });
    });
    describe('.getFactory()', function () {
        it('simply returns property "factory"', function () {
            const factory = {};
            const relationData = new RelationData_1.RelationData(factory);
            expect(relationData.getFactory() === factory).toBe(true);
        });
    });
    describe('.isLoaded()', function () {
        it('returns true if state = "loaded"', function () {
            const factory = {};
            const relationData = new RelationData_1.RelationData(factory);
            expect(relationData.isLoaded()).toBe(false);
            relationData.markLoaded();
            expect(relationData.isLoaded()).toBe(true);
        });
    });
    describe('.isBuilt()', function () {
        it('returns true if state = "built"', function () {
            const factory = {};
            const relationData = new RelationData_1.RelationData(factory);
            expect(relationData.isBuilt()).toBe(false);
            relationData.markBuilt();
            expect(relationData.isBuilt()).toBe(true);
        });
    });
    describe('.markLoaded()', function () {
        it('is chainable, sets state to "built"', function () {
            const factory = {};
            const relationData = new RelationData_1.RelationData(factory);
            expect(relationData.isLoaded()).toBe(false);
            expect(relationData.markLoaded() === relationData).toBe(true);
            expect(relationData.isLoaded()).toBe(true);
        });
    });
    describe('.markBuilt()', function () {
        it('is chainable, sets state to "built"', function () {
            const factory = {};
            const relationData = new RelationData_1.RelationData(factory);
            expect(relationData.isBuilt()).toBe(false);
            expect(relationData.markBuilt() === relationData).toBe(true);
            expect(relationData.isBuilt()).toBe(true);
        });
    });
    describe('.getData()', function () {
        it('simply returns property "data"', function () {
            const factory = {};
            const data = {};
            const relationData = new RelationData_1.RelationData(factory);
            relationData['data'] = data;
            expect(relationData.getData() === data).toBe(true);
        });
    });
    describe('.setData()', function () {
        it('is chainable, sets given value to property "data"', function () {
            const factory = {};
            const data = {};
            const relationData = new RelationData_1.RelationData(factory);
            expect(relationData.setData(data) === relationData).toBe(true);
            expect(relationData.getData() === data).toBe(true);
        });
    });
    describe('.getLoadType()', function () {
        it('returns "unknown" if loadType is not found, otherwise returns property loadType', function () {
            const factory = {};
            const relationData = new RelationData_1.RelationData(factory);
            expect(relationData.getLoadType()).toEqual('unknown');
            relationData.setLoadType('lazy');
            expect(relationData.getLoadType()).toEqual('lazy');
        });
    });
    describe('.setLoadType()', function () {
        it('is chainable, sets given value to property loadType', function () {
            const factory = {};
            const relationData = new RelationData_1.RelationData(factory);
            expect(relationData.getLoadType()).toEqual('unknown');
            expect(relationData.setLoadType('eager') === relationData).toBe(true);
            expect(relationData.getLoadType()).toEqual('eager');
        });
    });
});
