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
    describe('.findPivotTableName()', function () {
        it('formats the model name by .formatAttributeName() of each model, then sort and join with _, pluralizes the result', function () {
            const dataset = [
                {
                    a: { name: 'LongNamespace.Is.Okay.Name', formatted: 'NAME' },
                    b: { name: 'LongNamespace.Is.Okay.Book', formatted: 'book' },
                    result: 'book_NAMES'
                },
                {
                    a: { name: 'NajsEloquent.User', formatted: 'user' },
                    b: { name: 'Najs.Role', formatted: 'role' },
                    result: 'role_users'
                },
                {
                    a: { name: 'NajsEloquent.User', formatted: 'user' },
                    b: { name: 'Najs.User', formatted: 'user' },
                    result: 'user_users'
                },
                {
                    a: { name: 'NajsEloquent.Account', formatted: 'account' },
                    b: { name: 'Najs.Company', formatted: 'company' },
                    result: 'account_companies'
                }
            ];
            for (const data of dataset) {
                const a = {
                    formatAttributeName(name) {
                        return data.a.formatted;
                    },
                    getModelName() {
                        return data.a.name;
                    }
                };
                const b = {
                    formatAttributeName(name) {
                        return data.b.formatted;
                    },
                    getModelName() {
                        return data.b.name;
                    }
                };
                const rootModel = {};
                const factory = new RelationshipFactory_1.RelationshipFactory(rootModel, 'test');
                expect(factory.findPivotTableName(a, b)).toEqual(data.result);
                expect(factory.findPivotTableName(b, a)).toEqual(data.result);
            }
        });
    });
    describe('.findPivotReferenceName()', function () {
        it('returns the modelName formatted by .formatAttributeName() with the _id in the end', function () {
            const dataset = [
                { name: 'User', result: 'User_id' },
                { name: 'LongNameSpace.Company', result: 'Company_id' },
                { name: 'LongNameSpace.Anything', result: 'Anything_id' }
            ];
            for (const data of dataset) {
                const model = {
                    formatAttributeName(name) {
                        return 'formatted-' + name;
                    },
                    getModelName() {
                        return data.name;
                    }
                };
                const rootModel = {};
                const factory = new RelationshipFactory_1.RelationshipFactory(rootModel, 'test');
                expect(factory.findPivotReferenceName(model)).toEqual('formatted-' + data.result);
            }
        });
    });
    describe('.belongsToMany()', function () {
        it('creates pivot via .findPivotTableName() if pivot is not found', function () {
            const makeStub = Sinon.stub(NajsBinding, 'make');
            const targetModel = {
                getModelName() {
                    return 'Target';
                },
                formatAttributeName(name) {
                    return name;
                }
            };
            const rootModel = {
                getModelName() {
                    return 'Root';
                },
                formatAttributeName(name) {
                    return name;
                }
            };
            makeStub.returns(targetModel);
            const factory = new RelationshipFactory_1.RelationshipFactory(rootModel, 'test');
            const spy = Sinon.spy(factory, 'findPivotTableName');
            const thisMakeStub = Sinon.stub(factory, 'make');
            factory.belongsToMany('Target', undefined, 'pivot_target_id', 'pivot_root_id', 'id', 'id');
            expect(thisMakeStub.calledWith('NajsEloquent.Relation.Relationship.ManyToMany', [
                'Target',
                'Root_Targets',
                'pivot_target_id',
                'pivot_root_id',
                'id',
                'id'
            ])).toBe(true);
            expect(spy.calledWith(targetModel, rootModel)).toBe(true);
            makeStub.restore();
        });
        it('creates pivotTargetKeyName via .findPivotReferenceName() if pivotTargetKeyName is not found', function () {
            const makeStub = Sinon.stub(NajsBinding, 'make');
            const targetModel = {
                getModelName() {
                    return 'Target';
                },
                formatAttributeName(name) {
                    return name;
                }
            };
            const rootModel = {
                getModelName() {
                    return 'Root';
                },
                formatAttributeName(name) {
                    return name;
                }
            };
            makeStub.returns(targetModel);
            const factory = new RelationshipFactory_1.RelationshipFactory(rootModel, 'test');
            const spy = Sinon.spy(factory, 'findPivotReferenceName');
            const thisMakeStub = Sinon.stub(factory, 'make');
            factory.belongsToMany('Target', 'pivot', undefined, 'pivot_root_id', 'id', 'id');
            expect(thisMakeStub.calledWith('NajsEloquent.Relation.Relationship.ManyToMany', [
                'Target',
                'pivot',
                'Target_id',
                'pivot_root_id',
                'id',
                'id'
            ])).toBe(true);
            expect(spy.calledWith(targetModel)).toBe(true);
            makeStub.restore();
        });
        it('creates pivotRootKeyName via .findPivotReferenceName() if pivotRootKeyName is not found', function () {
            const makeStub = Sinon.stub(NajsBinding, 'make');
            const targetModel = {
                getModelName() {
                    return 'Target';
                },
                formatAttributeName(name) {
                    return name;
                }
            };
            const rootModel = {
                getModelName() {
                    return 'Root';
                },
                formatAttributeName(name) {
                    return name;
                }
            };
            makeStub.returns(targetModel);
            const factory = new RelationshipFactory_1.RelationshipFactory(rootModel, 'test');
            const spy = Sinon.spy(factory, 'findPivotReferenceName');
            const thisMakeStub = Sinon.stub(factory, 'make');
            factory.belongsToMany('Target', 'pivot', 'pivot_target_id', undefined, 'id', 'id');
            expect(thisMakeStub.calledWith('NajsEloquent.Relation.Relationship.ManyToMany', [
                'Target',
                'pivot',
                'pivot_target_id',
                'Root_id',
                'id',
                'id'
            ])).toBe(true);
            expect(spy.calledWith(rootModel)).toBe(true);
            makeStub.restore();
        });
        it('creates targetKeyName via targetModel.getPrimaryKey() if targetKeyName is not found', function () {
            const makeStub = Sinon.stub(NajsBinding, 'make');
            const targetModel = {
                getModelName() {
                    return 'Target';
                },
                formatAttributeName(name) {
                    return name;
                },
                getPrimaryKeyName() {
                    return 'anything';
                }
            };
            const rootModel = {
                getModelName() {
                    return 'Root';
                },
                formatAttributeName(name) {
                    return name;
                }
            };
            makeStub.returns(targetModel);
            const factory = new RelationshipFactory_1.RelationshipFactory(rootModel, 'test');
            const thisMakeStub = Sinon.stub(factory, 'make');
            factory.belongsToMany('Target', 'pivot', 'pivot_target_id', 'pivot_root_id', undefined, 'id');
            expect(thisMakeStub.calledWith('NajsEloquent.Relation.Relationship.ManyToMany', [
                'Target',
                'pivot',
                'pivot_target_id',
                'pivot_root_id',
                'anything',
                'id'
            ])).toBe(true);
            makeStub.restore();
        });
        it('creates rootKeyName via rootModel.getPrimaryKey() if rootKeyName is not found', function () {
            const makeStub = Sinon.stub(NajsBinding, 'make');
            const targetModel = {
                getModelName() {
                    return 'Target';
                },
                formatAttributeName(name) {
                    return name;
                }
            };
            const rootModel = {
                getModelName() {
                    return 'Root';
                },
                formatAttributeName(name) {
                    return name;
                },
                getPrimaryKeyName() {
                    return 'anything';
                }
            };
            makeStub.returns(targetModel);
            const factory = new RelationshipFactory_1.RelationshipFactory(rootModel, 'test');
            const thisMakeStub = Sinon.stub(factory, 'make');
            factory.belongsToMany('Target', 'pivot', 'pivot_target_id', 'pivot_root_id', 'id', undefined);
            expect(thisMakeStub.calledWith('NajsEloquent.Relation.Relationship.ManyToMany', [
                'Target',
                'pivot',
                'pivot_target_id',
                'pivot_root_id',
                'id',
                'anything'
            ])).toBe(true);
            makeStub.restore();
        });
        it('finally returns a ManyToMany relationship', function () {
            const makeStub = Sinon.stub(NajsBinding, 'make');
            const targetModel = {
                getModelName() {
                    return 'Target';
                },
                formatAttributeName(name) {
                    return name;
                }
            };
            const rootModel = {
                getModelName() {
                    return 'Root';
                },
                formatAttributeName(name) {
                    return name;
                }
            };
            makeStub.returns(targetModel);
            const factory = new RelationshipFactory_1.RelationshipFactory(rootModel, 'test');
            const thisMakeStub = Sinon.stub(factory, 'make');
            factory.belongsToMany('Target', 'pivot', 'pivot_target_id', 'pivot_root_id', 'id', 'id');
            expect(thisMakeStub.calledWith('NajsEloquent.Relation.Relationship.ManyToMany', [
                'Target',
                'pivot',
                'pivot_target_id',
                'pivot_root_id',
                'id',
                'id'
            ])).toBe(true);
            makeStub.restore();
        });
    });
});
