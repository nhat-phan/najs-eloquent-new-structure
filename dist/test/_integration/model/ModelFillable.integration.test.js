"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const najs_binding_1 = require("najs-binding");
const Model_1 = require("../../../lib/model/Model");
const MemoryDriver_1 = require("../../../lib/drivers/memory/MemoryDriver");
const EloquentDriverProviderFacade_1 = require("../../../lib/facades/global/EloquentDriverProviderFacade");
EloquentDriverProviderFacade_1.EloquentDriverProvider.register(MemoryDriver_1.MemoryDriver, 'memory', true);
describe('Model Fillable Feature', function () {
    describe('No Setting', function () {
        class ModelFillableNoSetting extends Model_1.Model {
            getClassName() {
                return 'ModelFillableNoSetting';
            }
        }
        najs_binding_1.register(ModelFillableNoSetting);
        it('does not allow to .fill() any data because default guarded = ["*"]', function () {
            const model = new ModelFillableNoSetting();
            model.fill({
                a: 1,
                b: 2,
                _test: 3
            });
            expect(model.toObject()).toEqual({});
        });
        it('could add config fillable programmatically via .markFillable()', function () {
            const model = new ModelFillableNoSetting();
            model.markFillable('a', ['b', 'c']).fill({
                a: 1,
                b: 2,
                _test: 3
            });
            expect(model.getFillable()).toEqual(['a', 'b', 'c']);
            expect(model.toObject()).toEqual({ a: 1, b: 2 });
        });
        it('could add config guarded programmatically via .markGuarded()', function () {
            const model = new ModelFillableNoSetting();
            model.markGuarded('a', ['c']).fill({
                a: 1,
                b: 2,
                _test: 3
            });
            expect(model.getGuarded()).toEqual(['a', 'c']);
            expect(model.toObject()).toEqual({ b: 2 });
        });
    });
});
