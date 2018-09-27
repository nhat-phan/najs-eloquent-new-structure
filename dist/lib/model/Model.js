"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const najs_binding_1 = require("najs-binding");
const EloquentDriverProviderFacade_1 = require("../facades/global/EloquentDriverProviderFacade");
const PrototypeManager_1 = require("../util/PrototypeManager");
class Model {
    constructor(data, isGuarded) {
        this.internalData = {
            relations: {}
        };
        return this.makeDriver().makeModel(this, data, isGuarded);
    }
    makeDriver() {
        this.driver = EloquentDriverProviderFacade_1.EloquentDriverProvider.create(this);
        return this.driver;
    }
    getDriver() {
        return this.driver;
    }
    getModelName() {
        return najs_binding_1.getClassName(this);
    }
    newQuery(name) {
        const query = this.driver.getQueryFeature().newQuery(this);
        return typeof name !== 'undefined' ? query.queryName(name) : query;
    }
    static newQuery(name) {
        return new this().newQuery(name);
    }
    /**
     * Set the query with given name
     *
     * @param {string} name
     */
    static queryName(name) {
        return this.newQuery(name);
    }
    /**
     * Set the query log group name
     *
     * @param {string} group QueryLog group
     */
    static setLogGroup(group) {
        const query = this.newQuery();
        return query.setLogGroup.apply(query, arguments);
    }
    static select() {
        const query = this.newQuery();
        return query.select.apply(query, arguments);
    }
    static limit() {
        const query = this.newQuery();
        return query.limit.apply(query, arguments);
    }
    static orderBy() {
        const query = this.newQuery();
        return query.orderBy.apply(query, arguments);
    }
    /**
     * Add an "order by" clause to the query with direction ASC.
     *
     * @param {string} field
     * @param {string} direction
     */
    static orderByAsc(field) {
        const query = this.newQuery();
        return query.orderByAsc.apply(query, arguments);
    }
    /**
     * Add an "order by" clause to the query with direction DESC.
     *
     * @param {string} field
     * @param {string} direction
     */
    static orderByDesc(field) {
        const query = this.newQuery();
        return query.orderByDesc.apply(query, arguments);
    }
    /**
     * Consider all soft-deleted or not-deleted items.
     */
    static withTrashed() {
        const query = this.newQuery();
        return query.withTrashed.apply(query, arguments);
    }
    /**
     * Consider soft-deleted items only.
     */
    static onlyTrashed() {
        const query = this.newQuery();
        return query.onlyTrashed.apply(query, arguments);
    }
    static where() {
        const query = this.newQuery();
        return query.where.apply(query, arguments);
    }
    static whereNot(field, value) {
        const query = this.newQuery();
        return query.whereNot.apply(query, arguments);
    }
    static whereIn(field, values) {
        const query = this.newQuery();
        return query.whereIn.apply(query, arguments);
    }
    static whereNotIn(field, values) {
        const query = this.newQuery();
        return query.whereNotIn.apply(query, arguments);
    }
    static whereNull(field) {
        const query = this.newQuery();
        return query.whereNull.apply(query, arguments);
    }
    static whereNotNull(field) {
        const query = this.newQuery();
        return query.whereNotNull.apply(query, arguments);
    }
    static whereBetween(field, range) {
        const query = this.newQuery();
        return query.whereBetween.apply(query, arguments);
    }
    static whereNotBetween(field, range) {
        const query = this.newQuery();
        return query.whereNotBetween.apply(query, arguments);
    }
}
exports.Model = Model;
PrototypeManager_1.PrototypeManager.stopFindingRelationsIn(Model.prototype);
