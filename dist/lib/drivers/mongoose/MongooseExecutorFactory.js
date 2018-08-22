"use strict";
/// <reference path="../../definitions/driver/IExecutorFactory.ts" />
/// <reference path="../../definitions/features/IRecordExecutor.ts" />
/// <reference path="../../definitions/query-builders/IQueryExecutor.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const najs_binding_1 = require("najs-binding");
const MongooseRecordExecutor_1 = require("./MongooseRecordExecutor");
const MongodbQueryLog_1 = require("./../mongodb/MongodbQueryLog");
const constants_1 = require("../../constants");
class MongooseExecutorFactory {
    makeRecordExecutor(model, document) {
        return new MongooseRecordExecutor_1.MongooseRecordExecutor(model, document, this.makeLogger());
    }
    makeQueryExecutor(handler) {
        return {};
    }
    makeLogger() {
        return new MongodbQueryLog_1.MongodbQueryLog();
    }
}
MongooseExecutorFactory.className = constants_1.NajsEloquent.Driver.Mongoose.MongooseExecutorFactory;
exports.MongooseExecutorFactory = MongooseExecutorFactory;
najs_binding_1.register(MongooseExecutorFactory, constants_1.NajsEloquent.Driver.Mongoose.MongooseExecutorFactory, true, true);
