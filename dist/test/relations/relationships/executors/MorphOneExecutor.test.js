"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const Sinon = require("sinon");
const Helpers = require("../../../../lib/util/helpers");
const HasOneExecutor_1 = require("../../../../lib/relations/relationships/executors/HasOneExecutor");
const MorphOneExecutor_1 = require("../../../../lib/relations/relationships/executors/MorphOneExecutor");
describe('MorphOneExecutor', function () {
    it('extends HasOneExecutor', function () {
        const isModelStub = Sinon.stub(Helpers, 'isModel');
        isModelStub.returns(true);
        const dataBucket = {};
        const targetModel = {
            getModelName() {
                return 'Test';
            }
        };
        const executor = new MorphOneExecutor_1.MorphOneExecutor(dataBucket, targetModel, 'test');
        expect(executor).toBeInstanceOf(HasOneExecutor_1.HasOneExecutor);
        isModelStub.restore();
    });
    describe('.setCollector()', function () {
        it('adds condition for "targetMorphTypeName" then calls and returns super.setCollector()', function () {
            const isModelStub = Sinon.stub(Helpers, 'isModel');
            isModelStub.returns(true);
            const dataBucket = {};
            const targetModel = {
                getModelName() {
                    return 'Test';
                }
            };
            const collector = {
                filterBy() { }
            };
            const filterBySpy = Sinon.spy(collector, 'filterBy');
            const conditions = ['a', 'b', 'c'];
            const reader = {};
            const executor = new MorphOneExecutor_1.MorphOneExecutor(dataBucket, targetModel, 'test');
            expect(executor.setCollector(collector, conditions, reader) === executor).toBe(true);
            const filterConditions = filterBySpy.lastCall.args[0];
            expect(filterConditions).toEqual({
                $and: [{ field: 'test', operator: '=', value: 'Test', reader: reader }, 'a', 'b', 'c']
            });
            isModelStub.restore();
        });
    });
    describe('.setQuery()', function () {
        it('adds condition for "targetMorphTypeName" then calls and returns super.setQuery()', function () {
            const isModelStub = Sinon.stub(Helpers, 'isModel');
            isModelStub.returns(true);
            const dataBucket = {};
            const targetModel = {
                getModelName() {
                    return 'Test';
                }
            };
            const query = {
                where() { }
            };
            const whereSpy = Sinon.spy(query, 'where');
            const executor = new MorphOneExecutor_1.MorphOneExecutor(dataBucket, targetModel, 'test');
            expect(executor.setQuery(query) === executor).toBe(true);
            expect(whereSpy.calledWith('test', 'Test')).toBe(true);
            isModelStub.restore();
        });
    });
});
