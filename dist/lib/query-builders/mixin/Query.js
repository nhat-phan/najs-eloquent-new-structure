"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Query = {
    select(...fields) {
        this['handler'].getBasicQuery().select(...fields);
        return this;
    },
    limit(record) {
        this['handler'].getBasicQuery().limit(record);
        return this;
    },
    orderBy(field, direction) {
        this['handler'].getBasicQuery().orderBy(field, direction);
        return this;
    },
    queryName(name) {
        this['handler'].setQueryName(name);
        return this;
    },
    setLogGroup(group) {
        this['handler'].setLogGroup(group);
        return this;
    },
    orderByAsc(field) {
        return this.orderBy(field, 'asc');
    },
    orderByDesc(field) {
        return this.orderBy(field, 'desc');
    }
};
