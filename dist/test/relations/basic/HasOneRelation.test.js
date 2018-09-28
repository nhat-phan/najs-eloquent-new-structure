"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const HasOneRelation_1 = require("../../../lib/relations/basic/HasOneRelation");
const Relation_1 = require("../../../lib/relations/Relation");
describe('HasOne', function () {
    it('extends Relation and implements Autoload under name "NajsEloquent.Relation.HasOneRelation"', function () {
        const rootModel = {};
        const hasOne = new HasOneRelation_1.HasOneRelation(rootModel, 'test');
        expect(hasOne).toBeInstanceOf(Relation_1.Relation);
        expect(hasOne.getClassName()).toEqual('NajsEloquent.Relation.HasOneRelation');
    });
    describe('.getType()', function () {
        it('returns literal string "HasOne"', function () {
            const rootModel = {};
            const hasOne = new HasOneRelation_1.HasOneRelation(rootModel, 'test');
            expect(hasOne.getType()).toEqual('HasOne');
        });
    });
    describe('.collectData()', function () {
        it('does nothing for now', function () {
            const rootModel = {};
            const hasOne = new HasOneRelation_1.HasOneRelation(rootModel, 'test');
            hasOne.collectData();
        });
    });
    describe('.fetch()', function () {
        it('does nothing for now', function () {
            const rootModel = {};
            const hasOne = new HasOneRelation_1.HasOneRelation(rootModel, 'test');
            hasOne.fetchData('eager');
        });
    });
    describe('.isInverseOf()', function () {
        it('does nothing for now', function () {
            const rootModel = {};
            const hasOne = new HasOneRelation_1.HasOneRelation(rootModel, 'test');
            hasOne.isInverseOf(hasOne);
        });
    });
});
