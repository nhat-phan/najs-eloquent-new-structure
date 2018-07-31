"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const Model_1 = require("../../lib/model/Model");
const EloquentDriverProviderFacade_1 = require("../../lib/facades/global/EloquentDriverProviderFacade");
const DummyDriver_1 = require("../../lib/drivers/dummy/DummyDriver");
EloquentDriverProviderFacade_1.EloquentDriverProvider.register(DummyDriver_1.DummyDriver, 'dummy', true);
describe('Model', function () {
    it('should works', function () {
        const test = new Model_1.Model();
        test.query();
        try {
            test.query('test');
        }
        catch (error) { }
    });
});
