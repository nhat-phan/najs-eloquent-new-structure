"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const util_1 = require("../../util");
const QueryBuilderHandlerBase_1 = require("../../../lib/query-builders/QueryBuilderHandlerBase");
const MongodbQueryBuilderHandler_1 = require("../../../lib/drivers/mongodb/MongodbQueryBuilderHandler");
const BasicQuery_1 = require("../../../lib/query-builders/shared/BasicQuery");
const MongodbExecutor_1 = require("../../../lib/drivers/mongodb/MongodbExecutor");
const ConditionQueryHandle_1 = require("../../../lib/query-builders/shared/ConditionQueryHandle");
const MongodbConvention_1 = require("../../../lib/query-builders/shared/MongodbConvention");
describe('MongodbQueryBuilderHandler', function () {
    it('extends QueryBuilderHandlerBase', function () {
        const model = {};
        const instance = new MongodbQueryBuilderHandler_1.MongodbQueryBuilderHandler(model);
        expect(instance).toBeInstanceOf(QueryBuilderHandlerBase_1.QueryBuilderHandlerBase);
    });
    beforeAll(async function () {
        await util_1.init_mongodb('mongodb_query_builder_handler');
    });
    describe('constructor()', function () {
        it('makes 3 instances, 1. convention = MongodbConvention', function () {
            const model = {};
            const handler = new MongodbQueryBuilderHandler_1.MongodbQueryBuilderHandler(model);
            expect(handler.getQueryConvention()).toBeInstanceOf(MongodbConvention_1.MongodbConvention);
        });
        it('makes 3 instances, 2. basicQuery = BasicQuery', function () {
            const model = {};
            const handler = new MongodbQueryBuilderHandler_1.MongodbQueryBuilderHandler(model);
            expect(handler.getBasicQuery()).toBeInstanceOf(BasicQuery_1.BasicQuery);
        });
        it('makes 3 instances, 3. conditionQuery = ConditionQueryHandle which wrap "basicQuery"', function () {
            const model = {};
            const handler = new MongodbQueryBuilderHandler_1.MongodbQueryBuilderHandler(model);
            expect(handler.getConditionQuery()).toBeInstanceOf(ConditionQueryHandle_1.ConditionQueryHandle);
            expect(handler.getConditionQuery()['basicConditionQuery'] === handler.getBasicQuery()).toBe(true);
        });
    });
    describe('.getBasicQuery()', function () {
        it('simply returns "basicQuery" property', function () {
            const model = {};
            const handler = new MongodbQueryBuilderHandler_1.MongodbQueryBuilderHandler(model);
            expect(handler.getBasicQuery() === handler['basicQuery']).toBe(true);
        });
    });
    describe('.getConditionQuery()', function () {
        it('simply returns "conditionQuery" property', function () {
            const model = {};
            const handler = new MongodbQueryBuilderHandler_1.MongodbQueryBuilderHandler(model);
            expect(handler.getConditionQuery() === handler['conditionQuery']).toBe(true);
        });
    });
    describe('.getQueryConvention()', function () {
        it('simply returns "convention" property', function () {
            const model = {};
            const handler = new MongodbQueryBuilderHandler_1.MongodbQueryBuilderHandler(model);
            expect(handler.getQueryConvention() === handler['convention']).toBe(true);
        });
    });
    describe('.getQueryExecutor()', function () {
        it('creates and returns new instance of MongodbExecutor', function () {
            const model = {
                getRecordName() {
                    return 'model';
                }
            };
            const handler = new MongodbQueryBuilderHandler_1.MongodbQueryBuilderHandler(model);
            const executor1 = handler.getQueryExecutor();
            const executor2 = handler.getQueryExecutor();
            expect(executor1 === executor2).toBe(false);
            expect(executor1).toBeInstanceOf(MongodbExecutor_1.MongodbExecutor);
        });
    });
});
