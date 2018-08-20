"use strict";
/// <reference path="../definitions/model/IEloquent.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const Model_1 = require("./Model");
const EloquentPublicApi_1 = require("./mixin/EloquentPublicApi");
const EloquentStaticPublicApi_1 = require("./mixin/EloquentStaticPublicApi");
const PrototypeManager_1 = require("../util/PrototypeManager");
class Eloquent extends Model_1.Model {
    static Class() {
        return this;
    }
}
exports.Eloquent = Eloquent;
Object.assign(Eloquent.prototype, EloquentPublicApi_1.EloquentPublicApi);
Object.assign(Eloquent, EloquentStaticPublicApi_1.EloquentStaticPublicApi);
PrototypeManager_1.PrototypeManager.stopFindingRelationsIn(Eloquent.prototype);
