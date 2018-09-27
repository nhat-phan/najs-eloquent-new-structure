"use strict";
/// <reference path="../../definitions/model/IModel.ts" />
/// <reference path="../../definitions/query-builders/IQueryBuilder.ts" />
/// <reference path="../../definitions/features/IRecordManager.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
require("./MongooseDocumentManager");
const najs_binding_1 = require("najs-binding");
const DriverBase_1 = require("../DriverBase");
const constants_1 = require("../../constants");
const MongooseQueryBuilderFactory_1 = require("./MongooseQueryBuilderFactory");
const MongooseExecutorFactory_1 = require("./MongooseExecutorFactory");
class MongooseDriver extends DriverBase_1.DriverBase {
    constructor() {
        super();
        this.documentManager = najs_binding_1.make(constants_1.NajsEloquent.Driver.Mongoose.MongooseDocumentManager, [
            najs_binding_1.make(MongooseExecutorFactory_1.MongooseExecutorFactory.className)
        ]);
    }
    getClassName() {
        return constants_1.NajsEloquent.Driver.MongooseDriver;
    }
    getRecordManager() {
        return this.documentManager;
    }
    makeQueryBuilderFactory() {
        return najs_binding_1.make(MongooseQueryBuilderFactory_1.MongooseQueryBuilderFactory.className);
    }
}
MongooseDriver.Name = 'mongoose';
exports.MongooseDriver = MongooseDriver;
najs_binding_1.register(MongooseDriver, constants_1.NajsEloquent.Driver.MongooseDriver);
