"use strict";
/// <reference path="../../definitions/model/IModel.ts" />
/// <reference path="../../definitions/query-builders/IQueryBuilder.ts" />
/// <reference path="../../definitions/features/IRecordManager.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
require("../RecordManager");
const najs_binding_1 = require("najs-binding");
const DriverBase_1 = require("../DriverBase");
const constants_1 = require("../../constants");
const MongodbQueryBuilderFactory_1 = require("./MongodbQueryBuilderFactory");
const MongodbExecutorFactory_1 = require("./MongodbExecutorFactory");
class MongodbDriver extends DriverBase_1.DriverBase {
    constructor() {
        super();
        this.recordManager = najs_binding_1.make(constants_1.NajsEloquent.Feature.RecordManager, [najs_binding_1.make(MongodbExecutorFactory_1.MongodbExecutorFactory.className)]);
    }
    getClassName() {
        return constants_1.NajsEloquent.Driver.MongodbDriver;
    }
    getRecordManager() {
        return this.recordManager;
    }
    makeQueryBuilderFactory() {
        return najs_binding_1.make(MongodbQueryBuilderFactory_1.MongodbQueryBuilderFactory.className);
    }
}
MongodbDriver.Name = 'mongodb';
exports.MongodbDriver = MongodbDriver;
najs_binding_1.register(MongodbDriver, constants_1.NajsEloquent.Driver.MongodbDriver);
