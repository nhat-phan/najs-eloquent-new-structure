"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const Sinon = require("sinon");
const ExecutorBase_1 = require("../../../lib/drivers/ExecutorBase");
const ExecutorUtils_1 = require("../../../lib/query-builders/shared/ExecutorUtils");
const Record_1 = require("../../../lib/drivers/Record");
const RecordCollector_1 = require("../../../lib/drivers/RecordCollector");
const QueryLogFacade_1 = require("../../../lib/facades/global/QueryLogFacade");
const MemoryDataSource_1 = require("../../../lib/drivers/memory/MemoryDataSource");
const MemoryDataSourceProviderFacade_1 = require("../../../lib/facades/global/MemoryDataSourceProviderFacade");
const MemoryQueryBuilder_1 = require("../../../lib/drivers/memory/MemoryQueryBuilder");
const MemoryQueryBuilderHandler_1 = require("../../../lib/drivers/memory/MemoryQueryBuilderHandler");
MemoryDataSourceProviderFacade_1.MemoryDataSourceProvider.register(MemoryDataSource_1.MemoryDataSource, 'memory', true);
const User = {
    getModelName() {
        return 'User';
    },
    getPrimaryKeyName() {
        return 'id';
    }
};
const Role = {
    getModelName() {
        return 'Role';
    },
    getPrimaryKeyName() {
        return 'id';
    }
};
const UserDataSource = MemoryDataSourceProviderFacade_1.MemoryDataSourceProvider.create(User);
const RoleDataSource = MemoryDataSourceProviderFacade_1.MemoryDataSourceProvider.create(Role);
describe('MemoryQueryExecutor', function () {
    const dataset = [
        { first_name: 'john', last_name: 'doe', age: 30 },
        { first_name: 'jane', last_name: 'doe', age: 25 },
        { first_name: 'tony', last_name: 'stark', age: 40 },
        { first_name: 'thor', last_name: 'god', age: 1000 },
        { first_name: 'captain', last_name: 'american', age: 100 },
        { first_name: 'tony', last_name: 'stewart', age: 40 },
        { first_name: 'peter', last_name: 'parker', age: 15 }
    ];
    beforeAll(async function () {
        for (const data of dataset) {
            UserDataSource.push(new Record_1.Record(data));
        }
        await UserDataSource.write();
        for (let i = 0; i < 10; i++) {
            RoleDataSource.push(new Record_1.Record({
                name: 'role-' + i,
                deleted_at: new Date()
            }));
        }
        await RoleDataSource.write();
    });
    beforeEach(function () {
        QueryLogFacade_1.QueryLog.clear().enable();
    });
    function expect_match_user(result, expected) {
        for (const name in expected) {
            expect(result.getAttribute(name)).toEqual(expected[name]);
        }
    }
    function expect_query_log(data, result = undefined, index = 0) {
        const logData = QueryLogFacade_1.QueryLog.pull()[index]['data'];
        if (typeof result !== undefined) {
            expect(logData['result'] === result).toBe(true);
        }
        expect(logData).toMatchObject(data);
    }
    function makeQueryBuilderHandler(model) {
        let fakeModel;
        if (typeof model === 'string') {
            fakeModel = {
                getModelName() {
                    return model;
                },
                getPrimaryKeyName() {
                    return 'id';
                },
                getDriver() {
                    return {
                        getSoftDeletesFeature() {
                            return {
                                hasSoftDeletes() {
                                    return false;
                                }
                            };
                        },
                        getTimestampsFeature() {
                            return {
                                hasTimestamps() {
                                    return false;
                                }
                            };
                        }
                    };
                },
                getRecordName() {
                    return model;
                }
            };
        }
        else {
            fakeModel = model;
        }
        return new MemoryQueryBuilderHandler_1.MemoryQueryBuilderHandler(fakeModel);
    }
    function makeQueryBuilder(handler) {
        return new MemoryQueryBuilder_1.MemoryQueryBuilder(handler);
    }
    it('extends ExecutorBase', function () {
        const executor = makeQueryBuilderHandler('User').getQueryExecutor();
        expect(executor).toBeInstanceOf(ExecutorBase_1.ExecutorBase);
    });
    describe('.get()', function () {
        it('gets all data of collection and return an instance of Collection<Eloquent<T>>', async function () {
            const handler = makeQueryBuilderHandler('User');
            const result = await handler.getQueryExecutor().get();
            expect_query_log({
                raw: 'RecordCollector.use(MemoryDataSourceProvider.create("User")).exec()',
                action: 'get'
            }, result);
            expect(result.length).toEqual(7);
            for (let i = 0; i < 7; i++) {
                expect_match_user(result[i], dataset[i]);
            }
        });
        it('returns an empty collection if no result', async function () {
            const handler = makeQueryBuilderHandler('User');
            makeQueryBuilder(handler).where('first_name', 'no-one');
            const result = await handler.getQueryExecutor().get();
            expect_query_log({
                raw: `RecordCollector.use(MemoryDataSourceProvider.create("User")).filterBy(${JSON.stringify({
                    $and: [{ field: 'first_name', operator: '=', value: 'no-one' }]
                })}).exec()`
            }, result);
            expect(result.length === 0).toBe(true);
        });
        it('can get data by query builder, case 1', async function () {
            const handler = makeQueryBuilderHandler('User');
            makeQueryBuilder(handler).where('age', 1000);
            const result = await handler.getQueryExecutor().get();
            expect_query_log({
                raw: `RecordCollector.use(MemoryDataSourceProvider.create("User")).filterBy(${JSON.stringify({
                    $and: [{ field: 'age', operator: '=', value: 1000 }]
                })}).exec()`,
                action: 'get'
            }, result);
            expect(result.length).toEqual(1);
            expect_match_user(result[0], dataset[3]);
        });
        it('can get data by query builder, case 2', async function () {
            const handler = makeQueryBuilderHandler('User');
            makeQueryBuilder(handler).where('age', 40);
            const result = await handler.getQueryExecutor().get();
            expect_query_log({
                raw: `RecordCollector.use(MemoryDataSourceProvider.create("User")).filterBy(${JSON.stringify({
                    $and: [{ field: 'age', operator: '=', value: 40 }]
                })}).exec()`,
                dataSource: 'NajsEloquent.Driver.Memory.MemoryDataSource',
                action: 'get'
            }, result);
            expect(result.length).toEqual(2);
            expect_match_user(result[0], dataset[2]);
            expect_match_user(result[1], dataset[5]);
        });
        it('can get data by query builder, case 3', async function () {
            const handler = makeQueryBuilderHandler('User');
            makeQueryBuilder(handler)
                .where('age', 40)
                .where('last_name', 'stark');
            const result = await handler.getQueryExecutor().get();
            expect_query_log({
                raw: `RecordCollector.use(MemoryDataSourceProvider.create("User")).filterBy(${JSON.stringify({
                    $and: [{ field: 'age', operator: '=', value: 40 }, { field: 'last_name', operator: '=', value: 'stark' }]
                })}).exec()`,
                dataSource: 'NajsEloquent.Driver.Memory.MemoryDataSource',
                action: 'get'
            }, result);
            expect(result.length).toEqual(1);
            expect_match_user(result[0], dataset[2]);
        });
        it('can get data by query builder, case 4', async function () {
            const handler = makeQueryBuilderHandler('User');
            makeQueryBuilder(handler)
                .where('age', 40)
                .orWhere('first_name', 'peter');
            const result = await handler.getQueryExecutor().get();
            expect_query_log({
                raw: `RecordCollector.use(MemoryDataSourceProvider.create("User")).filterBy(${JSON.stringify({
                    $or: [{ field: 'age', operator: '=', value: 40 }, { field: 'first_name', operator: '=', value: 'peter' }]
                })}).exec()`,
                dataSource: 'NajsEloquent.Driver.Memory.MemoryDataSource',
                action: 'get'
            }, result);
            expect(result.length).toEqual(3);
            expect_match_user(result[0], dataset[2]);
            expect_match_user(result[1], dataset[5]);
            expect_match_user(result[2], dataset[6]);
        });
        it('can get data by query builder, case 5', async function () {
            const handler = makeQueryBuilderHandler('User');
            makeQueryBuilder(handler)
                .where('age', 40)
                .orWhere('first_name', 'peter')
                .orderBy('id', 'desc');
            const result = await handler.getQueryExecutor().get();
            expect_query_log({
                raw: `RecordCollector.use(MemoryDataSourceProvider.create("User")).orderBy(${JSON.stringify([
                    ['id', 'desc']
                ])}).filterBy(${JSON.stringify({
                    $or: [{ field: 'age', operator: '=', value: 40 }, { field: 'first_name', operator: '=', value: 'peter' }]
                })}).exec()`,
                dataSource: 'NajsEloquent.Driver.Memory.MemoryDataSource',
                action: 'get'
            }, result);
            expect(result.length).toEqual(3);
            expect_match_user(result[0], dataset[6]);
            expect_match_user(result[1], dataset[5]);
            expect_match_user(result[2], dataset[2]);
        });
        it('returns an empty array if executeMode is disabled', async function () {
            const handler = makeQueryBuilderHandler('User');
            makeQueryBuilder(handler)
                .where('age', 40)
                .orWhere('first_name', 'peter')
                .orderBy('id', 'desc');
            const result = await handler
                .getQueryExecutor()
                .setExecuteMode('disabled')
                .get();
            expect_query_log({
                raw: `RecordCollector.use(MemoryDataSourceProvider.create("User")).orderBy(${JSON.stringify([
                    ['id', 'desc']
                ])}).filterBy(${JSON.stringify({
                    $or: [{ field: 'age', operator: '=', value: 40 }, { field: 'first_name', operator: '=', value: 'peter' }]
                })}).exec()`,
                dataSource: 'NajsEloquent.Driver.Memory.MemoryDataSource',
                action: 'get'
            }, result);
            expect(result).toEqual([]);
        });
    });
    describe('.first()', function () {
        it('finds first document of collection and return an instance of Eloquent<T>', async function () {
            const handler = makeQueryBuilderHandler('User');
            const result = await handler.getQueryExecutor().first();
            expect_query_log({
                raw: `RecordCollector.use(MemoryDataSourceProvider.create("User")).limit(1).exec()`,
                dataSource: 'NajsEloquent.Driver.Memory.MemoryDataSource',
                action: 'first'
            }, result);
            expect_match_user(result, dataset[0]);
        });
        it('finds first document of collection and return an instance of Eloquent<T>', async function () {
            const handler = makeQueryBuilderHandler('User');
            makeQueryBuilder(handler).orderBy('id', 'desc');
            const result = await handler.getQueryExecutor().first();
            expect_query_log({
                raw: `RecordCollector.use(MemoryDataSourceProvider.create("User")).orderBy(${JSON.stringify([
                    ['id', 'desc']
                ])}).limit(1).exec()`,
                dataSource: 'NajsEloquent.Driver.Memory.MemoryDataSource',
                action: 'first'
            }, result);
            expect_match_user(result, dataset[6]);
        });
        it('returns undefined if no result', async function () {
            const handler = makeQueryBuilderHandler('User');
            makeQueryBuilder(handler).where('first_name', 'no-one');
            const result = await handler.getQueryExecutor().first();
            expect_query_log({
                raw: `RecordCollector.use(MemoryDataSourceProvider.create("User")).filterBy(${JSON.stringify({
                    $and: [{ field: 'first_name', operator: '=', value: 'no-one' }]
                })}).limit(1).exec()`,
                dataSource: 'NajsEloquent.Driver.Memory.MemoryDataSource',
                action: 'first'
            }, result);
            expect(result).toBeUndefined();
        });
        it('can find data by query builder, case 1', async function () {
            const handler = makeQueryBuilderHandler('User');
            makeQueryBuilder(handler).where('age', 1000);
            const result = await handler.getQueryExecutor().first();
            expect_query_log({
                raw: `RecordCollector.use(MemoryDataSourceProvider.create("User")).filterBy(${JSON.stringify({
                    $and: [{ field: 'age', operator: '=', value: 1000 }]
                })}).limit(1).exec()`,
                dataSource: 'NajsEloquent.Driver.Memory.MemoryDataSource',
                action: 'first'
            }, result);
            expect_match_user(result, dataset[3]);
        });
        it('can find data by query builder, case 2', async function () {
            const handler = makeQueryBuilderHandler('User');
            makeQueryBuilder(handler)
                .where('age', 40)
                .orWhere('first_name', 'jane');
            const result = await handler.getQueryExecutor().first();
            expect_query_log({
                raw: `RecordCollector.use(MemoryDataSourceProvider.create("User")).filterBy(${JSON.stringify({
                    $or: [{ field: 'age', operator: '=', value: 40 }, { field: 'first_name', operator: '=', value: 'jane' }]
                })}).limit(1).exec()`,
                dataSource: 'NajsEloquent.Driver.Memory.MemoryDataSource',
                action: 'first'
            }, result);
            expect_match_user(result, dataset[1]);
        });
        it('can find data by query builder, case 3', async function () {
            const handler = makeQueryBuilderHandler('User');
            makeQueryBuilder(handler)
                .where('first_name', 'tony')
                .where('last_name', 'stewart');
            const result = await handler.getQueryExecutor().first();
            expect_query_log({
                raw: `RecordCollector.use(MemoryDataSourceProvider.create("User")).filterBy(${JSON.stringify({
                    $and: [
                        { field: 'first_name', operator: '=', value: 'tony' },
                        { field: 'last_name', operator: '=', value: 'stewart' }
                    ]
                })}).limit(1).exec()`,
                dataSource: 'NajsEloquent.Driver.Memory.MemoryDataSource',
                action: 'first'
            }, result);
            expect_match_user(result, dataset[5]);
        });
        // it('can find data by .native() before using query functions of query builder', async function() {
        //   const handler = makeQueryBuilderHandler('users')
        //   const result = await makeQueryBuilder(handler)
        //     .native(function(collection) {
        //       return collection.findOne({
        //         first_name: 'tony'
        //       })
        //     })
        //     .execute()
        //   expect_match_user(result, dataset[2])
        // })
        // it('can find data by native() after using query functions of query builder', async function() {
        //   const handler = makeQueryBuilderHandler('users')
        //   const result = await makeQueryBuilder(handler)
        //     .where('age', 40)
        //     .orWhere('age', 1000)
        //     .native(function(collection, conditions) {
        //       return collection.findOne(conditions, { sort: [['last_name', -1]] })
        //     })
        //     .execute()
        //   expect_match_user(result, dataset[5])
        // })
        // it('can find data by native() and modified after using query functions of query builder', async function() {
        //   const handler = makeQueryBuilderHandler('users')
        //   const result = await await makeQueryBuilder(handler)
        //     .where('age', 40)
        //     .orWhere('age', 1000)
        //     .native(function(collection) {
        //       return collection.findOne({
        //         first_name: 'thor'
        //       })
        //     })
        //     .execute()
        //   expect_match_user(result, dataset[3])
        // })
        it('returns an undefined if executeMode is disabled', async function () {
            const handler = makeQueryBuilderHandler('User');
            makeQueryBuilder(handler)
                .where('age', 40)
                .orWhere('first_name', 'jane');
            const result = await handler
                .getQueryExecutor()
                .setExecuteMode('disabled')
                .first();
            expect_query_log({
                raw: `RecordCollector.use(MemoryDataSourceProvider.create("User")).filterBy(${JSON.stringify({
                    $or: [{ field: 'age', operator: '=', value: 40 }, { field: 'first_name', operator: '=', value: 'jane' }]
                })}).limit(1).exec()`,
                dataSource: 'NajsEloquent.Driver.Memory.MemoryDataSource',
                action: 'first'
            }, result);
            expect(result).toBeUndefined();
        });
    });
    describe('.count()', function () {
        it('counts all data of records and returns a number', async function () {
            const handler = makeQueryBuilderHandler('User');
            const result = await handler.getQueryExecutor().count();
            expect_query_log({
                raw: `RecordCollector.use(MemoryDataSourceProvider.create("User")).exec()`,
                dataSource: 'NajsEloquent.Driver.Memory.MemoryDataSource',
                action: 'count'
            }, result);
            expect(result).toEqual(7);
        });
        it('returns 0 if no result', async function () {
            const handler = makeQueryBuilderHandler('User');
            makeQueryBuilder(handler).where('first_name', 'no-one');
            const result = await handler.getQueryExecutor().count();
            expect_query_log({
                raw: `RecordCollector.use(MemoryDataSourceProvider.create("User")).filterBy(${JSON.stringify({
                    $and: [{ field: 'first_name', operator: '=', value: 'no-one' }]
                })}).exec()`,
                dataSource: 'NajsEloquent.Driver.Memory.MemoryDataSource',
                action: 'count'
            }, result);
            expect(result).toEqual(0);
        });
        it('overrides select even .select was used', async function () {
            const handler = makeQueryBuilderHandler('User');
            makeQueryBuilder(handler).select('abc', 'def');
            const result = await handler.getQueryExecutor().count();
            expect_query_log({
                raw: `RecordCollector.use(MemoryDataSourceProvider.create("User")).exec()`,
                dataSource: 'NajsEloquent.Driver.Memory.MemoryDataSource',
                action: 'count'
            }, result);
            expect(result).toEqual(7);
        });
        it('overrides ordering even .orderBy was used', async function () {
            const handler = makeQueryBuilderHandler('User');
            makeQueryBuilder(handler).orderBy('abc');
            const result = await handler.getQueryExecutor().count();
            expect_query_log({
                raw: `RecordCollector.use(MemoryDataSourceProvider.create("User")).exec()`,
                dataSource: 'NajsEloquent.Driver.Memory.MemoryDataSource',
                action: 'count'
            }, result);
            expect(result).toEqual(7);
        });
        it('can count items by query builder, case 1', async function () {
            const handler = makeQueryBuilderHandler('User');
            makeQueryBuilder(handler)
                .where('age', 18)
                .orWhere('first_name', 'tony');
            const result = await handler.getQueryExecutor().count();
            expect_query_log({
                raw: `RecordCollector.use(MemoryDataSourceProvider.create("User")).filterBy(${JSON.stringify({
                    $or: [{ field: 'age', operator: '=', value: 18 }, { field: 'first_name', operator: '=', value: 'tony' }]
                })}).exec()`,
                dataSource: 'NajsEloquent.Driver.Memory.MemoryDataSource',
                action: 'count'
            }, result);
            expect(result).toEqual(2);
        });
        it('can count items by query builder, case 2', async function () {
            const handler = makeQueryBuilderHandler('User');
            makeQueryBuilder(handler)
                .where('age', 1000)
                .orWhere('first_name', 'captain')
                .orderBy('last_name')
                .limit(10);
            const result = await handler.getQueryExecutor().count();
            expect_query_log({
                raw: `RecordCollector.use(MemoryDataSourceProvider.create("User")).limit(10).filterBy(${JSON.stringify({
                    $or: [
                        { field: 'age', operator: '=', value: 1000 },
                        { field: 'first_name', operator: '=', value: 'captain' }
                    ]
                })}).exec()`,
                dataSource: 'NajsEloquent.Driver.Memory.MemoryDataSource',
                action: 'count'
            }, result);
            expect(result).toEqual(2);
        });
        it('returns 0 if executeMode is disabled', async function () {
            const handler = makeQueryBuilderHandler('User');
            makeQueryBuilder(handler)
                .where('age', 1000)
                .orWhere('first_name', 'captain')
                .orderBy('last_name')
                .limit(10);
            const result = await handler
                .getQueryExecutor()
                .setExecuteMode('disabled')
                .count();
            expect_query_log({
                raw: `RecordCollector.use(MemoryDataSourceProvider.create("User")).limit(10).filterBy(${JSON.stringify({
                    $or: [
                        { field: 'age', operator: '=', value: 1000 },
                        { field: 'first_name', operator: '=', value: 'captain' }
                    ]
                })}).exec()`,
                dataSource: 'NajsEloquent.Driver.Memory.MemoryDataSource',
                action: 'count'
            }, result);
            expect(result).toEqual(0);
        });
    });
    describe('.collectResult()', function () {
        it('calls DataSource.read(), then calls and returns collector.exec()', async function () {
            const readSpy = Sinon.spy(UserDataSource, 'read');
            const handler = makeQueryBuilderHandler('User');
            const executor = handler.getQueryExecutor();
            const collector = executor.makeCollector();
            const collectorExecStub = Sinon.stub(collector, 'exec');
            collectorExecStub.returns('anything');
            expect(await executor.collectResult(collector)).toEqual('anything');
            expect(readSpy.called).toBe(true);
            expect(collectorExecStub.called).toBe(true);
        });
    });
    describe('.makeCollector()', function () {
        it('makes and return a RecordCollector instance which using the DataSource', function () {
            const handler = makeQueryBuilderHandler('User');
            const executor = handler.getQueryExecutor();
            const collector = executor.makeCollector();
            expect(collector['dataSource'] === UserDataSource).toBe(true);
        });
        it('calls collector.limit() if query builder has limit data', function () {
            const handler = makeQueryBuilderHandler('User');
            makeQueryBuilder(handler).limit(5);
            const executor = handler.getQueryExecutor();
            const collector = executor.makeCollector();
            expect(collector['limited']).toEqual(5);
        });
        it('calls collector.orderBy() if query builder has ordering data', function () {
            const handler = makeQueryBuilderHandler('User');
            makeQueryBuilder(handler)
                .orderBy('a')
                .orderBy('b', 'desc');
            const executor = handler.getQueryExecutor();
            const collector = executor.makeCollector();
            expect(collector).toBeInstanceOf(RecordCollector_1.RecordCollector);
            expect(collector['sortedBy']).toEqual([['a', 'asc'], ['b', 'desc']]);
        });
        it('calls collector.select() if query builder has selected data', function () {
            const handler = makeQueryBuilderHandler('User');
            makeQueryBuilder(handler)
                .select('a')
                .select('b', ['c', 'd']);
            const executor = handler.getQueryExecutor();
            const collector = executor.makeCollector();
            expect(collector['selected']).toEqual(['a', 'b', 'c', 'd']);
        });
        it('calls collector.filterBy() if query builder has conditions data', function () {
            const handler = makeQueryBuilderHandler('User');
            makeQueryBuilder(handler)
                .where('a', 1)
                .orWhere('b', 2);
            const executor = handler.getQueryExecutor();
            const collector = executor.makeCollector();
            expect(collector['conditions']).toEqual({
                $or: [{ field: 'a', operator: '=', value: 1 }, { field: 'b', operator: '=', value: 2 }]
            });
        });
    });
    describe('.getFilterConditions()', function () {
        it('calls ExecutorUtils.addSoftDeleteConditionIfNeeded() to add softDeletes conditions', function () {
            const spy = Sinon.spy(ExecutorUtils_1.ExecutorUtils, 'addSoftDeleteConditionIfNeeded');
            const handler = makeQueryBuilderHandler('User');
            const query = makeQueryBuilder(handler);
            query.where('a', 1).where('b', 2);
            const executor = handler.getQueryExecutor();
            executor.getFilterConditions();
            expect(spy.calledWith(handler)).toBe(true);
        });
        it('converts BasicQuery to conditions object by BasicQueryConverter', function () {
            const handler = makeQueryBuilderHandler('User');
            const query = makeQueryBuilder(handler);
            query.where('a', 1).where('b', 2);
            const executor = handler.getQueryExecutor();
            const conditions = executor.getFilterConditions();
            expect(conditions).toEqual({
                $and: [{ field: 'a', operator: '=', value: 1 }, { field: 'b', operator: '=', value: 2 }]
            });
        });
    });
});
