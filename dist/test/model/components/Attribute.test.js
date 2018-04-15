"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
// import * as Sinon from 'sinon'
const Eloquent_1 = require("../../../lib/model/Eloquent");
const Attribute_1 = require("../../../lib/model/components/Attribute");
const DummyDriver_1 = require("../../../lib/drivers/DummyDriver");
const EloquentDriverProviderFacade_1 = require("../../../lib/facades/global/EloquentDriverProviderFacade");
const EloquentComponentProviderFacade_1 = require("../../../lib/facades/global/EloquentComponentProviderFacade");
EloquentComponentProviderFacade_1.EloquentComponentProvider.register(Attribute_1.Attribute, 'attribute', true);
EloquentDriverProviderFacade_1.EloquentDriverProvider.register(DummyDriver_1.DummyDriver, 'dummy', true);
describe('Model/Attribute', function () {
    describe('Unit', function () {
        describe('.getClassName()', function () {
            it('implements Najs.Contracts.Autoload and returns "NajsEloquent.Model.Component.Attribute" as class name', function () {
                const attribute = new Attribute_1.Attribute();
                expect(attribute.getClassName()).toEqual('NajsEloquent.Model.Component.Attribute');
            });
        });
        describe('.extend()', function () {
            it('extends the given prototype with 8 functions', function () {
                const functions = [
                    'hasAttribute',
                    'getAttribute',
                    'setAttribute',
                    'getPrimaryKey',
                    'setPrimaryKey',
                    'getPrimaryKeyName'
                ];
                const prototype = {};
                const attribute = new Attribute_1.Attribute();
                attribute.extend(prototype);
                for (const name in functions) {
                    expect(prototype[name] === Attribute_1.Attribute[name]).toBe(true);
                }
            });
        });
    });
    describe('Integration', function () {
        class User extends Eloquent_1.Eloquent {
        }
        User.className = 'User';
        User.fillable = ['first_name', 'last_name'];
        it('should work', function () {
            const user = new User();
            user.setAttribute('test', 'test');
            user.getAttribute('test');
            user.hasAttribute('anything');
            user.hasAttribute('driver');
            user.getPrimaryKey();
            user.setPrimaryKey('test');
            user.getPrimaryKeyName();
        });
    });
});
