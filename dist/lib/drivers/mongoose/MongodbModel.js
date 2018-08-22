"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Model_1 = require("../../model/Model");
const MongooseDriver_1 = require("./MongooseDriver");
const binding_1 = require("../../util/binding");
const PrototypeManager_1 = require("../../util/PrototypeManager");
class MongooseModel extends Model_1.Model {
    makeDriver() {
        binding_1.bind_driver_if_needed(this.getModelName(), MongooseDriver_1.MongooseDriver.name, MongooseDriver_1.MongooseDriver);
        return super.makeDriver();
    }
    newQuery() {
        return super.newQuery();
    }
}
exports.MongooseModel = MongooseModel;
PrototypeManager_1.PrototypeManager.stopFindingRelationsIn(MongooseModel.prototype);
