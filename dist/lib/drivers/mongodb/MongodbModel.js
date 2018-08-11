"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Model_1 = require("../../model/Model");
const MongodbDriver_1 = require("./MongodbDriver");
const binding_1 = require("../../util/binding");
class MongodbModel extends Model_1.Model {
    makeDriver() {
        binding_1.bind_driver_if_needed(this.getModelName(), MongodbDriver_1.MongodbDriver.name, MongodbDriver_1.MongodbDriver);
        return super.makeDriver();
    }
    newQuery() {
        return super.newQuery();
    }
    getNativeCollection() {
        return this.newQuery().collection();
    }
}
exports.MongodbModel = MongodbModel;
