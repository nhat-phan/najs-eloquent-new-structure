"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const lib_1 = require("../../lib");
const helpers_1 = require("../../lib/util/helpers");
const factory_1 = require("../../lib/util/factory");
describe('isModel', function () {
    it('returns true if the given value is Model instance', function () {
        expect(helpers_1.isModel(0)).toBe(false);
        expect(helpers_1.isModel('test')).toBe(false);
        expect(helpers_1.isModel({})).toBe(false);
        expect(helpers_1.isModel(new Date())).toBe(false);
        expect(helpers_1.isModel(factory_1.make_collection([]))).toBe(false);
        expect(helpers_1.isModel(new lib_1.Model())).toBe(true);
    });
});
describe('isCollection', function () {
    it('returns true if the given value is Collection instance', function () {
        expect(helpers_1.isCollection(0)).toBe(false);
        expect(helpers_1.isCollection('test')).toBe(false);
        expect(helpers_1.isCollection({})).toBe(false);
        expect(helpers_1.isCollection(new Date())).toBe(false);
        expect(helpers_1.isCollection(new lib_1.Model())).toBe(false);
        expect(helpers_1.isCollection(factory_1.make_collection([]))).toBe(true);
    });
});
