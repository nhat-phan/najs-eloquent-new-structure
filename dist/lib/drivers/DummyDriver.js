"use strict";
/// <reference path="../definitions/features/IRecordManager.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
require("../features/RecordManager");
const najs_binding_1 = require("najs-binding");
const DriverBase_1 = require("./DriverBase");
const constants_1 = require("../constants");
class DummyDriver extends DriverBase_1.DriverBase {
    constructor() {
        super();
        this.recordManager = najs_binding_1.make(constants_1.NajsEloquent.Feature.RecordManager);
    }
    getClassName() {
        return constants_1.NajsEloquent.Driver.DummyDriver;
    }
    getRecordManager() {
        return this.recordManager;
    }
}
exports.DummyDriver = DummyDriver;
najs_binding_1.register(DummyDriver, constants_1.NajsEloquent.Driver.DummyDriver);
