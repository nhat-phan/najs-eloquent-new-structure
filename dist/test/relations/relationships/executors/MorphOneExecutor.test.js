"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const Sinon = require("sinon");
const HasOneExecutor_1 = require("../../../../lib/relations/relationships/executors/HasOneExecutor");
const MorphOneExecutor_1 = require("../../../../lib/relations/relationships/executors/MorphOneExecutor");
describe('MorphOneExecutor', function () {
    it('extends HasOneExecutor', function () {
        const dataBucket = {};
        const targetModel = {};
        const executor = new MorphOneExecutor_1.MorphOneExecutor(dataBucket, targetModel, 'test', 'Value');
        expect(executor).toBeInstanceOf(HasOneExecutor_1.HasOneExecutor);
    });
    describe('.setCollector()', function () {
        it('adds condition for "targetMorphTypeName" then calls and returns super.setCollector()', function () {
            const dataBucket = {};
            const targetModel = {};
            const collector = {
                filterBy() { }
            };
            const filterBySpy = Sinon.spy(collector, 'filterBy');
            const conditions = ['a', 'b', 'c'];
            const reader = {};
            const executor = new MorphOneExecutor_1.MorphOneExecutor(dataBucket, targetModel, 'test', 'Test');
            expect(executor.setCollector(collector, conditions, reader) === executor).toBe(true);
            const filterConditions = filterBySpy.lastCall.args[0];
            expect(filterConditions).toEqual({
                $and: [{ field: 'test', operator: '=', value: 'Test', reader: reader }, 'a', 'b', 'c']
            });
        });
    });
    describe('.setQuery()', function () {
        it('adds condition for "targetMorphTypeName" then calls and returns super.setQuery()', function () {
            const dataBucket = {};
            const targetModel = {};
            const query = {
                where() { }
            };
            const whereSpy = Sinon.spy(query, 'where');
            const executor = new MorphOneExecutor_1.MorphOneExecutor(dataBucket, targetModel, 'test', 'Test');
            expect(executor.setQuery(query) === executor).toBe(true);
            expect(whereSpy.calledWith('test', 'Test')).toBe(true);
        });
    });
});
