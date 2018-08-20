"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const Sinon = require("sinon");
const Model_1 = require("../../../lib/model/Model");
const MongodbModel_1 = require("../../../lib/drivers/mongodb/MongodbModel");
const MongodbQueryBuilder_1 = require("../../../lib/drivers/mongodb/MongodbQueryBuilder");
const PrototypeManager_1 = require("../../../lib/util/PrototypeManager");
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
    it('should not be discovered by RelationFinder', function () {
        expect(PrototypeManager_1.PrototypeManager.shouldFindRelationsIn(MongodbModel_1.MongodbModel.prototype)).toBe(false);
    });
    describe('.newQuery()', function () {
        it('returns an instance of MongodbQueryBuilder', function () {
            const model = new User();
            expect(model.newQuery()).toBeInstanceOf(MongodbQueryBuilder_1.MongodbQueryBuilder);
        });
    });
    describe('.getNativeCollection()', function () {
        it('calls and returns .newQuery().collection()', function () {
            const collection = {};
            const fakeQuery = {
                collection() {
                    return collection;
                }
            };
            const model = new User();
            const newQueryStub = Sinon.stub(model, 'newQuery');
            newQueryStub.returns(fakeQuery);
            expect(model.getNativeCollection() === collection).toBe(true);
        });
    });
});
