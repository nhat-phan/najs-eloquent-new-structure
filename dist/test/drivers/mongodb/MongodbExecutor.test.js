"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const util_1 = require("../../util");
const MongodbProviderFacade_1 = require("../../../lib/facades/global/MongodbProviderFacade");
const QueryLogFacade_1 = require("../../../lib/facades/global/QueryLogFacade");
const MongodbQueryBuilder_1 = require("../../../lib/drivers/mongodb/MongodbQueryBuilder");
const MongodbQueryBuilderHandler_1 = require("../../../lib/drivers/mongodb/MongodbQueryBuilderHandler");
describe('MongodbExecutor', function () {
    const dataset = [
        { first_name: 'john', last_name: 'doe', age: 30 },
        { first_name: 'jane', last_name: 'doe', age: 25 },
        { first_name: 'tony', last_name: 'stark', age: 40 },
        { first_name: 'thor', last_name: 'god', age: 1000 },
        { first_name: 'captain', last_name: 'american', age: 100 },
        { first_name: 'tony', last_name: 'stewart', age: 40 },
        { first_name: 'peter', last_name: 'parker', age: 15 }
    ];
    let collectionUsers, collectionRoles;
    beforeAll(async function () {
        await util_1.init_mongodb('mongodb_executor');
        const db = MongodbProviderFacade_1.MongodbProviderFacade.getDatabase();
        collectionUsers = db.collection('users');
        collectionRoles = db.collection('roles');
        for (const data of dataset) {
            await collectionUsers.save(data);
        }
        for (let i = 0; i < 10; i++) {
            await collectionRoles.save({
                name: 'role-' + i,
                deleted_at: new Date()
            });
        }
    });
    afterAll(async function () {
        util_1.delete_collection_use_mongodb('users');
        util_1.delete_collection_use_mongodb('roles');
    });
    beforeEach(function () {
        QueryLogFacade_1.QueryLog.clear().enable();
    });
    function expect_match_user(result, expected) {
        for (const name in expected) {
            expect(result[name]).toEqual(expected[name]);
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
                getDriver() {
                    return {
                        getSoftDeletesFeature() {
                            return {
                                hasSoftDeletes() {
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
        return new MongodbQueryBuilderHandler_1.MongodbQueryBuilderHandler(fakeModel);
    }
    function makeQueryBuilder(handler) {
        return new MongodbQueryBuilder_1.MongodbQueryBuilder(handler);
    }
    describe('.get()', function () {
        it('gets all data of collection and return an instance of Collection<Eloquent<T>>', async function () {
            const handler = makeQueryBuilderHandler('users');
            const result = await handler.getQueryExecutor().get();
            expect_query_log({
                raw: 'db.users.find({}).toArray()',
                action: 'get'
            }, result);
            expect(result.length).toEqual(7);
            for (let i = 0; i < 7; i++) {
                expect_match_user(result[i], dataset[i]);
            }
        });
        it('returns an empty collection if no result', async function () {
            const handler = makeQueryBuilderHandler('users');
            makeQueryBuilder(handler).where('first_name', 'no-one');
            const result = await handler.getQueryExecutor().get();
            expect_query_log({
                raw: 'db.users.find({"first_name":"no-one"}).toArray()'
            }, result);
            expect(result.length === 0).toBe(true);
        });
        it('can get data by query builder, case 1', async function () {
            const handler = makeQueryBuilderHandler('users');
            makeQueryBuilder(handler).where('age', 1000);
            const result = await handler.getQueryExecutor().get();
            expect_query_log({
                raw: 'db.users.find({"age":1000}).toArray()',
                query: { age: 1000 },
                action: 'get'
            }, result);
            expect(result.length).toEqual(1);
            expect_match_user(result[0], dataset[3]);
        });
        it('can get data by query builder, case 2', async function () {
            const handler = makeQueryBuilderHandler('users');
            makeQueryBuilder(handler).where('age', 40);
            const result = await handler.getQueryExecutor().get();
            expect_query_log({
                raw: 'db.users.find({"age":40}).toArray()',
                query: { age: 40 },
                action: 'get'
            }, result);
            expect(result.length).toEqual(2);
            expect_match_user(result[0], dataset[2]);
            expect_match_user(result[1], dataset[5]);
        });
        it('can get data by query builder, case 3', async function () {
            const handler = makeQueryBuilderHandler('users');
            makeQueryBuilder(handler)
                .where('age', 40)
                .where('last_name', 'stark');
            const result = await handler.getQueryExecutor().get();
            expect_query_log({
                raw: 'db.users.find({"age":40,"last_name":"stark"}).toArray()',
                query: { age: 40, last_name: 'stark' },
                action: 'get'
            }, result);
            expect(result.length).toEqual(1);
            expect_match_user(result[0], dataset[2]);
        });
        it('can get data by query builder, case 4', async function () {
            const handler = makeQueryBuilderHandler('users');
            makeQueryBuilder(handler)
                .where('age', 40)
                .orWhere('first_name', 'peter');
            const result = await handler.getQueryExecutor().get();
            expect_query_log({
                raw: 'db.users.find({"$or":[{"age":40},{"first_name":"peter"}]}).toArray()',
                query: {
                    $or: [{ age: 40 }, { first_name: 'peter' }]
                },
                action: 'get'
            }, result);
            expect(result.length).toEqual(3);
            expect_match_user(result[0], dataset[2]);
            expect_match_user(result[1], dataset[5]);
            expect_match_user(result[2], dataset[6]);
        });
        it('can get data by query builder, case 5', async function () {
            const handler = makeQueryBuilderHandler('users');
            makeQueryBuilder(handler)
                .where('age', 40)
                .orWhere('first_name', 'peter')
                .orderBy('id', 'desc');
            const result = await handler.getQueryExecutor().get();
            expect_query_log({
                raw: 'db.users.find({"$or":[{"age":40},{"first_name":"peter"}]}, {"sort":[["_id",-1]]}).toArray()',
                options: { sort: [['_id', -1]] },
                action: 'get'
            }, result);
            expect(result.length).toEqual(3);
            expect_match_user(result[0], dataset[6]);
            expect_match_user(result[1], dataset[5]);
            expect_match_user(result[2], dataset[2]);
        });
    });
    describe('.find()', function () {
        it('finds first document of collection and return an instance of Eloquent<T>', async function () {
            const handler = makeQueryBuilderHandler('users');
            const result = await handler.getQueryExecutor().find();
            expect_query_log({
                raw: 'db.users.findOne({})',
                action: 'find'
            }, result);
            expect_match_user(result, dataset[0]);
        });
        it('finds first document of collection and return an instance of Eloquent<T>', async function () {
            const handler = makeQueryBuilderHandler('users');
            makeQueryBuilder(handler).orderBy('_id', 'desc');
            const result = await handler.getQueryExecutor().find();
            expect_query_log({
                raw: 'db.users.findOne({}, {"sort":[["_id",-1]]})',
                options: { sort: [['_id', -1]] },
                action: 'find'
            }, result);
            expect_match_user(result, dataset[6]);
        });
        it('returns null if no result', async function () {
            const handler = makeQueryBuilderHandler('users');
            makeQueryBuilder(handler).where('first_name', 'no-one');
            const result = await handler.getQueryExecutor().find();
            expect_query_log({
                raw: 'db.users.findOne({"first_name":"no-one"})',
                query: { first_name: 'no-one' },
                action: 'find'
            }, result);
            expect(result).toBeNull();
        });
        it('can find data by query builder, case 1', async function () {
            const handler = makeQueryBuilderHandler('users');
            makeQueryBuilder(handler).where('age', 1000);
            const result = await handler.getQueryExecutor().find();
            expect_query_log({
                raw: 'db.users.findOne({"age":1000})',
                query: { age: 1000 },
                action: 'find'
            }, result);
            expect_match_user(result, dataset[3]);
        });
        it('can find data by query builder, case 2', async function () {
            const handler = makeQueryBuilderHandler('users');
            makeQueryBuilder(handler)
                .where('age', 40)
                .orWhere('first_name', 'jane');
            const result = await handler.getQueryExecutor().find();
            expect_query_log({
                raw: 'db.users.findOne({"$or":[{"age":40},{"first_name":"jane"}]})',
                query: { $or: [{ age: 40 }, { first_name: 'jane' }] },
                action: 'find'
            }, result);
            expect_match_user(result, dataset[1]);
        });
        it('can find data by query builder, case 3', async function () {
            const handler = makeQueryBuilderHandler('users');
            makeQueryBuilder(handler)
                .where('first_name', 'tony')
                .where('last_name', 'stewart');
            const result = await handler.getQueryExecutor().find();
            expect_query_log({
                raw: 'db.users.findOne({"first_name":"tony","last_name":"stewart"})',
                query: { first_name: 'tony', last_name: 'stewart' },
                action: 'find'
            }, result);
            expect_match_user(result, dataset[5]);
        });
        // it('can find data by .native() before using query functions of query builder', async function() {
        //   const query = new MongodbQueryBuilder('User', collectionUsers)
        //   const result = await query
        //     .native(function(collection) {
        //       return collection.findOne({
        //         first_name: 'tony'
        //       })
        //     })
        //     .execute()
        //   expect_match_user(result, dataset[2])
        // })
        // it('can find data by native() after using query functions of query builder', async function() {
        //   const query = new MongodbQueryBuilder('User', collectionUsers)
        //   const result = await query
        //     .where('age', 40)
        //     .orWhere('age', 1000)
        //     .native(function(collection, conditions) {
        //       return collection.findOne(conditions, { sort: [['last_name', -1]] })
        //     })
        //     .execute()
        //   expect_match_user(result, dataset[5])
        // })
        // it('can find data by native() and modified after using query functions of query builder', async function() {
        //   const query = new MongodbQueryBuilder('User', collectionUsers)
        //   const result = await query
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
    });
    describe('.count()', function () {
        // TODO: write test for count
        it('should be implemented', function () {
            const handler = makeQueryBuilderHandler('users');
            handler.getQueryExecutor().count();
        });
    });
    describe('.update()', function () {
        // TODO: write test for update
        it('should be implemented', function () {
            const handler = makeQueryBuilderHandler('users');
            handler.getQueryExecutor().update({});
        });
    });
    describe('.delete()', function () {
        // TODO: write test for delete
        it('should be implemented', function () {
            const handler = makeQueryBuilderHandler('users');
            handler.getQueryExecutor().delete();
        });
    });
    describe('.restore()', function () {
        // TODO: write test for restore
        it('should be implemented', function () {
            const handler = makeQueryBuilderHandler('users');
            handler.getQueryExecutor().restore();
        });
    });
    describe('.execute()', function () {
        // TODO: write test for execute
        it('should be implemented', function () {
            const handler = makeQueryBuilderHandler('users');
            handler.getQueryExecutor().execute();
        });
    });
    describe('.makeQueryOptions()', function () {
        it('undefined if there is no option', function () {
            const handler = makeQueryBuilderHandler('users');
            expect(handler.getQueryExecutor().makeQueryOptions()).toBe(undefined);
        });
        it('adds this.limit to property "limit"', function () {
            const handler = makeQueryBuilderHandler('users');
            makeQueryBuilder(handler).limit(10);
            expect(handler.getQueryExecutor().makeQueryOptions()).toEqual({ limit: 10 });
        });
        it('builds this.ordering and adds to property "sort"', function () {
            const handler = makeQueryBuilderHandler('users');
            makeQueryBuilder(handler)
                .orderByAsc('a')
                .orderByDesc('b')
                .orderBy('c', 'asc')
                .orderBy('c', 'desc');
            expect(handler.getQueryExecutor().makeQueryOptions()).toEqual({
                sort: [['a', 1], ['b', -1], ['c', -1]]
            });
        });
        it('builds this.fields.select and adds to property "projection"', function () {
            const handler = makeQueryBuilderHandler('users');
            makeQueryBuilder(handler).select('a', 'b', 'c');
            expect(handler.getQueryExecutor().makeQueryOptions()).toEqual({
                projection: { a: 1, b: 1, c: 1 }
            });
        });
    });
});
