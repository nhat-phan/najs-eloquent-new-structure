"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const najs_binding_1 = require("najs-binding");
const MongodbConditionMatcherFactory_1 = require("../../../lib/drivers/mongodb/MongodbConditionMatcherFactory");
const MongodbConditionMatcher_1 = require("../../../lib/drivers/mongodb/MongodbConditionMatcher");
describe('MongodbConditionMatcherFactory', function () {
    it('implements Autoload with singleton under name "NajsEloquent.Driver.Mongodb.MongodbConditionMatcherFactory"', function () {
        const factory = najs_binding_1.make(MongodbConditionMatcherFactory_1.MongodbConditionMatcherFactory);
        expect(factory.getClassName()).toEqual('NajsEloquent.Driver.Mongodb.MongodbConditionMatcherFactory');
        const anotherInstance = najs_binding_1.make(MongodbConditionMatcherFactory_1.MongodbConditionMatcherFactory);
        expect(anotherInstance === factory).toBe(true);
    });
    describe('.make()', function () {
        it('simply returns an instance of MongodbConditionMatcher', function () {
            const factory = najs_binding_1.make(MongodbConditionMatcherFactory_1.MongodbConditionMatcherFactory);
            expect(factory.make({ bool: 'and', field: 'test', operator: '=', value: 'any' })).toBeInstanceOf(MongodbConditionMatcher_1.MongodbConditionMatcher);
        });
    });
    describe('.transform()', function () {
        it('calls and returns MongodbConditionMatcher.getCondition()', function () {
            const factory = najs_binding_1.make(MongodbConditionMatcherFactory_1.MongodbConditionMatcherFactory);
            const data = {
                getCondition() {
                    return 'anything';
                }
            };
            expect(factory.transform(data)).toEqual('anything');
        });
    });
});
