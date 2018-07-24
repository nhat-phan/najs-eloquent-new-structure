"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const QueryLogFacade_1 = require("../../facades/global/QueryLogFacade");
const lodash_1 = require("lodash");
class MongodbQueryLog {
    constructor() {
        this.data = {
            raw: '',
            queryBuilderData: {}
        };
    }
    name(name) {
        this.data.name = name;
        return this;
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
    action(action) {
        this.data.action = action;
        return this;
    }
    raw(...args) {
        this.data.raw += lodash_1.flatten(args)
            .map(function (item) {
            if (typeof item === 'string') {
                return item;
            }
            return JSON.stringify(item);
        })
            .join('');
        return this;
    }
    end(result) {
        this.data.result = result;
        QueryLogFacade_1.QueryLog.push(this.data);
        return result;
    }
}
exports.MongodbQueryLog = MongodbQueryLog;
