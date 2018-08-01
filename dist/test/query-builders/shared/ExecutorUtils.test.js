"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const Sinon = require("sinon");
const NajsBinding = require("najs-binding");
const ExecutorUtils_1 = require("../../../lib/query-builders/shared/ExecutorUtils");
describe('ExecutorUtils', function () {
    describe('addSoftDeleteConditionIfNeeded', function () {
        it('calls .whereNull() with property "deletedAt" from soft delete setting then mark state to added', function () {
            const conditionQuery = {
                whereNull() { }
            };
            const handler = {
                getSoftDeletesSetting() {
                    return {
                        deletedAt: 'any'
                    };
                },
                getConditionQuery() {
                    return conditionQuery;
                },
                markSoftDeleteState() { },
                shouldAddSoftDeleteCondition() {
                    return true;
                }
            };
            const markSpy = Sinon.spy(handler, 'markSoftDeleteState');
            const whereNullSpy = Sinon.spy(conditionQuery, 'whereNull');
            ExecutorUtils_1.ExecutorUtils.addSoftDeleteConditionIfNeeded(handler);
            expect(whereNullSpy.calledWith('any')).toBe(true);
            expect(markSpy.calledWith('added')).toBe(true);
        });
        it('does nothing if handler.shouldAddSoftDeleteCondition() returns false', function () {
            const conditionQuery = {
                whereNull() { }
            };
            const handler = {
                getSoftDeletesSetting() {
                    return {
                        deletedAt: 'any'
                    };
                },
                getConditionQuery() {
                    return conditionQuery;
                },
                markSoftDeleteState() { },
                shouldAddSoftDeleteCondition() {
                    return false;
                }
            };
            const markSpy = Sinon.spy(handler, 'markSoftDeleteState');
            const whereNullSpy = Sinon.spy(conditionQuery, 'whereNull');
            ExecutorUtils_1.ExecutorUtils.addSoftDeleteConditionIfNeeded(handler);
            expect(whereNullSpy.called).toBe(false);
            expect(markSpy.called).toBe(false);
        });
    });
    describe('.convertConditionsToMongodbQuery()', function () {
        it('makes a MongodbConditionConverter instance with conditions then calls .convert()', function () {
            const makeStub = Sinon.stub(NajsBinding, 'make');
            makeStub.returns({
                convert() {
                    return 'data';
                }
            });
            const conditions = [];
            expect(ExecutorUtils_1.ExecutorUtils.convertConditionsToMongodbQuery(conditions)).toEqual('data');
            expect(makeStub.calledWith('NajsEloquent.QueryBuilder.MongodbConditionConverter')).toBe(true);
        });
    });
});
