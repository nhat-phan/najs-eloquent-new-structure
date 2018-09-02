"use strict";
/// <reference path="../../definitions/features/IRecordExecutor.ts" />
/// <reference path="../../definitions/query-builders/IConvention.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const ExecutorBase_1 = require("../ExecutorBase");
const MongodbConvention_1 = require("../../query-builders/shared/MongodbConvention");
class MongooseRecordExecutor extends ExecutorBase_1.ExecutorBase {
    constructor(model, document, logger) {
        super();
        this.model = model;
        this.document = document;
        this.logger = logger;
        this.convention = new MongodbConvention_1.MongodbConvention();
    }
    async create() {
        const result = this.shouldExecute() ? await this.document.save() : {};
        return this.logRaw('save')
            .action(`${this.model.getModelName()}.create()`)
            .end(result);
    }
    async update() {
        const result = this.shouldExecute() ? await this.document.save() : {};
        return this.logRaw('save')
            .action(`${this.model.getModelName()}.update()`)
            .end(result);
    }
    async softDelete() {
        const result = this.shouldExecute() ? await this.document['delete']() : {};
        return this.logRaw('delete')
            .action(`${this.model.getModelName()}.softDelete()`)
            .end(result);
    }
    async hardDelete() {
        const result = this.shouldExecute() ? await this.document.remove() : {};
        return this.logRaw('remove')
            .action(`${this.model.getModelName()}.hardDelete()`)
            .end(result);
    }
    async restore() {
        const result = this.shouldExecute() ? await this.document['restore']() : {};
        return this.logRaw('restore')
            .action(`${this.model.getModelName()}.restore()`)
            .end(result);
    }
    logRaw(func) {
        return this.logger.raw(this.document.modelName || this.model.getModelName(), `.${func}()`);
    }
}
exports.MongooseRecordExecutor = MongooseRecordExecutor;
