"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConditionQuery = {
    where(arg0, arg1, arg2) {
        this['handler'].getConditionQuery().where(arg0, arg1, arg2);
        return this;
    },
    orWhere(arg0, arg1, arg2) {
        this['handler'].getConditionQuery().orWhere(arg0, arg1, arg2);
        return this;
    },
    andWhere(arg0, arg1, arg2) {
        this['handler'].getConditionQuery().andWhere(arg0, arg1, arg2);
        return this;
    },
    whereNot(field, value) {
        this['handler'].getConditionQuery().whereNot(field, value);
        return this;
    },
    andWhereNot(field, value) {
        this['handler'].getConditionQuery().andWhereNot(field, value);
        return this;
    },
    orWhereNot(field, value) {
        this['handler'].getConditionQuery().orWhereNot(field, value);
        return this;
    },
    whereIn(field, values) {
        this['handler'].getConditionQuery().whereIn(field, values);
        return this;
    },
    andWhereIn(field, values) {
        this['handler'].getConditionQuery().andWhereIn(field, values);
        return this;
    },
    orWhereIn(field, values) {
        this['handler'].getConditionQuery().orWhereIn(field, values);
        return this;
    },
    whereNotIn(field, values) {
        this['handler'].getConditionQuery().whereNotIn(field, values);
        return this;
    },
    andWhereNotIn(field, values) {
        this['handler'].getConditionQuery().andWhereNotIn(field, values);
        return this;
    },
    orWhereNotIn(field, values) {
        this['handler'].getConditionQuery().orWhereNotIn(field, values);
        return this;
    },
    whereNull(field) {
        this['handler'].getConditionQuery().whereNull(field);
        return this;
    },
    andWhereNull(field) {
        this['handler'].getConditionQuery().andWhereNull(field);
        return this;
    },
    orWhereNull(field) {
        this['handler'].getConditionQuery().orWhereNull(field);
        return this;
    },
    whereNotNull(field) {
        this['handler'].getConditionQuery().whereNotNull(field);
        return this;
    },
    andWhereNotNull(field) {
        this['handler'].getConditionQuery().andWhereNotNull(field);
        return this;
    },
    orWhereNotNull(field) {
        this['handler'].getConditionQuery().orWhereNotNull(field);
        return this;
    },
    whereBetween(field, range) {
        this['handler'].getConditionQuery().whereBetween(field, range);
        return this;
    },
    andWhereBetween(field, range) {
        this['handler'].getConditionQuery().andWhereBetween(field, range);
        return this;
    },
    orWhereBetween(field, range) {
        this['handler'].getConditionQuery().orWhereBetween(field, range);
        return this;
    },
    whereNotBetween(field, range) {
        this['handler'].getConditionQuery().whereNotBetween(field, range);
        return this;
    },
    andWhereNotBetween(field, range) {
        this['handler'].getConditionQuery().andWhereNotBetween(field, range);
        return this;
    },
    orWhereNotBetween(field, range) {
        this['handler'].getConditionQuery().orWhereNotBetween(field, range);
        return this;
    }
};
