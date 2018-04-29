"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const Model_1 = require("../../lib/model/Model");
const DummyDriver_1 = require("../../lib/drivers/DummyDriver");
const EloquentDriverProviderFacade_1 = require("../../lib/facades/global/EloquentDriverProviderFacade");
EloquentDriverProviderFacade_1.EloquentDriverProviderFacade.register(DummyDriver_1.DummyDriver, 'dummy', true);
class User extends Model_1.Model {
}
User.className = 'User';
describe('NajsEloquent', function () {
    it('defines "attributes" as a getter/setter to remove circular reference', function () {
        const user = new User();
        expect(user['attributes'] === user['driver'].getRecord()).toBe(true);
        const attributes = { test: 'anything' };
        user['attributes'] = attributes;
        expect(user['driver'].getRecord() === attributes).toBe(true);
        const descriptor = Object.getOwnPropertyDescriptor(Model_1.Model.prototype, 'attributes');
        expect(descriptor).not.toBeUndefined();
        expect(descriptor && typeof descriptor.get).toBe('function');
        expect(descriptor && typeof descriptor.set).toBe('function');
    });
});
