"use strict";
/// <reference path="../../definitions/model/IModel.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const MongodbProviderFacade_1 = require("../../facades/global/MongodbProviderFacade");
class MongodbExecutor {
    constructor(model, logger) {
        this.logger = logger;
        this.collectionName = model.getRecordName();
        this.collection = MongodbProviderFacade_1.MongodbProviderFacade.getDatabase().collection(this.collectionName);
    }
    getCollection() {
        return this.collection;
    }
    logRaw(query, options, func) {
        return this.logger.raw('db.', this.collectionName, `.${func}(`, query).raw(options ? ', ' : '', options, ')');
    }
}
exports.MongodbExecutor = MongodbExecutor;
