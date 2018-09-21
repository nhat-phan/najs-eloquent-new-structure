"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const QueryLogBase_1 = require("../QueryLogBase");
class MemoryQueryLog extends QueryLogBase_1.QueryLogBase {
    getDefaultData() {
        return this.getEmptyData();
    }
    dataSource(ds) {
        this.data.dataSource = ds.getClassName();
        return this;
    }
}
exports.MemoryQueryLog = MemoryQueryLog;
