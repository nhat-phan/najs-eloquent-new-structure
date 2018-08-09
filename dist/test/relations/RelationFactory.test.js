"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const Sinon = require("sinon");
const NajsBinding = require("najs-binding");
const RelationFactory_1 = require("../../lib/relations/RelationFactory");
describe('RelationFactory', function () {
    describe('constructor()', function () {
        it('assigns rootModel & name from params to properties', function () {
            const rootModel = {};
            const factory = new RelationFactory_1.RelationFactory(rootModel, 'test');
            expect(factory['rootModel'] === rootModel).toBe(true);
            expect(factory['name']).toEqual('test');
        });
    });
    describe('.make()', function () {
        it('creates an relation via make(), then calls modifier if provided', function () {
            const modifierContainer = {
                modifier() { }
            };
            const modifierSpy = Sinon.spy(modifierContainer, 'modifier');
            const makeStub = Sinon.stub(NajsBinding, 'make');
            makeStub.returns('anything');
            const a = {};
            const b = {};
            const rootModel = {};
            const factory = new RelationFactory_1.RelationFactory(rootModel, 'test');
            factory.make('Test', [a, b], modifierContainer.modifier);
            expect(makeStub.calledWith('Test', [rootModel, 'test', a, b])).toBe(true);
            expect(modifierSpy.calledWith('anything')).toBe(true);
            expect(factory['relation']).toEqual('anything');
            makeStub.restore();
        });
        it('does not call modifier if not provided', function () {
            const modifierContainer = {
                modifier() { }
            };
            const modifierSpy = Sinon.spy(modifierContainer, 'modifier');
            const makeStub = Sinon.stub(NajsBinding, 'make');
            makeStub.returns('anything');
            const a = {};
            const b = {};
            const rootModel = {};
            const factory = new RelationFactory_1.RelationFactory(rootModel, 'test');
            factory.make('Test', [a, b]);
            expect(makeStub.calledWith('Test', [rootModel, 'test', a, b])).toBe(true);
            expect(modifierSpy.calledWith('anything')).toBe(false);
            expect(factory['relation']).toEqual('anything');
            makeStub.restore();
        });
        it('just returns the relation if it already exist', function () {
            const modifierContainer = {
                modifier() { }
            };
            const modifierSpy = Sinon.spy(modifierContainer, 'modifier');
            const makeStub = Sinon.stub(NajsBinding, 'make');
            makeStub.returns('anything');
            const a = {};
            const b = {};
            const rootModel = {};
            const factory = new RelationFactory_1.RelationFactory(rootModel, 'test');
            factory.make('Test', [a, b], modifierContainer.modifier);
            factory.make('Test', [a, b], modifierContainer.modifier);
            expect(makeStub.calledOnce).toBe(true);
            expect(modifierSpy.calledOnce).toBe(true);
            expect(factory['relation']).toEqual('anything');
            makeStub.restore();
        });
    });
    describe('.hasOne()', function () {
        it('calls .make() with class "NajsEloquent.Relation.HasOneRelation"', function () {
            const rootModel = {};
            const factory = new RelationFactory_1.RelationFactory(rootModel, 'test');
            const makeStub = Sinon.stub(factory, 'make');
            makeStub.returns('anything');
            expect(factory.hasOne('Test')).toEqual('anything');
            expect(makeStub.calledWith('NajsEloquent.Relation.HasOneRelation', [])).toBe(true);
        });
    });
});
