"use strict";
/// <reference path="../definitions/model/IModel.ts" />
/// <reference path="../definitions/query-builders/IQueryBuilder.ts" />
/// <reference path="../definitions/query-builders/IQueryBuilderFactory.ts" />
/// <reference path="../definitions/features/IQueryFeature.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const najs_binding_1 = require("najs-binding");
const FeatureBase_1 = require("./FeatureBase");
const QueryPublicApi_1 = require("./mixin/QueryPublicApi");
const constants_1 = require("../constants");
class QueryFeature extends FeatureBase_1.FeatureBase {
    constructor(factory) {
        super();
        this.factory = factory;
    }
    getPublicApi() {
        return QueryPublicApi_1.QueryPublicApi;
    }
    getFeatureName() {
        return 'Query';
    }
    getClassName() {
        return constants_1.NajsEloquent.Feature.QueryFeature;
    }
    newQuery(model) {
        return this.factory.make(model);
    }
}
exports.QueryFeature = QueryFeature;
najs_binding_1.register(QueryFeature, constants_1.NajsEloquent.Feature.QueryFeature);
