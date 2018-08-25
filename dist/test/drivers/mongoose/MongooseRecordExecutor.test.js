"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const Sinon = require("sinon");
const mongoose_1 = require("mongoose");
const util_1 = require("../../util");
const QueryLogFacade_1 = require("../../../lib/facades/global/QueryLogFacade");
const MongooseRecordExecutor_1 = require("../../../lib/drivers/mongoose/MongooseRecordExecutor");
const MongodbQueryLog_1 = require("../../../lib/drivers/mongodb/MongodbQueryLog");
const mongoose = require('mongoose');
describe('MongooseRecordExecutor', function () {
    const Model = mongoose_1.model('MongooseModel', new mongoose_1.Schema({}));
    beforeAll(async function () {
        await util_1.init_mongoose(mongoose, 'mongoose_record_executor');
    });
    afterAll(async function () {
        util_1.delete_collection(mongoose, 'test');
    });
    beforeEach(function () {
        QueryLogFacade_1.QueryLog.clear().enable();
    });
    function makeExecutor(model, document) {
        return new MongooseRecordExecutor_1.MongooseRecordExecutor(model, document, new MongodbQueryLog_1.MongodbQueryLog());
    }
    function makeDocument() {
        return new Model();
    }
    function expect_query_log(data, result = undefined, index = 0) {
        const logData = QueryLogFacade_1.QueryLog.pull()[index]['data'];
        if (typeof result !== undefined) {
            expect(logData['result'] === result).toBe(true);
        }
        expect(logData).toMatchObject(data);
    }
    describe('.create()', function () {
        it('calls and returns this.document.save()', async function () {
            const model = {
                getModelName() {
                    return 'Test';
                }
            };
            const document = makeDocument();
            const spy = Sinon.spy(document, 'save');
            const executor = makeExecutor(model, document);
            const result = await executor.create();
            expect_query_log({
                raw: 'Test.save()',
                action: 'Test.create()'
            }, result);
            expect(spy.called).toBe(true);
        });
    });
    describe('.update()', function () {
        it('calls and returns this.document.save()', async function () {
            const model = {
                getModelName() {
                    return 'Test';
                }
            };
            const document = makeDocument();
            const spy = Sinon.spy(document, 'save');
            const executor = makeExecutor(model, document);
            const result = await executor.update();
            expect_query_log({
                raw: 'Test.save()',
                action: 'Test.update()'
            }, result);
            expect(spy.called).toBe(true);
        });
    });
    describe('.softDelete()', function () {
        it('calls and returns this.document.delete()', async function () {
            const model = {
                getModelName() {
                    return 'Test';
                }
            };
            const document = {
                async delete() { }
            };
            const spy = Sinon.spy(document, 'delete');
            const executor = makeExecutor(model, document);
            const result = await executor.softDelete();
            expect_query_log({
                raw: 'Test.delete()',
                action: 'Test.softDelete()'
            }, result);
            expect(spy.called).toBe(true);
        });
    });
    describe('.hardDelete()', function () {
        it('calls and returns this.document.remove()', async function () {
            const model = {
                getModelName() {
                    return 'Test';
                }
            };
            const document = makeDocument();
            const spy = Sinon.spy(document, 'remove');
            const executor = makeExecutor(model, document);
            const result = await executor.hardDelete();
            expect_query_log({
                raw: 'Test.remove()',
                action: 'Test.hardDelete()'
            }, result);
            expect(spy.called).toBe(true);
        });
    });
    describe('.restore()', function () {
        it('calls and returns this.document.restore()', async function () {
            const model = {
                getModelName() {
                    return 'Test';
                }
            };
            const document = {
                async restore() { }
            };
            const spy = Sinon.spy(document, 'restore');
            const executor = makeExecutor(model, document);
            const result = await executor.restore();
            expect_query_log({
                raw: 'Test.restore()',
                action: 'Test.restore()'
            }, result);
            expect(spy.called).toBe(true);
        });
    });
});
