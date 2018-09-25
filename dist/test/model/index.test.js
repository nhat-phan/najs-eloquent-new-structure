"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const najs_binding_1 = require("najs-binding");
const Model_1 = require("../../lib/model/Model");
const EloquentDriverProviderFacade_1 = require("../../lib/facades/global/EloquentDriverProviderFacade");
const MemoryDriver_1 = require("../../lib/drivers/memory/MemoryDriver");
const bson_1 = require("bson");
EloquentDriverProviderFacade_1.EloquentDriverProvider.register(MemoryDriver_1.MemoryDriver, 'memory', true);
class TestModel extends Model_1.Model {
    getClassName() {
        return 'TestModel';
    }
}
najs_binding_1.register(TestModel);
describe('Model', function () {
    it('should works', function () {
        const test = new TestModel();
        test.newQuery();
        try {
            test.newQuery('test');
        }
        catch (error) { }
    });
    it('equals', function () {
        const a = new bson_1.ObjectId();
        const b = new bson_1.ObjectId();
        console.log(a.toHexString());
        console.log(b.toString() === b.toHexString());
        // const id = a.toHexString()
    });
});
