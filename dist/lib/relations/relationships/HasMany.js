"use strict";
/// <reference path="../../definitions/collect.js/index.d.ts" />
/// <reference path="../../definitions/model/IModel.ts" />
/// <reference path="../../definitions/relations/IRelation.ts" />
/// <reference path="../../definitions/relations/IHasOne.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const najs_binding_1 = require("najs-binding");
const HasOneOrMany_1 = require("./HasOneOrMany");
const RelationType_1 = require("../RelationType");
const constants_1 = require("../../constants");
const factory_1 = require("../../util/factory");
class HasMany extends HasOneOrMany_1.HasOneOrMany {
    getClassName() {
        return constants_1.NajsEloquent.Relation.Relationship.HasOne;
    }
    getType() {
        return RelationType_1.RelationType.HasOne;
    }
    async executeQuery(queryBuilder) {
        return queryBuilder.get();
    }
    executeCollector(collector) {
        return this.getDataBucket().makeCollection(this.targetModel, collector.exec());
    }
    getEmptyValue() {
        return factory_1.make_collection([]);
    }
}
exports.HasMany = HasMany;
najs_binding_1.register(HasMany, constants_1.NajsEloquent.Relation.Relationship.HasOne);
