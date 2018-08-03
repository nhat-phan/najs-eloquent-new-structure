"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NotFoundError_1 = require("../../errors/NotFoundError");
exports.AdvancedQuery = {
    async first(id) {
        if (typeof id !== 'undefined') {
            this.where(this.handler.getPrimaryKeyName(), id);
        }
        const result = await this.handler.getQueryExecutor().first();
        return result ? this.handler.createInstance(result) : result;
    },
    async find(id) {
        return this.first(id);
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
        return this.first(id);
    },
    async findOrFail(id) {
        return this.firstOrFail(id);
    },
    async firstOrFail(id) {
        const result = await this.first(id);
        if (!result) {
            throw new NotFoundError_1.NotFoundError(this.handler.getModel().getModelName());
        }
        return result;
    }
};
