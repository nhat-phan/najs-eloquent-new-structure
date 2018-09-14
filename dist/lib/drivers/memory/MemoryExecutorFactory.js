"use strict";
/// <reference path="../../definitions/driver/IExecutorFactory.ts" />
/// <reference path="../../definitions/features/IRecordExecutor.ts" />
/// <reference path="../../definitions/query-builders/IQueryExecutor.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const najs_binding_1 = require("najs-binding");
const constants_1 = require("../../constants");
const MemoryQueryLog_1 = require("./MemoryQueryLog");
class MemoryExecutorFactory {
    makeRecordExecutor(model, record) {
        return {};
    }
    makeQueryExecutor(handler) {
        return {};
    }
    getClassName() {
        return constants_1.NajsEloquent.Driver.Memory.MemoryExecutorFactory;
    }
    makeLogger() {
        return new MemoryQueryLog_1.MemoryQueryLog();
    }
}
MemoryExecutorFactory.className = constants_1.NajsEloquent.Driver.Memory.MemoryExecutorFactory;
exports.MemoryExecutorFactory = MemoryExecutorFactory;
najs_binding_1.register(MemoryExecutorFactory, constants_1.NajsEloquent.Driver.Memory.MemoryExecutorFactory, true, true);
