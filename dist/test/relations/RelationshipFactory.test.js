"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const Sinon = require("sinon");
const NajsBinding = require("najs-binding");
const RelationshipFactory_1 = require("../../lib/relations/RelationshipFactory");
describe('RelationshipFactory', function () {
    describe('constructor()', function () {
        it('assigns rootModel & name from params to properties', function () {
            const rootModel = {};
            const factory = new RelationshipFactory_1.RelationshipFactory(rootModel, 'test');
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
            const factory = new RelationshipFactory_1.RelationshipFactory(rootModel, 'test');
            factory.make('Test', [a, b], modifierContainer.modifier);
            expect(makeStub.calledWith('Test', [rootModel, 'test', a, b])).toBe(true);
            expect(modifierSpy.calledWith('anything')).toBe(true);
            expect(factory['relationship']).toEqual('anything');
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
            const factory = new RelationshipFactory_1.RelationshipFactory(rootModel, 'test');
            factory.make('Test', [a, b]);
            expect(makeStub.calledWith('Test', [rootModel, 'test', a, b])).toBe(true);
            expect(modifierSpy.calledWith('anything')).toBe(false);
            expect(factory['relationship']).toEqual('anything');
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
            const factory = new RelationshipFactory_1.RelationshipFactory(rootModel, 'test');
            factory.make('Test', [a, b], modifierContainer.modifier);
            factory.make('Test', [a, b], modifierContainer.modifier);
            expect(makeStub.calledOnce).toBe(true);
            expect(modifierSpy.calledOnce).toBe(true);
            expect(factory['relationship']).toEqual('anything');
            makeStub.restore();
        });
    });
    describe('.findForeignKeyName()', function () {
        it('returns ReferencedModel + "Id" which is formatted by ReferencingModel.formatAttributeName()', function () {
            const referencing = {
                formatAttributeName(name) {
                    return name + '<formatted>';
                }
            };
            const dataset = [
                { name: 'Test', output: 'Test_id<formatted>' },
                { name: 'Namespace.Test', output: 'Test_id<formatted>' },
                { name: 'Long.Namespace.Test', output: 'Test_id<formatted>' }
            ];
            for (const data of dataset) {
                const rootModel = {
                    getModelName() {
                        return data.name;
                    }
                };
                const factory = new RelationshipFactory_1.RelationshipFactory(rootModel, 'test');
                const result = factory.findForeignKeyName(referencing, rootModel);
                expect(result).toEqual(data.output);
            }
        });
    });
    describe('.hasOne()', function () {
        it('calls .make() with class "NajsEloquent.Relation.Relationship.HasOne"', function () {
            const rootModel = {
                getPrimaryKeyName() {
                    return 'id';
                }
            };
            const factory = new RelationshipFactory_1.RelationshipFactory(rootModel, 'test');
            const makeStub = Sinon.stub(factory, 'make');
            makeStub.returns('anything');
            const findTargetKeyNameStub = Sinon.stub(factory, 'findForeignKeyName');
            findTargetKeyNameStub.returns('test');
            expect(factory.hasOne('Target', 'target_id', 'id')).toEqual('anything');
            expect(findTargetKeyNameStub.called).toBe(false);
            expect(makeStub.calledWith('NajsEloquent.Relation.Relationship.HasOne', ['Target', 'target_id', 'id'])).toBe(true);
        });
        it('calls .findForeignKeyName() to find targetKey if the targetKey is not found', function () {
            const rootModel = {
                getPrimaryKeyName() {
                    return 'id';
                }
            };
            const targetModel = {
                getModelName() {
                    return 'Target';
                },
                formatAttributeName(name) {
                    return 'found_' + name;
                }
            };
            const makeStub = Sinon.stub(NajsBinding, 'make');
            makeStub.returns(targetModel);
            const factory = new RelationshipFactory_1.RelationshipFactory(rootModel, 'test');
            const factoryMakeStub = Sinon.stub(factory, 'make');
            factoryMakeStub.returns('anything');
            const findTargetKeyNameStub = Sinon.stub(factory, 'findForeignKeyName');
            findTargetKeyNameStub.returns('found_target_id');
            expect(factory.hasOne('Target', undefined, 'id')).toEqual('anything');
            expect(findTargetKeyNameStub.calledWith(targetModel, rootModel)).toBe(true);
            expect(factoryMakeStub.calledWith('NajsEloquent.Relation.Relationship.HasOne', ['Target', 'found_target_id', 'id'])).toBe(true);
            makeStub.restore();
        });
        it('calls .getPrimaryKeyName() to find rootKeyName if the localKey is not found', function () {
            const rootModel = {
                getPrimaryKeyName() {
                    return 'found_id';
                }
            };
            const factory = new RelationshipFactory_1.RelationshipFactory(rootModel, 'test');
            const makeStub = Sinon.stub(factory, 'make');
            makeStub.returns('anything');
            expect(factory.hasOne('Target', 'target_id')).toEqual('anything');
            expect(makeStub.calledWith('NajsEloquent.Relation.Relationship.HasOne', ['Target', 'target_id', 'found_id'])).toBe(true);
        });
    });
    describe('.hasMany()', function () {
        it('calls .make() with class "NajsEloquent.Relation.HasManyRelation"', function () {
            const rootModel = {
                getPrimaryKeyName() {
                    return 'id';
                }
            };
            const factory = new RelationshipFactory_1.RelationshipFactory(rootModel, 'test');
            const makeStub = Sinon.stub(factory, 'make');
            makeStub.returns('anything');
            const findTargetKeyNameStub = Sinon.stub(factory, 'findForeignKeyName');
            findTargetKeyNameStub.returns('test');
            expect(factory.hasMany('Target', 'target_id', 'id')).toEqual('anything');
            expect(findTargetKeyNameStub.called).toBe(false);
            expect(makeStub.calledWith('NajsEloquent.Relation.Relationship.HasMany', ['Target', 'target_id', 'id'])).toBe(true);
        });
        it('calls .findForeignKeyName() to find targetKey if the targetKey is not found', function () {
            const rootModel = {
                getPrimaryKeyName() {
                    return 'id';
                }
            };
            const targetModel = {
                getModelName() {
                    return 'Target';
                },
                formatAttributeName(name) {
                    return 'found_' + name;
                }
            };
            const makeStub = Sinon.stub(NajsBinding, 'make');
            makeStub.returns(targetModel);
            const factory = new RelationshipFactory_1.RelationshipFactory(rootModel, 'test');
            const factoryMakeStub = Sinon.stub(factory, 'make');
            factoryMakeStub.returns('anything');
            const findTargetKeyNameStub = Sinon.stub(factory, 'findForeignKeyName');
            findTargetKeyNameStub.returns('found_target_id');
            expect(factory.hasMany('Target', undefined, 'id')).toEqual('anything');
            expect(findTargetKeyNameStub.calledWith(targetModel, rootModel)).toBe(true);
            expect(factoryMakeStub.calledWith('NajsEloquent.Relation.Relationship.HasMany', ['Target', 'found_target_id', 'id'])).toBe(true);
            makeStub.restore();
        });
        it('calls .getPrimaryKeyName() to find rootKeyName if the localKey is not found', function () {
            const rootModel = {
                getPrimaryKeyName() {
                    return 'found_id';
                }
            };
            const factory = new RelationshipFactory_1.RelationshipFactory(rootModel, 'test');
            const makeStub = Sinon.stub(factory, 'make');
            makeStub.returns('anything');
            expect(factory.hasMany('Target', 'target_id')).toEqual('anything');
            expect(makeStub.calledWith('NajsEloquent.Relation.Relationship.HasMany', ['Target', 'target_id', 'found_id'])).toBe(true);
        });
    });
    describe('.belongsTo()', function () {
        it('calls .make() with class "NajsEloquent.Relation.Relationship.BelongsTo"', function () {
            const rootModel = {
                getPrimaryKeyName() {
                    return 'id';
                }
            };
            const targetModel = {
                getModelName() {
                    return 'Target';
                },
                formatAttributeName(name) {
                    return 'found_' + name;
                }
            };
            const makeStub = Sinon.stub(NajsBinding, 'make');
            makeStub.returns(targetModel);
            const factory = new RelationshipFactory_1.RelationshipFactory(rootModel, 'test');
            const factoryMakeStub = Sinon.stub(factory, 'make');
            factoryMakeStub.returns('anything');
            const findTargetKeyNameStub = Sinon.stub(factory, 'findForeignKeyName');
            findTargetKeyNameStub.returns('test');
            expect(factory.belongsTo('Target', 'id', 'target_id')).toEqual('anything');
            expect(findTargetKeyNameStub.called).toBe(false);
            expect(factoryMakeStub.calledWith('NajsEloquent.Relation.Relationship.BelongsTo', ['Target', 'id', 'target_id'])).toBe(true);
            makeStub.restore();
        });
        it('calls target.getPrimaryKeyName() to find targetKeyName if the targetKey is not found', function () {
            const rootModel = {
                getPrimaryKeyName() {
                    return 'id';
                }
            };
            const targetModel = {
                getPrimaryKeyName() {
                    return 'id';
                },
                getModelName() {
                    return 'Target';
                },
                formatAttributeName(name) {
                    return 'found_' + name;
                }
            };
            const makeStub = Sinon.stub(NajsBinding, 'make');
            makeStub.returns(targetModel);
            const factory = new RelationshipFactory_1.RelationshipFactory(rootModel, 'test');
            const factoryMakeStub = Sinon.stub(factory, 'make');
            factoryMakeStub.returns('anything');
            const findTargetKeyNameStub = Sinon.stub(factory, 'findForeignKeyName');
            findTargetKeyNameStub.returns('test');
            expect(factory.belongsTo('Target', undefined, 'target_id')).toEqual('anything');
            expect(findTargetKeyNameStub.called).toBe(false);
            expect(factoryMakeStub.calledWith('NajsEloquent.Relation.Relationship.BelongsTo', ['Target', 'id', 'target_id'])).toBe(true);
            makeStub.restore();
        });
        it('calls findForeignKeyName() with rootModel & targetModel to find rootKeyName if rootKeyName not found', function () {
            const rootModel = {
                getPrimaryKeyName() {
                    return 'id';
                }
            };
            const targetModel = {
                getPrimaryKeyName() {
                    return 'id';
                },
                getModelName() {
                    return 'Target';
                },
                formatAttributeName(name) {
                    return 'found_' + name;
                }
            };
            const makeStub = Sinon.stub(NajsBinding, 'make');
            makeStub.returns(targetModel);
            const factory = new RelationshipFactory_1.RelationshipFactory(rootModel, 'test');
            const factoryMakeStub = Sinon.stub(factory, 'make');
            factoryMakeStub.returns('anything');
            const findTargetKeyNameStub = Sinon.stub(factory, 'findForeignKeyName');
            findTargetKeyNameStub.returns('test');
            expect(factory.belongsTo('Target', 'id', undefined)).toEqual('anything');
            expect(findTargetKeyNameStub.calledWith(rootModel, targetModel)).toBe(true);
            expect(factoryMakeStub.calledWith('NajsEloquent.Relation.Relationship.BelongsTo', ['Target', 'id', 'test'])).toBe(true);
            makeStub.restore();
        });
    });
});
