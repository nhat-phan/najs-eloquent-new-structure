"use strict";
/// <reference path="../definitions/model/IEloquent.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const Model_1 = require("./Model");
const EloquentPublicApi_1 = require("./mixin/EloquentPublicApi");
const EloquentStaticPublicApi_1 = require("./mixin/EloquentStaticPublicApi");
class Eloquent extends Model_1.Model {
    static Class() {
        return this;
    }
}
exports.Eloquent = Eloquent;
Object.assign(Eloquent.prototype, EloquentPublicApi_1.EloquentPublicApi);
Object.assign(Eloquent, EloquentStaticPublicApi_1.EloquentStaticPublicApi);
