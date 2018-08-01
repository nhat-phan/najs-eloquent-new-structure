"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const QueryBuilder_1 = require("../../../lib/query-builders/QueryBuilder");
const MongodbQueryBuilder_1 = require("../../../lib/drivers/mongodb/MongodbQueryBuilder");
const MongodbQueryBuilderHandler_1 = require("../../../lib/drivers/mongodb/MongodbQueryBuilderHandler");
describe('MongodbQueryBuilder', function () {
    it('extends QueryBuilder', function () {
        const model = {};
        const instance = new MongodbQueryBuilder_1.MongodbQueryBuilder(new MongodbQueryBuilderHandler_1.MongodbQueryBuilderHandler(model));
        expect(instance).toBeInstanceOf(QueryBuilder_1.QueryBuilder);
    });
});
