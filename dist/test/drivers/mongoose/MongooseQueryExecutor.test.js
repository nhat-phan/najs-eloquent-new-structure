"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const MongooseQueryExecutor_1 = require("../../../lib/drivers/mongoose/MongooseQueryExecutor");
const MongooseQueryBuilderHandler_1 = require("../../../lib/drivers/mongoose/MongooseQueryBuilderHandler");
const MongodbQueryLog_1 = require("../../../lib/drivers/mongodb/MongodbQueryLog");
const mongoose_1 = require("mongoose");
const mongoose = require('mongoose');
const UserModel = mongoose.model('User', new mongoose_1.Schema({}));
describe('MongooseQueryExecutor', function () {
    function makeQueryExecutor() {
        const model = {};
        const handler = new MongooseQueryBuilderHandler_1.MongooseQueryBuilderHandler(model);
        return new MongooseQueryExecutor_1.MongooseQueryExecutor(handler, UserModel, new MongodbQueryLog_1.MongodbQueryLog());
    }
    describe('.get()', function () {
        it('should work', function () {
            makeQueryExecutor().get();
        });
    });
    describe('.first()', function () {
        it('should work', function () {
            makeQueryExecutor().first();
        });
    });
    describe('.count()', function () {
        it('should work', function () {
            makeQueryExecutor().count();
        });
    });
    describe('.update()', function () {
        it('should work', function () {
            makeQueryExecutor().update({});
        });
    });
    describe('.delete()', function () {
        it('should work', function () {
            makeQueryExecutor().delete();
        });
    });
    describe('.restore()', function () {
        it('should work', function () {
            makeQueryExecutor().restore();
        });
    });
    describe('.execute()', function () {
        it('should work', function () {
            makeQueryExecutor().execute();
        });
    });
});
