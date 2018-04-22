"use strict";
/// <reference path="../../contracts/Component.ts" />
/// <reference path="../interfaces/IModel.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const najs_binding_1 = require("najs-binding");
const constants_1 = require("../../constants");
const FORWARD_TO_QUERY_BUILDER_WRAPPER = constants_1.StartQueryFunctions;
class ModelQuery {
    getClassName() {
        return constants_1.NajsEloquent.Model.Component.ModelQuery;
    }
    extend(prototype, bases, driver) {
        prototype['newQuery'] = ModelQuery.newQuery;
        for (const name of FORWARD_TO_QUERY_BUILDER_WRAPPER) {
            prototype[name] = ModelQuery.forwardToQueryBuilder(name);
        }
    }
    static get FORWARD_TO_QUERY_BUILDER_WRAPPER() {
        return constants_1.StartQueryFunctions;
    }
    static newQuery() {
        return this['driver'].newQuery();
    }
    static forwardToQueryBuilder(name) {
        return function () {
            return this['driver'].newQuery()[name](...arguments);
        };
    }
}
ModelQuery.className = constants_1.NajsEloquent.Model.Component.ModelQuery;
exports.ModelQuery = ModelQuery;
najs_binding_1.register(ModelQuery);
