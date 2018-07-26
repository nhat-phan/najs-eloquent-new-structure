"use strict";
/// <reference path="../../definitions/model/IModel.ts" />
/// <reference path="../../definitions/query-builders/IQueryBuilder.ts" />
/// <reference path="../../definitions/features/IRecordManager.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
require("../../features/RecordManager");
const najs_binding_1 = require("najs-binding");
const DriverBase_1 = require("../DriverBase");
const constants_1 = require("../../constants");
const MongodbQueryBuilder_1 = require("./MongodbQueryBuilder");
const MongodbQueryBuilderHandle_1 = require("./MongodbQueryBuilderHandle");
class MongodbDriver extends DriverBase_1.DriverBase {
    constructor() {
        super();
        this.recordManager = najs_binding_1.make(constants_1.NajsEloquent.Feature.RecordManager);
    }
    getClassName() {
        return constants_1.NajsEloquent.Driver.MongodbDriver;
    }
    getRecordManager() {
        return this.recordManager;
    }
    newQuery(model, name) {
        const query = new MongodbQueryBuilder_1.MongodbQueryBuilder(new MongodbQueryBuilderHandle_1.MongodbQueryBuilderHandle(model));
        if (name) {
            query.queryName(name);
        }
        return query;
    }
}
exports.MongodbDriver = MongodbDriver;
najs_binding_1.register(MongodbDriver, constants_1.NajsEloquent.Driver.MongodbDriver);
