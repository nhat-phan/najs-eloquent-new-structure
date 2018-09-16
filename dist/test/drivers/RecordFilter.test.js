"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const Sinon = require("sinon");
const najs_binding_1 = require("najs-binding");
const Record_1 = require("../../lib/drivers/Record");
const RecordFilter_1 = require("../../lib/drivers/RecordFilter");
const BasicQuery_1 = require("../../lib/query-builders/shared/BasicQuery");
const DefaultConvention_1 = require("../../lib/query-builders/shared/DefaultConvention");
const ConditionQueryHandler_1 = require("../../lib/query-builders/shared/ConditionQueryHandler");
const QueryBuilder_1 = require("../../lib/query-builders/QueryBuilder");
const QueryBuilderHandlerBase_1 = require("../../lib/query-builders/QueryBuilderHandlerBase");
const BasicQueryConverter_1 = require("../../lib/query-builders/shared/BasicQueryConverter");
const RecordConditionMatcherFactory_1 = require("../../lib/drivers/RecordConditionMatcherFactory");
const RecordConditionMatcher_1 = require("../../lib/drivers/RecordConditionMatcher");
describe('RecordFilter', function () {
    it('implements Autoload under name "NajsEloquent.Driver.Memory.RecordFilter" with singleton option = true', function () {
        const filter = najs_binding_1.make(RecordFilter_1.RecordFilter.className);
        expect(filter.getClassName()).toEqual('NajsEloquent.Driver.Memory.RecordFilter');
        expect(najs_binding_1.make(RecordFilter_1.RecordFilter.className) === filter).toBe(true);
    });
    describe('Unit tests', function () {
        describe('.filter()', function () {
            it('filters and returns based on .isMatch() use Array.filter() if the provided argument is an array', function () {
                const filter = new RecordFilter_1.RecordFilter();
                const isMatchStub = Sinon.stub(filter, 'isMatch');
                isMatchStub.callsFake(item => item % 2 === 0);
                const records = [0, 1, 2, 3, 4, 5];
                const result = filter.filter(records, []);
                expect(result).toEqual([0, 2, 4]);
            });
            it('filters and returns based on .isMatch() use Array.reduce() if the provided argument is an object', function () {
                const filter = new RecordFilter_1.RecordFilter();
                const isMatchStub = Sinon.stub(filter, 'isMatch');
                isMatchStub.callsFake(item => item % 2 === 0);
                const records = { a: 0, b: 1, c: 2, d: 3, e: 4, f: 5 };
                const result = filter.filter(records, []);
                expect(result).toEqual([0, 2, 4]);
            });
        });
        describe('.isMatch()', function () {
            it('calls and returns .isMatchAtLeastOneCondition() if the boolean operator is $or', function () {
                const filter = new RecordFilter_1.RecordFilter();
                const isMatchAtLeastOneConditionStub = Sinon.stub(filter, 'isMatchAtLeastOneCondition');
                const isMatchAllConditionsStub = Sinon.stub(filter, 'isMatchAllConditions');
                isMatchAtLeastOneConditionStub.returns('at-least');
                isMatchAllConditionsStub.returns('all');
                const conditions = { $or: [] };
                const record = new Record_1.Record();
                expect(filter.isMatch(record, conditions)).toEqual('at-least');
                expect(isMatchAtLeastOneConditionStub.calledWith(record, conditions['$or'])).toBe(true);
                expect(isMatchAllConditionsStub.called).toBe(false);
            });
            it('calls and returns .isMatchAllConditionsStub() if the boolean operator is $and', function () {
                const filter = new RecordFilter_1.RecordFilter();
                const isMatchAtLeastOneConditionStub = Sinon.stub(filter, 'isMatchAtLeastOneCondition');
                const isMatchAllConditionsStub = Sinon.stub(filter, 'isMatchAllConditions');
                isMatchAtLeastOneConditionStub.returns('at-least');
                isMatchAllConditionsStub.returns('all');
                const conditions = { $and: [] };
                const record = new Record_1.Record();
                expect(filter.isMatch(record, conditions)).toEqual('all');
                expect(isMatchAllConditionsStub.calledWith(record, conditions['$and'])).toBe(true);
                expect(isMatchAtLeastOneConditionStub.called).toBe(false);
            });
            it('simply returns false if there is no operator $or or $and', function () {
                const filter = new RecordFilter_1.RecordFilter();
                const isMatchAtLeastOneConditionStub = Sinon.stub(filter, 'isMatchAtLeastOneCondition');
                const isMatchAllConditionsStub = Sinon.stub(filter, 'isMatchAllConditions');
                isMatchAtLeastOneConditionStub.returns('at-least');
                isMatchAllConditionsStub.returns('all');
                const conditions = {};
                const record = new Record_1.Record();
                expect(filter.isMatch(record, conditions)).toBe(false);
                expect(isMatchAllConditionsStub.called).toBe(false);
                expect(isMatchAtLeastOneConditionStub.called).toBe(false);
            });
        });
        describe('.isMatchAtLeastOneCondition()', function () {
            it('returns true immediately if there is any Matcher returns true', function () {
                const matcherA = new RecordConditionMatcher_1.RecordConditionMatcher('a', '=', 1);
                const matcherB = new RecordConditionMatcher_1.RecordConditionMatcher('b', '=', 1);
                const isMatchStubA = Sinon.stub(matcherA, 'isMatch');
                isMatchStubA.returns(true);
                const isMatchStubB = Sinon.stub(matcherB, 'isMatch');
                isMatchStubB.returns(false);
                const filter = new RecordFilter_1.RecordFilter();
                const record = new Record_1.Record();
                expect(filter.isMatchAtLeastOneCondition(record, [matcherA, matcherB])).toBe(true);
                expect(isMatchStubA.calledWith(record)).toBe(true);
                expect(isMatchStubB.calledWith(record)).toBe(false);
            });
            it('returns false if all Matchers return false', function () {
                const matcherA = new RecordConditionMatcher_1.RecordConditionMatcher('a', '=', 1);
                const matcherB = new RecordConditionMatcher_1.RecordConditionMatcher('b', '=', 1);
                const isMatchStubA = Sinon.stub(matcherA, 'isMatch');
                isMatchStubA.returns(false);
                const isMatchStubB = Sinon.stub(matcherB, 'isMatch');
                isMatchStubB.returns(false);
                const filter = new RecordFilter_1.RecordFilter();
                const record = new Record_1.Record();
                expect(filter.isMatchAtLeastOneCondition(record, [matcherA, matcherB])).toBe(false);
                expect(isMatchStubA.calledWith(record)).toBe(true);
                expect(isMatchStubB.calledWith(record)).toBe(true);
            });
            it('calls RecordFilter.isMatch() if there is a sub conditions in the list', function () {
                const matcherA = new RecordConditionMatcher_1.RecordConditionMatcher('a', '=', 1);
                const matcherB = new RecordConditionMatcher_1.RecordConditionMatcher('b', '=', 1);
                const matcherC = new RecordConditionMatcher_1.RecordConditionMatcher('c', '=', 1);
                const isMatchStubA = Sinon.stub(matcherA, 'isMatch');
                isMatchStubA.returns(true);
                const isMatchStubB = Sinon.stub(matcherB, 'isMatch');
                isMatchStubB.returns(true);
                const isMatchStubC = Sinon.stub(matcherC, 'isMatch');
                isMatchStubC.returns(false);
                const filter = new RecordFilter_1.RecordFilter();
                const isMatchSpy = Sinon.spy(filter, 'isMatch');
                const record = new Record_1.Record();
                expect(filter.isMatchAllConditions(record, [matcherA, { $or: [matcherB, matcherC] }])).toBe(true);
                expect(isMatchStubA.calledWith(record)).toBe(true);
                expect(isMatchSpy.calledWith(record, { $or: [matcherB, matcherC] })).toBe(true);
                expect(isMatchStubB.calledWith(record)).toBe(true);
                expect(isMatchStubC.calledWith(record)).toBe(false);
            });
        });
        describe('.isMatchAllConditions()', function () {
            it('returns false immediately if there is any Matcher returns false', function () {
                const matcherA = new RecordConditionMatcher_1.RecordConditionMatcher('a', '=', 1);
                const matcherB = new RecordConditionMatcher_1.RecordConditionMatcher('b', '=', 1);
                const isMatchStubA = Sinon.stub(matcherA, 'isMatch');
                isMatchStubA.returns(false);
                const isMatchStubB = Sinon.stub(matcherB, 'isMatch');
                isMatchStubB.returns(false);
                const filter = new RecordFilter_1.RecordFilter();
                const record = new Record_1.Record();
                expect(filter.isMatchAllConditions(record, [matcherA, matcherB])).toBe(false);
                expect(isMatchStubA.calledWith(record)).toBe(true);
                expect(isMatchStubB.calledWith(record)).toBe(false);
            });
            it('returns true all Matchers return true', function () {
                const matcherA = new RecordConditionMatcher_1.RecordConditionMatcher('a', '=', 1);
                const matcherB = new RecordConditionMatcher_1.RecordConditionMatcher('b', '=', 1);
                const isMatchStubA = Sinon.stub(matcherA, 'isMatch');
                isMatchStubA.returns(true);
                const isMatchStubB = Sinon.stub(matcherB, 'isMatch');
                isMatchStubB.returns(true);
                const filter = new RecordFilter_1.RecordFilter();
                const record = new Record_1.Record();
                expect(filter.isMatchAllConditions(record, [matcherA, matcherB])).toBe(true);
                expect(isMatchStubA.calledWith(record)).toBe(true);
                expect(isMatchStubB.calledWith(record)).toBe(true);
            });
            it('calls RecordFilter.isMatch() if there is a sub conditions in the list', function () {
                const matcherA = new RecordConditionMatcher_1.RecordConditionMatcher('a', '=', 1);
                const matcherB = new RecordConditionMatcher_1.RecordConditionMatcher('b', '=', 1);
                const matcherC = new RecordConditionMatcher_1.RecordConditionMatcher('c', '=', 1);
                const isMatchStubA = Sinon.stub(matcherA, 'isMatch');
                isMatchStubA.returns(true);
                const isMatchStubB = Sinon.stub(matcherB, 'isMatch');
                isMatchStubB.returns(true);
                const isMatchStubC = Sinon.stub(matcherC, 'isMatch');
                isMatchStubC.returns(false);
                const filter = new RecordFilter_1.RecordFilter();
                const isMatchSpy = Sinon.spy(filter, 'isMatch');
                const record = new Record_1.Record();
                expect(filter.isMatchAllConditions(record, [matcherA, { $and: [matcherB, matcherC] }])).toBe(false);
                expect(isMatchStubA.calledWith(record)).toBe(true);
                expect(isMatchSpy.calledWith(record, { $and: [matcherB, matcherC] })).toBe(true);
                expect(isMatchStubB.calledWith(record)).toBe(true);
                expect(isMatchStubC.calledWith(record)).toBe(true);
            });
        });
    });
    describe('Integration tests', function () {
        const dataset = [
            { id: 1, a: 0, b: 0, c: 0, d: 0 },
            { id: 2, a: 0, b: 0, c: 0, d: 1 },
            { id: 3, a: 0, b: 0, c: 1, d: 0 },
            { id: 4, a: 0, b: 0, c: 1, d: 1 },
            { id: 5, a: 0, b: 1, c: 0, d: 0 },
            { id: 6, a: 0, b: 1, c: 0, d: 1 },
            { id: 7, a: 0, b: 1, c: 1, d: 0 },
            { id: 8, a: 0, b: 1, c: 1, d: 1 },
            { id: 9, a: 1, b: 0, c: 0, d: 0 },
            { id: 10, a: 1, b: 0, c: 0, d: 1 },
            { id: 11, a: 1, b: 0, c: 1, d: 0 },
            { id: 12, a: 1, b: 0, c: 1, d: 1 },
            { id: 13, a: 1, b: 1, c: 0, d: 0 },
            { id: 14, a: 1, b: 1, c: 0, d: 1 },
            { id: 15, a: 1, b: 1, c: 1, d: 0 },
            { id: 16, a: 1, b: 1, c: 1, d: 1 }
        ];
        class TestQueryBuilderHandler extends QueryBuilderHandlerBase_1.QueryBuilderHandlerBase {
            constructor(model) {
                super(model, {});
                this.convention = new DefaultConvention_1.DefaultConvention();
                this.basicQuery = new BasicQuery_1.BasicQuery(this.convention);
                this.conditionQuery = new ConditionQueryHandler_1.ConditionQueryHandler(this.basicQuery, this.convention);
            }
            getBasicQuery() {
                return this.basicQuery;
            }
            getConditionQuery() {
                return this.conditionQuery;
            }
            getQueryConvention() {
                return this.convention;
            }
        }
        function make_records() {
            return dataset.map(item => new Record_1.Record(item));
        }
        function get_converted_conditions(cb) {
            const handler = new TestQueryBuilderHandler({});
            const queryBuilder = new QueryBuilder_1.QueryBuilder(handler);
            cb(queryBuilder);
            return new BasicQueryConverter_1.BasicQueryConverter(handler.getBasicQuery(), new RecordConditionMatcherFactory_1.RecordConditionMatcherFactory()).getConvertedQuery();
        }
        it('should work', function () {
            const records = make_records();
            const conditions = get_converted_conditions(qb => qb
                .where('a', 1)
                .where('c', 1)
                .orWhere(sqb => sqb.where('d', 0)));
            // console.log(conditions)
            const recordFilter = new RecordFilter_1.RecordFilter();
            // const start = new Date()
            // for (let i = 0; i < 100000; i++) {
            //   recordFilter.filter(records, conditions)
            // }
            // const end = new Date()
            // console.log(end.getTime() - start.getTime())
            recordFilter.filter(records, conditions);
        });
    });
});
