"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const Sinon = require("sinon");
const Model_1 = require("../../../lib/model/Model");
const MongodbModel_1 = require("../../../lib/drivers/mongodb/MongodbModel");
const MongodbQueryBuilder_1 = require("../../../lib/drivers/mongodb/MongodbQueryBuilder");
describe('MongodbModel', function () {
    class User extends MongodbModel_1.MongodbModel {
        getClassName() {
            return 'User';
        }
    }
    it('extends Model', function () {
        const model = new User();
        expect(model).toBeInstanceOf(MongodbModel_1.MongodbModel);
        expect(model).toBeInstanceOf(Model_1.Model);
    });
    describe('.query()', function () {
        it('returns an instance of MongodbQueryBuilder', function () {
            const model = new User();
            expect(model.query()).toBeInstanceOf(MongodbQueryBuilder_1.MongodbQueryBuilder);
        });
    });
    describe('.getNativeCollection()', function () {
        it('calls and returns .query().collection()', function () {
            const collection = {};
            const fakeQuery = {
                collection() {
                    return collection;
                }
            };
            const model = new User();
            const queryStub = Sinon.stub(model, 'query');
            queryStub.returns(fakeQuery);
            expect(model.getNativeCollection() === collection).toBe(true);
        });
    });
});
