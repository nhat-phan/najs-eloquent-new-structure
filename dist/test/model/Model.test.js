"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const Model_1 = require("../../lib/model/Model");
const DummyDriver_1 = require("../../lib/drivers/DummyDriver");
const EloquentDriverProviderFacade_1 = require("../../lib/facades/global/EloquentDriverProviderFacade");
const collect_js_1 = require("collect.js");
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
    it('test Collection reference of collect.js library (use for Relation)', function () {
        const a = { name: 'a', index: 0, id: 10 };
        const b = { name: 'b', index: 1, id: 11 };
        const c = { name: 'c', index: 2, id: 12 };
        const d = { name: 'd', index: 3, id: 13 };
        const array = [a, b, c, d];
        const collection = collect_js_1.default(array);
        expect(collection.first() === a).toBe(true);
        expect(collection.last() === d).toBe(true);
        const keyed = collection.keyBy('id');
        expect(keyed.get('10') === a).toBe(true);
        const filtered = collection.filter(function (item) {
            return item.index < 2;
        });
        expect(filtered.first() === a).toBe(true);
        expect(filtered.last() === b).toBe(true);
    });
});
