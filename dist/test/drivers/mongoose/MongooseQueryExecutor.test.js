"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const Sinon = require("sinon");
const util_1 = require("../../util");
const QueryLogFacade_1 = require("../../../lib/facades/global/QueryLogFacade");
const MongooseQueryExecutor_1 = require("../../../lib/drivers/mongoose/MongooseQueryExecutor");
const MongooseQueryBuilder_1 = require("../../../lib/drivers/mongoose/MongooseQueryBuilder");
const MongooseQueryBuilderHandler_1 = require("../../../lib/drivers/mongoose/MongooseQueryBuilderHandler");
const SoftDelete_1 = require("../../../lib/drivers/mongoose/plugins/SoftDelete");
const MongodbQueryLog_1 = require("../../../lib/drivers/mongodb/MongodbQueryLog");
const mongoose_1 = require("mongoose");
const mongoose = require('mongoose');
const UserSchema = new mongoose_1.Schema({
    first_name: { type: String },
    last_name: { type: String },
    age: { type: Number }
}, {
    collection: 'users'
});
const UserModel = mongoose.model('User', UserSchema);
const RoleSchema = new mongoose_1.Schema({
    name: { type: String }
}, {
    collection: 'roles'
});
RoleSchema.plugin(SoftDelete_1.SoftDelete, { overrideMethods: true });
const RoleModel = mongoose.model('Role', RoleSchema);
describe('MongooseQueryExecutor', function () {
    jest.setTimeout(10000);
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
        await util_1.init_mongoose(mongoose, 'mongoose_query_builder');
        for (const data of dataset) {
            const user = new UserModel();
            user.set(data);
            await user.save();
        }
        for (let i = 0; i < 10; i++) {
            const role = new RoleModel();
            role.set({ name: 'role-' + i });
            await role['delete']();
        }
    });
    afterAll(async function () {
        util_1.delete_collection(mongoose, 'users');
        util_1.delete_collection(mongoose, 'roles');
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
        if (typeof result !== 'undefined') {
            expect(logData['result'] === result).toBe(true);
        }
        expect(logData).toMatchObject(data);
    }
    function makeQueryBuilder(name) {
        return new MongooseQueryBuilder_1.MongooseQueryBuilder(new MongooseQueryBuilderHandler_1.MongooseQueryBuilderHandler({
            getModelName() {
                return name;
            }
        }));
    }
    function makeQueryExecutor(queryBuilder, model) {
        return new MongooseQueryExecutor_1.MongooseQueryExecutor(queryBuilder['handler'], model, new MongodbQueryLog_1.MongodbQueryLog());
    }
    describe('.get()', function () {
        it('gets all data of collection and return an instance of Collection<Eloquent<T>>', async function () {
            const query = makeQueryExecutor(makeQueryBuilder('User'), UserModel);
            const result = await query.get();
            expect(result.length).toEqual(7);
            for (let i = 0; i < 7; i++) {
                expect_match_user(result[i], dataset[i]);
            }
            expect_query_log({
                raw: 'User.find({}).exec()',
                action: 'get'
            }, result);
        });
        it('returns an empty collection if no result', async function () {
            const query = makeQueryBuilder('User');
            query.where('first_name', 'no-one');
            const result = await makeQueryExecutor(query, UserModel).get();
            expect(result.length === 0).toBe(true);
            expect_query_log({
                raw: 'User.find({"first_name":"no-one"}).exec()',
                action: 'get'
            }, result);
        });
        it('can get data by query builder, case 1', async function () {
            const query = makeQueryBuilder('User');
            query.where('age', 1000);
            const result = await makeQueryExecutor(query, UserModel).get();
            expect(result.length).toEqual(1);
            expect_match_user(result[0], dataset[3]);
            expect_query_log({
                raw: 'User.find({"age":1000}).exec()',
                action: 'get'
            }, result);
        });
        it('can get data by query builder, case 2', async function () {
            const query = makeQueryBuilder('User');
            query.where('age', 40);
            const result = await makeQueryExecutor(query, UserModel).get();
            expect(result.length).toEqual(2);
            expect_match_user(result[0], dataset[2]);
            expect_match_user(result[1], dataset[5]);
            expect_query_log({
                raw: 'User.find({"age":40}).exec()',
                action: 'get'
            }, result);
        });
        it('can get data by query builder, case 3', async function () {
            const query = makeQueryBuilder('User');
            query.where('age', 40).where('last_name', 'stark');
            const result = await makeQueryExecutor(query, UserModel).get();
            expect(result.length).toEqual(1);
            expect_match_user(result[0], dataset[2]);
            expect_query_log({
                raw: 'User.find({"age":40,"last_name":"stark"}).exec()',
                action: 'get'
            }, result);
        });
        it('can get data by query builder, case 4', async function () {
            const query = makeQueryBuilder('User');
            query.where('age', 40).orWhere('first_name', 'peter');
            const result = await makeQueryExecutor(query, UserModel).get();
            expect(result.length).toEqual(3);
            expect_match_user(result[0], dataset[2]);
            expect_match_user(result[1], dataset[5]);
            expect_match_user(result[2], dataset[6]);
            expect_query_log({
                raw: 'User.find({"$or":[{"age":40},{"first_name":"peter"}]}).exec()',
                action: 'get'
            }, result);
        });
    });
    describe('.first()', function () {
        it('should work', function () {
            makeQueryExecutor(makeQueryBuilder('User'), UserModel).first();
        });
    });
    describe('.count()', function () {
        it('should work', function () {
            makeQueryExecutor(makeQueryBuilder('User'), UserModel).count();
        });
    });
    describe('.update()', function () {
        it('should work', function () {
            makeQueryExecutor(makeQueryBuilder('User'), UserModel).update({});
        });
    });
    describe('.delete()', function () {
        it('should work', function () {
            makeQueryExecutor(makeQueryBuilder('User'), UserModel).delete();
        });
    });
    describe('.restore()', function () {
        it('should work', function () {
            makeQueryExecutor(makeQueryBuilder('User'), UserModel).restore();
        });
    });
    describe('.execute()', function () {
        it('should work', function () {
            makeQueryExecutor(makeQueryBuilder('User'), UserModel).execute();
        });
    });
    describe('.constructor()', function () {
        it('find modelName from mongooseModel.modelName, otherwise will use queryHandler.getModel().getModelName()', function () {
            const query = makeQueryBuilder('User');
            const executor = makeQueryExecutor(query, {});
            expect(executor['modelName']).toEqual('User');
            const queryTwo = makeQueryBuilder('Anything');
            const executorTwo = makeQueryExecutor(queryTwo, UserModel);
            expect(executorTwo['modelName']).toEqual('User');
        });
    });
    describe('.getMongooseQuery()', function () {
        it('does nothing, just returns .mongooseQuery if .hasMongooseQuery is true', function () {
            const executor = makeQueryExecutor(makeQueryBuilder('User'), UserModel);
            const mongooseQuery = {};
            executor['hasMongooseQuery'] = true;
            executor['mongooseQuery'] = mongooseQuery;
            expect(executor.createQuery(true) === mongooseQuery).toBe(true);
        });
        it('convert conditions of basicQuery then create mongooseQuery from mongooseModel use .find() if isFindOne = false', function () {
            const query = makeQueryBuilder('User');
            query.where('a', 1).where('b', 2);
            const executor = makeQueryExecutor(query, UserModel);
            executor.getMongooseQuery(false);
            executor['logger'].end({});
            expect_query_log({ raw: 'User.find({"a":1,"b":2})' });
        });
        it('convert conditions of basicQuery then create mongooseQuery from mongooseModel use .findOne() if isFindOne = true', function () {
            const query = makeQueryBuilder('User');
            query.where('a', 1).where('b', 2);
            const executor = makeQueryExecutor(query, UserModel);
            executor.getMongooseQuery(true);
            executor['logger'].end({});
            expect_query_log({ raw: 'User.findOne({"a":1,"b":2})' });
        });
    });
    describe('.passSelectToQuery()', function () {
        it('does nothing if there is no select in queryBuilder', function () {
            const query = makeQueryBuilder('User');
            const executor = makeQueryExecutor(query, UserModel);
            const mongooseQuery = executor.getMongooseQuery(false);
            executor.passSelectToQuery(mongooseQuery);
            executor['logger'].end({});
            expect_query_log({ raw: 'User.find({})' });
        });
        it('passed selected field to MongooseQuery if needed', function () {
            const query = makeQueryBuilder('User');
            query.select('a', 'b').select('a', 'c');
            const executor = makeQueryExecutor(query, UserModel);
            const mongooseQuery = executor.getMongooseQuery(false);
            executor.passSelectToQuery(mongooseQuery);
            executor['logger'].end({});
            expect_query_log({ raw: 'User.find({}).select("a b c")' });
        });
    });
    describe('.passLimitToQuery()', function () {
        it('does nothing if there is no limit in queryBuilder', function () {
            const query = makeQueryBuilder('User');
            const executor = makeQueryExecutor(query, UserModel);
            const mongooseQuery = executor.getMongooseQuery(false);
            executor.passLimitToQuery(mongooseQuery);
            executor['logger'].end({});
            expect_query_log({ raw: 'User.find({})' });
        });
        it('passed limit number to MongooseQuery if needed', function () {
            const query = makeQueryBuilder('User');
            query.limit(100);
            const executor = makeQueryExecutor(query, UserModel);
            const mongooseQuery = executor.getMongooseQuery(false);
            executor.passLimitToQuery(mongooseQuery);
            executor['logger'].end({});
            expect_query_log({ raw: 'User.find({}).limit(100)' });
        });
    });
    describe('.passOrderingToQuery()', function () {
        it('does nothing if there is no limit in queryBuilder', function () {
            const query = makeQueryBuilder('User');
            const executor = makeQueryExecutor(query, UserModel);
            const mongooseQuery = executor.getMongooseQuery(false);
            executor.passOrderingToQuery(mongooseQuery);
            executor['logger'].end({});
            expect_query_log({ raw: 'User.find({})' });
        });
        it('passed order to MongooseQuery if needed', function () {
            const query = makeQueryBuilder('User');
            query.orderByAsc('a').orderByDesc('b');
            const executor = makeQueryExecutor(query, UserModel);
            const mongooseQuery = executor.getMongooseQuery(false);
            executor.passOrderingToQuery(mongooseQuery);
            executor['logger'].end({});
            expect_query_log({ raw: 'User.find({}).sort({"a":1,"b":-1})' });
        });
    });
    describe('.createQuery()', function () {
        it('calls .getMongooseQuery() then call 3 pass params functions', function () {
            const query = makeQueryBuilder('User');
            const executor = makeQueryExecutor(query, UserModel);
            const getMongooseQueryStub = Sinon.stub(executor, 'getMongooseQuery');
            getMongooseQueryStub.returns('anything');
            const passSelectToQueryStub = Sinon.stub(executor, 'passSelectToQuery');
            passSelectToQueryStub.returns('pass function 1');
            const passLimitToQueryStub = Sinon.stub(executor, 'passLimitToQuery');
            passLimitToQueryStub.returns('pass function 2');
            const passOrderingToQueryStub = Sinon.stub(executor, 'passOrderingToQuery');
            passOrderingToQueryStub.returns('pass function 3');
            expect(executor.createQuery(true)).toBe('anything');
            expect(getMongooseQueryStub.calledWith(true)).toBe(true);
            expect(passSelectToQueryStub.calledWith('anything')).toBe(true);
            expect(passLimitToQueryStub.calledWith('anything')).toBe(true);
            expect(passOrderingToQueryStub.calledWith('anything')).toBe(true);
        });
    });
});
