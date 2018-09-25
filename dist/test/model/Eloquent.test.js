"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const Model_1 = require("../../lib/model/Model");
const Eloquent_1 = require("../../lib/model/Eloquent");
const MemoryDriver_1 = require("../../lib/drivers/memory/MemoryDriver");
const EloquentDriverProviderFacade_1 = require("../../lib/facades/global/EloquentDriverProviderFacade");
const EloquentPublicApi_1 = require("../../lib/model/mixin/EloquentPublicApi");
const EloquentStaticPublicApi_1 = require("../../lib/model/mixin/EloquentStaticPublicApi");
const PrototypeManager_1 = require("../../lib/util/PrototypeManager");
EloquentDriverProviderFacade_1.EloquentDriverProvider.register(MemoryDriver_1.MemoryDriver, 'memory', true);
describe('Eloquent', function () {
    it('extends Model', function () {
        const eloquent = new Eloquent_1.Eloquent();
        expect(eloquent).toBeInstanceOf(Model_1.Model);
    });
    it('should not be discovered by RelationFinder', function () {
        expect(PrototypeManager_1.PrototypeManager.shouldFindRelationsIn(Eloquent_1.Eloquent.prototype)).toBe(false);
    });
    for (const method in EloquentPublicApi_1.EloquentPublicApi) {
        describe(`.${method}()`, function () {
            it(`is provided by EloquentPublicApi.${method}()`, function () {
                expect(Eloquent_1.Eloquent[method] === EloquentPublicApi_1.EloquentPublicApi['method']);
            });
        });
    }
    describe('Static Functions', function () {
        describe('.Class()', function () {
            it('returns it-self, just for better grammar', function () {
                expect(Eloquent_1.Eloquent.Class() === Eloquent_1.Eloquent).toBe(true);
                class ChildEloquent extends Eloquent_1.Eloquent.Class() {
                    getClassName() {
                        return 'ChildEloquent';
                    }
                }
                expect(ChildEloquent.Class() === ChildEloquent).toBe(true);
            });
        });
        for (const method in EloquentStaticPublicApi_1.EloquentStaticPublicApi) {
            describe(`.${method}()`, function () {
                it(`is provided by EloquentStaticPublicApi.${method}()`, function () {
                    expect(Eloquent_1.Eloquent[method] === EloquentStaticPublicApi_1.EloquentStaticPublicApi['method']);
                });
            });
        }
    });
});
