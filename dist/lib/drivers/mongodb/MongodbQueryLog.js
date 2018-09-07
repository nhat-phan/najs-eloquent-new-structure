"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const QueryLogBase_1 = require("./../QueryLogBase");
class MongodbQueryLog extends QueryLogBase_1.QueryLogBase {
    getDefaultData() {
        return {
            raw: '',
            queryBuilderData: {}
        };
    }
    queryBuilderData(key, value) {
        this.data.queryBuilderData[key] = value;
        return this;
    }
    query(data) {
        this.data.query = data;
        return data;
    }
    options(data) {
        this.data.options = data;
        return data;
    }
}
exports.MongodbQueryLog = MongodbQueryLog;
