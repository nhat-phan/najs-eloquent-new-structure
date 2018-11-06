"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const Sinon = require("sinon");
const HasManyExecutor_1 = require("../../../../lib/relations/relationships/executors/HasManyExecutor");
const MorphManyExecutor_1 = require("../../../../lib/relations/relationships/executors/MorphManyExecutor");
describe('MorphManyExecutor', function () {
    it('extends HasManyExecutor', function () {
        const dataBucket = {};
        const targetModel = {};
        const executor = new MorphManyExecutor_1.MorphManyExecutor(dataBucket, targetModel, 'test', 'Value');
        expect(executor).toBeInstanceOf(HasManyExecutor_1.HasManyExecutor);
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
            const reader = {
                toComparable(value) {
                    return value;
                }
            };
            const executor = new MorphManyExecutor_1.MorphManyExecutor(dataBucket, targetModel, 'test', 'Test');
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
            const executor = new MorphManyExecutor_1.MorphManyExecutor(dataBucket, targetModel, 'test', 'Test');
            expect(executor.setQuery(query) === executor).toBe(true);
            expect(whereSpy.calledWith('test', 'Test')).toBe(true);
        });
    });
});
