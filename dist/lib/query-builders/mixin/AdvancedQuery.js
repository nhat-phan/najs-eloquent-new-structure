"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NotFoundError_1 = require("../../errors/NotFoundError");
exports.AdvancedQuery = {
    async find(id) {
        if (typeof id !== 'undefined') {
            this.where(this.handler.getPrimaryKeyName(), id);
        }
        const result = await this.handler.getQueryExecutor().find();
        return result ? this.handler.createInstance(result) : result;
    },
    async first(id) {
        return this.find(id);
    },
    async get(...fields) {
        if (arguments.length !== 0) {
            this.select(...fields);
        }
        return this.handler.createCollection(await this.handler.getQueryExecutor().get());
    },
    async all() {
        return this.get();
    },
    async pluck(valueKey, indexKey) {
        const indexKeyName = typeof indexKey === 'undefined' ? this.handler.getPrimaryKeyName() : indexKey;
        this.select(valueKey, indexKeyName);
        const result = await this.handler.getQueryExecutor().get();
        return result.reduce(function (memo, item) {
            memo[item[indexKeyName]] = item[valueKey];
            return memo;
        }, {});
    },
    async findById(id) {
        return this.find(id);
    },
    async findOrFail(id) {
        const result = await this.find(id);
        if (!result) {
            throw new NotFoundError_1.NotFoundError(this.handler.getModel().getModelName());
        }
        return result;
    },
    async firstOrFail(id) {
        return this.findOrFail(id);
    }
};
