"use strict";
/// <reference path="../definitions/model/IModel.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const najs_binding_1 = require("najs-binding");
const EloquentDriverProviderFacade_1 = require("../facades/global/EloquentDriverProviderFacade");
const PrototypeManager_1 = require("../util/PrototypeManager");
class Model {
    constructor(data, isGuarded) {
        this.relations = {};
        return this.makeDriver().makeModel(this, data, isGuarded);
    }
    makeDriver() {
        this.driver = EloquentDriverProviderFacade_1.EloquentDriverProvider.create(this);
        return this.driver;
    }
    getDriver() {
        return this.driver;
    }
    getModelName() {
        return najs_binding_1.getClassName(this);
    }
    newQuery(name) {
        const query = this.driver.newQuery(this);
        return typeof name !== 'undefined' ? query.queryName(name) : query;
    }
}
exports.Model = Model;
PrototypeManager_1.PrototypeManager.stopFindingRelationsIn(Model.prototype);
