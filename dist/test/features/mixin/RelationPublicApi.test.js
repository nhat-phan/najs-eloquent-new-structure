"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const Sinon = require("sinon");
const RelationPublicApi_1 = require("../../../lib/features/mixin/RelationPublicApi");
describe('RelationPublicApi', function () {
    const relationFeature = {
        findByName() {
            return 'findByName-result';
        },
        findDataByName() {
            return 'findDataByName-result';
        }
    };
    const model = {
        driver: {
            getRelationFeature() {
                return relationFeature;
            }
        }
    };
    describe('.getRelationshipByName()', function () {
        it('calls and returns RelationFeature.findByName()', function () {
            const stub = Sinon.stub(relationFeature, 'findByName');
            stub.returns('anything');
            expect(RelationPublicApi_1.RelationPublicApi.getRelationshipByName.call(model)).toEqual('anything');
            expect(stub.calledWith(model)).toBe(true);
            stub.restore();
        });
    });
    describe('.defineRelation()', function () {
        it('calls and returns RelationFeature.findDataByName().getFactory()', function () {
            const data = {
                getFactory() {
                    return 'anything';
                }
            };
            const stub = Sinon.stub(relationFeature, 'findDataByName');
            stub.returns(data);
            expect(RelationPublicApi_1.RelationPublicApi.defineRelation.call(model, 'test')).toEqual('anything');
            expect(stub.calledWith(model, 'test')).toBe(true);
            stub.restore();
        });
    });
    describe('.load()', function () {
        it('flattens arguments then runs and returns .getRelationshipByName().load() via Promise.all()', async function () {
            const relations = {
                a: {
                    async load() {
                        return new Promise(resolve => {
                            setTimeout(function () {
                                resolve('a');
                            }, 20);
                        });
                    }
                },
                b: {
                    async load() {
                        return new Promise(resolve => {
                            setTimeout(function () {
                                resolve('b');
                            }, 30);
                        });
                    }
                },
                c: {
                    async load() {
                        return new Promise(resolve => {
                            setTimeout(function () {
                                resolve('c');
                            }, 10);
                        });
                    }
                }
            };
            const stub = Sinon.stub(RelationPublicApi_1.RelationPublicApi, 'getRelationshipByName');
            stub.callsFake(function (name) {
                return relations[name];
            });
            expect(await RelationPublicApi_1.RelationPublicApi.load(['b'], 'a')).toEqual(['b', 'a']);
            expect(await RelationPublicApi_1.RelationPublicApi.load(['c'], ['a', 'b'])).toEqual(['c', 'a', 'b']);
        });
    });
});
