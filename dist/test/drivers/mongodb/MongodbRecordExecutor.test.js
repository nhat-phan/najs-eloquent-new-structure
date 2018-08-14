"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const MongodbRecordExecutor_1 = require("../../../lib/drivers/mongodb/MongodbRecordExecutor");
describe('MongodbRecordExecutor', function () {
    function makeExecutor() {
        return new MongodbRecordExecutor_1.MongodbRecordExecutor({}, {}, {}, {});
    }
    describe('.create()', function () {
        it('should work', function () {
            makeExecutor().create();
        });
    });
    describe('.update()', function () {
        it('should work', function () {
            makeExecutor().update();
        });
    });
    describe('.delete()', function () {
        it('should work', function () {
            makeExecutor().delete(true);
        });
    });
    describe('.restore()', function () {
        it('should work', function () {
            makeExecutor().restore();
        });
    });
});
