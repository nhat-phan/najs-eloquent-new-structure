"use strict";
/// <reference path="../../definitions/model/IModel.ts" />
/// <reference path="../../definitions/relations/IRelation.ts" />
/// <reference path="../../definitions/relations/IHasOne.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const najs_binding_1 = require("najs-binding");
const HasOneOrMany_1 = require("./HasOneOrMany");
const RelationType_1 = require("../RelationType");
const constants_1 = require("../../constants");
class HasOne extends HasOneOrMany_1.HasOneOrMany {
    getClassName() {
        return constants_1.NajsEloquent.Relation.Relationship.HasOne;
    }
    getType() {
        return RelationType_1.RelationType.HasOne;
    }
    async executeQuery(queryBuilder) {
        return queryBuilder.first();
    }
    executeCollector(collector) {
        collector.limit(1);
        const result = collector.exec();
        if (result.length === 0) {
            return undefined;
        }
        return this.getDataBucket().makeModel(this.targetModel, result[0]);
    }
    getEmptyValue() {
        return undefined;
    }
}
HasOne.className = constants_1.NajsEloquent.Relation.Relationship.HasOne;
exports.HasOne = HasOne;
najs_binding_1.register(HasOne, constants_1.NajsEloquent.Relation.Relationship.HasOne);
