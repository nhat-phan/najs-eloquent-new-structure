"use strict";
/// <reference path="../../definitions/driver/IExecutorFactory.ts" />
/// <reference path="../../definitions/features/IRecordExecutor.ts" />
/// <reference path="../../definitions/query-builders/IQueryExecutor.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const MongodbRecordExecutor_1 = require("./MongodbRecordExecutor");
const MongodbProviderFacade_1 = require("../../facades/global/MongodbProviderFacade");
const MongodbQueryLog_1 = require("./MongodbQueryLog");
class MongodbExecutorFactory {
    makeRecordExecutor(model, record) {
        return new MongodbRecordExecutor_1.MongodbRecordExecutor(model, record, this.getCollection(model), this.makeLogger());
    }
    makeQueryExecutor(handler) {
        return {};
    }
    getCollection(model) {
        return MongodbProviderFacade_1.MongodbProviderFacade.getDatabase().collection(model.getRecordName());
    }
    makeLogger() {
        return new MongodbQueryLog_1.MongodbQueryLog();
    }
}
exports.MongodbExecutorFactory = MongodbExecutorFactory;
