"use strict";
/// <reference path="../../definitions/model/IModel.ts" />
/// <reference path="../../definitions/model/IEloquentStatic.ts" />
/// <reference path="../../definitions/query-builders/IQueryBuilder.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const EloquentPublicApi_1 = require("./EloquentPublicApi");
exports.EloquentStaticPublicApi = Object.assign(EloquentPublicApi_1.EloquentPublicApi, {
    newQuery(name) {
        const modelInstance = Reflect.construct(this, []);
        return modelInstance.newQuery(name);
    }
});
