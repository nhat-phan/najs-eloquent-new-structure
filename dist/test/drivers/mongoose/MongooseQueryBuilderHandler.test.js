"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const util_1 = require("../../util");
const mongoose_1 = require("mongoose");
const QueryBuilderHandlerBase_1 = require("../../../lib/query-builders/QueryBuilderHandlerBase");
const MongooseQueryBuilderHandler_1 = require("../../../lib/drivers/mongoose/MongooseQueryBuilderHandler");
const BasicQuery_1 = require("../../../lib/query-builders/shared/BasicQuery");
const ConditionQueryHandler_1 = require("../../../lib/query-builders/shared/ConditionQueryHandler");
const MongodbConvention_1 = require("../../../lib/drivers/mongodb/MongodbConvention");
const MongooseQueryExecutor_1 = require("../../../lib/drivers/mongoose/MongooseQueryExecutor");
const mongoose = require('mongoose');
describe('MongooseQueryBuilderHandler', function () {
    it('extends QueryBuilderHandlerBase', function () {
        const model = {};
        const instance = new MongooseQueryBuilderHandler_1.MongooseQueryBuilderHandler(model);
        expect(instance).toBeInstanceOf(QueryBuilderHandlerBase_1.QueryBuilderHandlerBase);
    });
    beforeAll(async function () {
        await util_1.init_mongoose(mongoose, 'mongoose_query_builder_handler');
    });
    describe('constructor()', function () {
        it('makes 3 instances, 1. convention = MongodbConvention', function () {
            const model = {};
            const handler = new MongooseQueryBuilderHandler_1.MongooseQueryBuilderHandler(model);
            expect(handler.getQueryConvention()).toBeInstanceOf(MongodbConvention_1.MongodbConvention);
        });
        it('makes 3 instances, 2. basicQuery = BasicQuery', function () {
            const model = {};
            const handler = new MongooseQueryBuilderHandler_1.MongooseQueryBuilderHandler(model);
            expect(handler.getBasicQuery()).toBeInstanceOf(BasicQuery_1.BasicQuery);
        });
        it('makes 3 instances, 3. conditionQuery = ConditionQueryHandle which wrap "basicQuery"', function () {
            const model = {};
            const handler = new MongooseQueryBuilderHandler_1.MongooseQueryBuilderHandler(model);
            expect(handler.getConditionQuery()).toBeInstanceOf(ConditionQueryHandler_1.ConditionQueryHandler);
            expect(handler.getConditionQuery()['basicConditionQuery'] === handler.getBasicQuery()).toBe(true);
        });
    });
    describe('.getBasicQuery()', function () {
        it('simply returns "basicQuery" property', function () {
            const model = {};
            const handler = new MongooseQueryBuilderHandler_1.MongooseQueryBuilderHandler(model);
            expect(handler.getBasicQuery() === handler['basicQuery']).toBe(true);
        });
    });
    describe('.getConditionQuery()', function () {
        it('simply returns "conditionQuery" property', function () {
            const model = {};
            const handler = new MongooseQueryBuilderHandler_1.MongooseQueryBuilderHandler(model);
            expect(handler.getConditionQuery() === handler['conditionQuery']).toBe(true);
        });
    });
    describe('.getQueryConvention()', function () {
        it('simply returns "convention" property', function () {
            const model = {};
            const handler = new MongooseQueryBuilderHandler_1.MongooseQueryBuilderHandler(model);
            expect(handler.getQueryConvention() === handler['convention']).toBe(true);
        });
    });
    describe('.getQueryExecutor()', function () {
        it('creates and returns new instance of MongooseQueryExecutor', function () {
            mongoose.model('Model', new mongoose_1.Schema({}));
            const model = {
                getModelName() {
                    return 'Model';
                }
            };
            const handler = new MongooseQueryBuilderHandler_1.MongooseQueryBuilderHandler(model);
            const executor1 = handler.getQueryExecutor();
            const executor2 = handler.getQueryExecutor();
            expect(executor1 === executor2).toBe(false);
            expect(executor1).toBeInstanceOf(MongooseQueryExecutor_1.MongooseQueryExecutor);
        });
    });
});
