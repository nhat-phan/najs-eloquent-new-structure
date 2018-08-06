"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Model_1 = require("../../model/Model");
const MongodbDriver_1 = require("./MongodbDriver");
const register_1 = require("../../util/register");
class MongodbModel extends Model_1.Model {
    makeDriver() {
        register_1.bindDriverIfNeeded(this.getModelName(), MongodbDriver_1.MongodbDriver.name, MongodbDriver_1.MongodbDriver);
        return super.makeDriver();
    }
    query() {
        return super.query();
    }
    getNativeCollection() {
        return this.query().collection();
    }
}
exports.MongodbModel = MongodbModel;
