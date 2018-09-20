"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const Sinon = require("sinon");
const Record_1 = require("../../lib/drivers/Record");
const RecordCollector_1 = require("../../lib/drivers/RecordCollector");
const RecordConditionMatcher_1 = require("../../lib/drivers/RecordConditionMatcher");
describe('RecordCollector', function () {
    describe('Unit tests', function () {
        describe('static .use()', function () {
            it('creates an new instance of RecordCollector with the dataSource and conditions = {}', function () {
                const ds = {};
                const collector = RecordCollector_1.RecordCollector.use(ds);
                expect(collector['dataSource'] === ds).toBe(true);
            });
        });
        describe('.limit()', function () {
            it('simply assigns the given value to "limited" property', function () {
                const ds = {};
                const collector = RecordCollector_1.RecordCollector.use(ds);
                expect(collector['limited']).toBeUndefined();
                collector.limit(1000);
                expect(collector['limited']).toEqual(1000);
            });
        });
        describe('.select()', function () {
            it('simply assigns the given value to "selected" property', function () {
                const ds = {};
                const collector = RecordCollector_1.RecordCollector.use(ds);
                expect(collector['selected']).toBeUndefined();
                collector.select(['a', 'b', 'c']);
                expect(collector['selected']).toEqual(['a', 'b', 'c']);
            });
        });
        describe('.orderBy()', function () {
            it('simply assigns the given value to "sortedBy" property', function () {
                const ds = {};
                const collector = RecordCollector_1.RecordCollector.use(ds);
                expect(collector['sortedBy']).toBeUndefined();
                collector.orderBy([['a', 'asc'], ['b', 'desc']]);
                expect(collector['sortedBy']).toEqual([['a', 'asc'], ['b', 'desc']]);
            });
        });
        describe('.filterBy()', function () {
            it('simply assigns the given value to "conditions" property', function () {
                const ds = {};
                const conditions = {};
                const collector = RecordCollector_1.RecordCollector.use(ds);
                collector.filterBy(conditions);
                expect(collector['conditions'] === conditions).toBe(true);
            });
        });
        describe('.pickFields()', function () {
            it('creates new Record instance with the Lodash.pick() data', function () {
                const record = new Record_1.Record({ id: 1, first_name: 'a', last_name: 'x', age: 30 });
                const ds = {};
                const collector = RecordCollector_1.RecordCollector.use(ds);
                const result = collector.pickFields(record, ['first_name', 'last_name']);
                expect(result === record).toBe(false);
                expect(result.toObject()).toEqual({ first_name: 'a', last_name: 'x' });
            });
        });
        describe('.isMatch()', function () {
            it('calls and returns .isMatchAtLeastOneCondition() if the boolean operator is $or', function () {
                const ds = {};
                const collector = RecordCollector_1.RecordCollector.use(ds);
                const isMatchAtLeastOneConditionStub = Sinon.stub(collector, 'isMatchAtLeastOneCondition');
                const isMatchAllConditionsStub = Sinon.stub(collector, 'isMatchAllConditions');
                isMatchAtLeastOneConditionStub.returns('at-least');
                isMatchAllConditionsStub.returns('all');
                const conditions = { $or: [] };
                const record = new Record_1.Record();
                expect(collector.isMatch(record, conditions)).toEqual('at-least');
                expect(isMatchAtLeastOneConditionStub.calledWith(record, conditions['$or'])).toBe(true);
                expect(isMatchAllConditionsStub.called).toBe(false);
            });
            it('calls and returns .isMatchAllConditionsStub() if the boolean operator is $and', function () {
                const ds = {};
                const collector = RecordCollector_1.RecordCollector.use(ds);
                const isMatchAtLeastOneConditionStub = Sinon.stub(collector, 'isMatchAtLeastOneCondition');
                const isMatchAllConditionsStub = Sinon.stub(collector, 'isMatchAllConditions');
                isMatchAtLeastOneConditionStub.returns('at-least');
                isMatchAllConditionsStub.returns('all');
                const conditions = { $and: [] };
                const record = new Record_1.Record();
                expect(collector.isMatch(record, conditions)).toEqual('all');
                expect(isMatchAllConditionsStub.calledWith(record, conditions['$and'])).toBe(true);
                expect(isMatchAtLeastOneConditionStub.called).toBe(false);
            });
            it('simply returns false if there is no operator $or or $and', function () {
                const ds = {};
                const collector = RecordCollector_1.RecordCollector.use(ds);
                const isMatchAtLeastOneConditionStub = Sinon.stub(collector, 'isMatchAtLeastOneCondition');
                const isMatchAllConditionsStub = Sinon.stub(collector, 'isMatchAllConditions');
                isMatchAtLeastOneConditionStub.returns('at-least');
                isMatchAllConditionsStub.returns('all');
                const conditions = {};
                const record = new Record_1.Record();
                expect(collector.isMatch(record, conditions)).toBe(false);
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
                const ds = {};
                const collector = RecordCollector_1.RecordCollector.use(ds);
                const record = new Record_1.Record();
                expect(collector.isMatchAtLeastOneCondition(record, [matcherA, matcherB])).toBe(true);
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
                const ds = {};
                const collector = RecordCollector_1.RecordCollector.use(ds);
                const record = new Record_1.Record();
                expect(collector.isMatchAtLeastOneCondition(record, [matcherA, matcherB])).toBe(false);
                expect(isMatchStubA.calledWith(record)).toBe(true);
                expect(isMatchStubB.calledWith(record)).toBe(true);
            });
            it('calls .isMatch() if there is a sub conditions in the list, case 1', function () {
                const matcherA = new RecordConditionMatcher_1.RecordConditionMatcher('a', '=', 1);
                const matcherB = new RecordConditionMatcher_1.RecordConditionMatcher('b', '=', 1);
                const matcherC = new RecordConditionMatcher_1.RecordConditionMatcher('c', '=', 1);
                const isMatchStubA = Sinon.stub(matcherA, 'isMatch');
                isMatchStubA.returns(false);
                const isMatchStubB = Sinon.stub(matcherB, 'isMatch');
                isMatchStubB.returns(true);
                const isMatchStubC = Sinon.stub(matcherC, 'isMatch');
                isMatchStubC.returns(false);
                const ds = {};
                const collector = RecordCollector_1.RecordCollector.use(ds);
                const isMatchSpy = Sinon.spy(collector, 'isMatch');
                const record = new Record_1.Record();
                expect(collector.isMatchAtLeastOneCondition(record, [matcherA, { $or: [matcherB, matcherC] }])).toBe(true);
                expect(isMatchStubA.calledWith(record)).toBe(true);
                expect(isMatchSpy.calledWith(record, { $or: [matcherB, matcherC] })).toBe(true);
                expect(isMatchStubB.calledWith(record)).toBe(true);
                expect(isMatchStubC.calledWith(record)).toBe(false);
            });
            it('calls .isMatch() if there is a sub conditions in the list, case 2', function () {
                const matcherA = new RecordConditionMatcher_1.RecordConditionMatcher('a', '=', 1);
                const matcherB = new RecordConditionMatcher_1.RecordConditionMatcher('b', '=', 1);
                const matcherC = new RecordConditionMatcher_1.RecordConditionMatcher('c', '=', 1);
                const isMatchStubA = Sinon.stub(matcherA, 'isMatch');
                isMatchStubA.returns(false);
                const isMatchStubB = Sinon.stub(matcherB, 'isMatch');
                isMatchStubB.returns(false);
                const isMatchStubC = Sinon.stub(matcherC, 'isMatch');
                isMatchStubC.returns(false);
                const ds = {};
                const collector = RecordCollector_1.RecordCollector.use(ds);
                const isMatchSpy = Sinon.spy(collector, 'isMatch');
                const record = new Record_1.Record();
                expect(collector.isMatchAtLeastOneCondition(record, [matcherA, { $or: [matcherB, matcherC] }])).toBe(false);
                expect(isMatchStubA.calledWith(record)).toBe(true);
                expect(isMatchSpy.calledWith(record, { $or: [matcherB, matcherC] })).toBe(true);
                expect(isMatchStubB.calledWith(record)).toBe(true);
                expect(isMatchStubC.calledWith(record)).toBe(true);
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
                const ds = {};
                const collector = RecordCollector_1.RecordCollector.use(ds);
                const record = new Record_1.Record();
                expect(collector.isMatchAllConditions(record, [matcherA, matcherB])).toBe(false);
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
                const ds = {};
                const collector = RecordCollector_1.RecordCollector.use(ds);
                const record = new Record_1.Record();
                expect(collector.isMatchAllConditions(record, [matcherA, matcherB])).toBe(true);
                expect(isMatchStubA.calledWith(record)).toBe(true);
                expect(isMatchStubB.calledWith(record)).toBe(true);
            });
            it('calls .isMatch() if there is a sub conditions in the list, case 1', function () {
                const matcherA = new RecordConditionMatcher_1.RecordConditionMatcher('a', '=', 1);
                const matcherB = new RecordConditionMatcher_1.RecordConditionMatcher('b', '=', 1);
                const matcherC = new RecordConditionMatcher_1.RecordConditionMatcher('c', '=', 1);
                const isMatchStubA = Sinon.stub(matcherA, 'isMatch');
                isMatchStubA.returns(true);
                const isMatchStubB = Sinon.stub(matcherB, 'isMatch');
                isMatchStubB.returns(true);
                const isMatchStubC = Sinon.stub(matcherC, 'isMatch');
                isMatchStubC.returns(false);
                const ds = {};
                const collector = RecordCollector_1.RecordCollector.use(ds);
                const isMatchSpy = Sinon.spy(collector, 'isMatch');
                const record = new Record_1.Record();
                expect(collector.isMatchAllConditions(record, [matcherA, { $and: [matcherB, matcherC] }])).toBe(false);
                expect(isMatchStubA.calledWith(record)).toBe(true);
                expect(isMatchSpy.calledWith(record, { $and: [matcherB, matcherC] })).toBe(true);
                expect(isMatchStubB.calledWith(record)).toBe(true);
                expect(isMatchStubC.calledWith(record)).toBe(true);
            });
            it('calls .isMatch() if there is a sub conditions in the list, case 2', function () {
                const matcherA = new RecordConditionMatcher_1.RecordConditionMatcher('a', '=', 1);
                const matcherB = new RecordConditionMatcher_1.RecordConditionMatcher('b', '=', 1);
                const matcherC = new RecordConditionMatcher_1.RecordConditionMatcher('c', '=', 1);
                const isMatchStubA = Sinon.stub(matcherA, 'isMatch');
                isMatchStubA.returns(true);
                const isMatchStubB = Sinon.stub(matcherB, 'isMatch');
                isMatchStubB.returns(true);
                const isMatchStubC = Sinon.stub(matcherC, 'isMatch');
                isMatchStubC.returns(true);
                const ds = {};
                const collector = RecordCollector_1.RecordCollector.use(ds);
                const isMatchSpy = Sinon.spy(collector, 'isMatch');
                const record = new Record_1.Record();
                expect(collector.isMatchAllConditions(record, [matcherA, { $and: [matcherB, matcherC] }])).toBe(true);
                expect(isMatchStubA.calledWith(record)).toBe(true);
                expect(isMatchSpy.calledWith(record, { $and: [matcherB, matcherC] })).toBe(true);
                expect(isMatchStubB.calledWith(record)).toBe(true);
                expect(isMatchStubC.calledWith(record)).toBe(true);
            });
        });
        describe('.exec()', function () {
            it('does not filter if there is no conditions data', function () {
                const ds = [
                    new Record_1.Record({ a: 1 }),
                    new Record_1.Record({ a: 2 }),
                    new Record_1.Record({ a: 3 }),
                    new Record_1.Record({ a: 4 }),
                    new Record_1.Record({ a: 5 })
                ];
                const collector = RecordCollector_1.RecordCollector.use(ds);
                const result = collector.exec().map(item => item.getAttribute('a'));
                expect(result).toEqual([1, 2, 3, 4, 5]);
            });
            it('filters dataSource by .isMatch()', function () {
                const ds = [
                    new Record_1.Record({ a: 1 }),
                    new Record_1.Record({ a: 2 }),
                    new Record_1.Record({ a: 3 }),
                    new Record_1.Record({ a: 4 }),
                    new Record_1.Record({ a: 5 })
                ];
                const collector = RecordCollector_1.RecordCollector.use(ds);
                const matcher = new RecordConditionMatcher_1.RecordConditionMatcher('a', '<', 3);
                collector.filterBy({ $and: [matcher] });
                const result = collector.exec().map(item => item.getAttribute('a'));
                expect(result).toEqual([1, 2]);
            });
            it('never calls .sortLimitAndSelectRecords() if there is no sortedByConfig', function () {
                const ds = [
                    new Record_1.Record({ a: 1 }),
                    new Record_1.Record({ a: 2 }),
                    new Record_1.Record({ a: 3 }),
                    new Record_1.Record({ a: 4 }),
                    new Record_1.Record({ a: 5 })
                ];
                const collector = RecordCollector_1.RecordCollector.use(ds);
                const sortLimitAndSelectRecordsSpy = Sinon.spy(collector, 'sortLimitAndSelectRecords');
                const matcher = new RecordConditionMatcher_1.RecordConditionMatcher('a', '>=', 3);
                collector.filterBy({ $and: [matcher] });
                const result = collector.exec().map(item => item.getAttribute('a'));
                expect(result).toEqual([3, 4, 5]);
                expect(sortLimitAndSelectRecordsSpy.called).toBe(false);
            });
            it('has a shortcut to limit number of records if there is no sortedBy config', function () {
                const ds = [
                    new Record_1.Record({ a: 1, b: 'a' }),
                    new Record_1.Record({ a: 2, b: 'b' }),
                    new Record_1.Record({ a: 3, b: 'c' }),
                    new Record_1.Record({ a: 4, b: 'd' }),
                    new Record_1.Record({ a: 5, b: 'e' })
                ];
                const collector = RecordCollector_1.RecordCollector.use(ds);
                const sortLimitAndSelectRecordsSpy = Sinon.spy(collector, 'sortLimitAndSelectRecords');
                const matcher = new RecordConditionMatcher_1.RecordConditionMatcher('a', '>=', 3);
                collector.limit(2).filterBy({ $and: [matcher] });
                const result = collector.exec().map(item => item.getAttribute('a'));
                expect(result).toEqual([3, 4]);
                expect(sortLimitAndSelectRecordsSpy.called).toBe(false);
            });
            it('has a shortcut to limit number of records and pickFields if there is no sortedBy config', function () {
                const ds = [
                    new Record_1.Record({ a: 1, b: 'a' }),
                    new Record_1.Record({ a: 2, b: 'b' }),
                    new Record_1.Record({ a: 3, b: 'c' }),
                    new Record_1.Record({ a: 4, b: 'd' }),
                    new Record_1.Record({ a: 5, b: 'e' })
                ];
                const collector = RecordCollector_1.RecordCollector.use(ds);
                const sortLimitAndSelectRecordsSpy = Sinon.spy(collector, 'sortLimitAndSelectRecords');
                const matcher = new RecordConditionMatcher_1.RecordConditionMatcher('a', '>=', 3);
                collector
                    .limit(2)
                    .select(['b'])
                    .filterBy({ $and: [matcher] });
                const result = collector.exec().map(item => item.toObject());
                expect(result).toEqual([{ b: 'c' }, { b: 'd' }]);
                expect(sortLimitAndSelectRecordsSpy.called).toBe(false);
            });
            it('filters by .isMatch() then calls and returns .sortLimitAndSelectRecords()', function () {
                const ds = [
                    new Record_1.Record({ a: 1, b: 'e' }),
                    new Record_1.Record({ a: 1, b: 'd' }),
                    new Record_1.Record({ a: 1, b: 'c' }),
                    new Record_1.Record({ a: 1, b: 'b' }),
                    new Record_1.Record({ a: 1, b: 'a' })
                ];
                const collector = RecordCollector_1.RecordCollector.use(ds);
                const sortLimitAndSelectRecordsSpy = Sinon.spy(collector, 'sortLimitAndSelectRecords');
                const matcher = new RecordConditionMatcher_1.RecordConditionMatcher('a', '=', 1);
                collector
                    .orderBy([['b', 'asc']])
                    .filterBy({ $and: [matcher] })
                    .limit(3);
                const result = collector.exec().map(item => item.getAttribute('b'));
                expect(result).toEqual(['a', 'b', 'c']);
                expect(sortLimitAndSelectRecordsSpy.called).toBe(true);
            });
        });
        describe('.sortLimitAndSelectRecords()', function () {
            it('calls records.sort() with .compare() function', function () {
                const ds = {};
                const collector = RecordCollector_1.RecordCollector.use(ds);
                const records = [
                    new Record_1.Record({ a: 1 }),
                    new Record_1.Record({ a: 4 }),
                    new Record_1.Record({ a: 3 }),
                    new Record_1.Record({ a: 2 }),
                    new Record_1.Record({ a: 5 })
                ];
                const compareSpy = Sinon.spy(collector, 'compare');
                collector.orderBy([['a', 'asc']]);
                const result = collector.sortLimitAndSelectRecords(records).map(item => item.getAttribute('a'));
                expect(result).toEqual([1, 2, 3, 4, 5]);
                expect(compareSpy.callCount).toBeGreaterThan(0);
            });
            it('use Array.slice() to apply the limit number of records if needed', function () {
                const ds = {};
                const collector = RecordCollector_1.RecordCollector.use(ds);
                const records = [
                    new Record_1.Record({ a: 1 }),
                    new Record_1.Record({ a: 4 }),
                    new Record_1.Record({ a: 3 }),
                    new Record_1.Record({ a: 2 }),
                    new Record_1.Record({ a: 5 })
                ];
                collector.orderBy([['a', 'asc']]);
                collector.limit(3);
                const result = collector.sortLimitAndSelectRecords(records).map(item => item.getAttribute('a'));
                expect(result).toEqual([1, 2, 3]);
            });
            it('maps and use .pickFields() if the selected is not undefined', function () {
                const ds = {};
                const collector = RecordCollector_1.RecordCollector.use(ds);
                const records = [
                    new Record_1.Record({ a: 1 }),
                    new Record_1.Record({ a: 4 }),
                    new Record_1.Record({ a: 3 }),
                    new Record_1.Record({ a: 2 }),
                    new Record_1.Record({ a: 5 })
                ];
                const stub = Sinon.stub(collector, 'pickFields');
                stub.returns('anything');
                collector
                    .orderBy([['a', 'asc']])
                    .limit(3)
                    .select(['field']);
                const result = collector.sortLimitAndSelectRecords(records);
                expect(result).toEqual(['anything', 'anything', 'anything']);
            });
        });
        describe('.compare()', function () {
            it('should works with 1 sorted by argument', function () {
                const ds = {};
                const collector = RecordCollector_1.RecordCollector.use(ds);
                const dataset = [
                    {
                        sortedBy: [['a', 'asc']],
                        data: [
                            { lhs: { a: 1 }, rhs: { a: 1 }, result: 0 },
                            { lhs: { a: 0 }, rhs: { a: 1 }, result: -1 },
                            { lhs: { a: 1 }, rhs: { a: 0 }, result: 1 }
                        ]
                    },
                    {
                        sortedBy: [['a', 'desc']],
                        data: [
                            { lhs: { a: 1 }, rhs: { a: 1 }, result: 0 },
                            { lhs: { a: 0 }, rhs: { a: 1 }, result: 1 },
                            { lhs: { a: 1 }, rhs: { a: 0 }, result: -1 }
                        ]
                    }
                ];
                for (const testCase of dataset) {
                    collector.orderBy(testCase.sortedBy);
                    for (const item of testCase.data) {
                        expect(collector.compare(new Record_1.Record(item.lhs), new Record_1.Record(item.rhs), 0)).toEqual(item.result);
                    }
                }
            });
            it('should works with 2 sorted by arguments', function () {
                const ds = {};
                const collector = RecordCollector_1.RecordCollector.use(ds);
                const dataset = [
                    {
                        sortedBy: [['a', 'asc'], ['b', 'asc']],
                        data: [
                            { lhs: { a: 1, b: 'b' }, rhs: { a: 1, b: 'b' }, result: 0 },
                            { lhs: { a: 0, b: 'b' }, rhs: { a: 1, b: 'b' }, result: -1 },
                            { lhs: { a: 1, b: 'b' }, rhs: { a: 0, b: 'b' }, result: 1 },
                            { lhs: { a: 1, b: 'a' }, rhs: { a: 1, b: 'b' }, result: -1 },
                            { lhs: { a: 1, b: 'b' }, rhs: { a: 1, b: 'a' }, result: 1 }
                        ]
                    },
                    {
                        sortedBy: [['a', 'desc'], ['b', 'asc']],
                        data: [
                            { lhs: { a: 1, b: 'b' }, rhs: { a: 1, b: 'b' }, result: 0 },
                            { lhs: { a: 0, b: 'b' }, rhs: { a: 1, b: 'b' }, result: 1 },
                            { lhs: { a: 1, b: 'b' }, rhs: { a: 0, b: 'b' }, result: -1 },
                            { lhs: { a: 1, b: 'a' }, rhs: { a: 1, b: 'b' }, result: -1 },
                            { lhs: { a: 1, b: 'b' }, rhs: { a: 1, b: 'a' }, result: 1 }
                        ]
                    },
                    {
                        sortedBy: [['a', 'asc'], ['b', 'desc']],
                        data: [
                            { lhs: { a: 1, b: 'b' }, rhs: { a: 1, b: 'b' }, result: 0 },
                            { lhs: { a: 0, b: 'b' }, rhs: { a: 1, b: 'b' }, result: -1 },
                            { lhs: { a: 1, b: 'b' }, rhs: { a: 0, b: 'b' }, result: 1 },
                            { lhs: { a: 1, b: 'a' }, rhs: { a: 1, b: 'b' }, result: 1 },
                            { lhs: { a: 1, b: 'b' }, rhs: { a: 1, b: 'a' }, result: -1 }
                        ]
                    },
                    {
                        sortedBy: [['a', 'desc'], ['b', 'desc']],
                        data: [
                            { lhs: { a: 1, b: 'b' }, rhs: { a: 1, b: 'b' }, result: 0 },
                            { lhs: { a: 0, b: 'b' }, rhs: { a: 1, b: 'b' }, result: 1 },
                            { lhs: { a: 1, b: 'b' }, rhs: { a: 0, b: 'b' }, result: -1 },
                            { lhs: { a: 1, b: 'a' }, rhs: { a: 1, b: 'b' }, result: 1 },
                            { lhs: { a: 1, b: 'b' }, rhs: { a: 1, b: 'a' }, result: -1 }
                        ]
                    }
                ];
                for (const testCase of dataset) {
                    collector.orderBy(testCase.sortedBy);
                    for (const item of testCase.data) {
                        expect(collector.compare(new Record_1.Record(item.lhs), new Record_1.Record(item.rhs), 0)).toEqual(item.result);
                    }
                }
            });
        });
    });
    describe('Integration tests', function () {
        describe('.sortLimitAndSelectRecords()', function () {
            const dataset = [
                { id: 1, first_name: 'a', last_name: 'x', age: 30 },
                { id: 2, first_name: 'a', last_name: 'x', age: 30 },
                { id: 3, first_name: 'a', last_name: 'y', age: 20 },
                { id: 4, first_name: 'a', last_name: 'y', age: 20 },
                { id: 5, first_name: 'a', last_name: 'z', age: 10 },
                { id: 6, first_name: 'a', last_name: 'z', age: 10 },
                { id: 7, first_name: 'b', last_name: 'x', age: 30 },
                { id: 8, first_name: 'b', last_name: 'y', age: 20 },
                { id: 9, first_name: 'b', last_name: 'z', age: 10 },
                { id: 10, first_name: 'c', last_name: 'x', age: 30 },
                { id: 11, first_name: 'c', last_name: 'y', age: 20 },
                { id: 12, first_name: 'c', last_name: 'z', age: 10 }
            ];
            it('should work with 1 sortedBy argument', function () {
                const ds = {};
                const collector = RecordCollector_1.RecordCollector.use(ds);
                const records = dataset.map(item => new Record_1.Record(item));
                collector.orderBy([['first_name', 'desc']]);
                const result = collector.sortLimitAndSelectRecords(records).map(item => item.getAttribute('first_name'));
                expect(result).toEqual(['c', 'c', 'c', 'b', 'b', 'b', 'a', 'a', 'a', 'a', 'a', 'a']);
            });
            it('should work with 2 sortedBy arguments', function () {
                const ds = {};
                const collector = RecordCollector_1.RecordCollector.use(ds);
                const records = dataset.map(item => new Record_1.Record(item));
                collector.orderBy([['first_name', 'desc'], ['age', 'desc']]);
                const result = collector
                    .sortLimitAndSelectRecords(records)
                    .map(item => item.getAttribute('first_name') + '-' + item.getAttribute('age'));
                expect(result).toEqual([
                    'c-30',
                    'c-20',
                    'c-10',
                    'b-30',
                    'b-20',
                    'b-10',
                    'a-30',
                    'a-30',
                    'a-20',
                    'a-20',
                    'a-10',
                    'a-10'
                ]);
            });
        });
    });
});
