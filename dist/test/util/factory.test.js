"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const factory_1 = require("../../lib/util/factory");
const collect = require('collect.js');
const CollectionPrototype = Object.getPrototypeOf(collect([]));
describe('make_collection()', function () {
    it('makes an instance of collection from collect() of the collect.js library', function () {
        const data = [1, 2, 3];
        const result = factory_1.make_collection(data);
        expect(result.all() === data).toBe(true);
        expect(Object.getPrototypeOf(result) === CollectionPrototype).toBe(true);
    });
    it('maps to convert data and make an instance of collection from the collect.js library', function () {
        const data = [1, 2, 3];
        const result = factory_1.make_collection(data, i => i * 2);
        expect(result.all() === data).toBe(false);
        expect(result.all()).toEqual([2, 4, 6]);
        expect(Object.getPrototypeOf(result) === CollectionPrototype).toBe(true);
    });
});
