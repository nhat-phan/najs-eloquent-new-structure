"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const Sinon = require("sinon");
const EloquentPublicApi_1 = require("../../../lib/model/mixin/EloquentPublicApi");
const EloquentStaticPublicApi_1 = require("../../../lib/model/mixin/EloquentStaticPublicApi");
describe('EloquentStaticPublicApi', function () {
    it('extends EloquentPublicApi', function () {
        for (const name in EloquentPublicApi_1.EloquentPublicApi) {
            expect(EloquentStaticPublicApi_1.EloquentStaticPublicApi[name] === EloquentPublicApi_1.EloquentPublicApi[name]).toBe(true);
        }
    });
    describe('.newQuery()', function () {
        it('creates an instance by Reflect.construct() then calls and returns the instance .newQuery()', function () {
            const instance = {
                newQuery() { }
            };
            const constructStub = Sinon.stub(Reflect, 'construct');
            constructStub.returns(instance);
            const stub = Sinon.stub(instance, 'newQuery');
            stub.returns('anything');
            expect(EloquentStaticPublicApi_1.EloquentStaticPublicApi.newQuery()).toEqual('anything');
            expect(stub.calledWith()).toBe(true);
            stub.resetHistory();
            expect(EloquentStaticPublicApi_1.EloquentStaticPublicApi.newQuery('test')).toEqual('anything');
            expect(stub.calledWith('test')).toBe(true);
            constructStub.restore();
        });
    });
});
