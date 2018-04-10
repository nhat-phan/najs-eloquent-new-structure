"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const Sinon = require("sinon");
const NajsBinding = require("najs-binding");
const EloquentComponentProviderFacade_1 = require("../../lib/facades/global/EloquentComponentProviderFacade");
describe('ComponentProvider', function () {
    describe('.register()', function () {
        it('calls NajsBinding.register() for the component if it is a function', function () {
            expect(EloquentComponentProviderFacade_1.EloquentComponentProvider['components']).toEqual({});
            const registerSpy = Sinon.spy(NajsBinding, 'register');
            class Test {
            }
            Test.className = 'Test';
            EloquentComponentProviderFacade_1.EloquentComponentProvider.register(Test, 'test');
            expect(EloquentComponentProviderFacade_1.EloquentComponentProvider['components']).toEqual({
                test: {
                    className: 'Test',
                    isDefault: false,
                    index: 0
                }
            });
            expect(registerSpy.calledWith(Test)).toBe(true);
            registerSpy.restore();
        });
        it('adds to "components" with the index is current count of Components, isDefault = false if not passed', function () {
            EloquentComponentProviderFacade_1.EloquentComponentProvider.register('NewComponent', 'new', true);
            expect(EloquentComponentProviderFacade_1.EloquentComponentProvider['components']).toEqual({
                test: {
                    className: 'Test',
                    isDefault: false,
                    index: 0
                },
                new: {
                    className: 'NewComponent',
                    isDefault: true,
                    index: 1
                }
            });
        });
    });
    describe('.bind()', function () {
        it('auto creates an array for model if the there is no key in "binding"', function () {
            expect(EloquentComponentProviderFacade_1.EloquentComponentProvider['binding']).toEqual({});
            EloquentComponentProviderFacade_1.EloquentComponentProvider.bind('Model', 'test');
            expect(EloquentComponentProviderFacade_1.EloquentComponentProvider['binding']).toEqual({
                Model: ['test']
            });
        });
        it('pushes the component name to the "binding"[Model] array', function () {
            EloquentComponentProviderFacade_1.EloquentComponentProvider.bind('Model', 'a');
            expect(EloquentComponentProviderFacade_1.EloquentComponentProvider['binding']).toEqual({
                Model: ['test', 'a']
            });
        });
        it('auto removes duplicated components', function () {
            EloquentComponentProviderFacade_1.EloquentComponentProvider.bind('Model', 'a');
            expect(EloquentComponentProviderFacade_1.EloquentComponentProvider['binding']).toEqual({
                Model: ['test', 'a']
            });
            EloquentComponentProviderFacade_1.EloquentComponentProvider.bind('Model', 'b');
            expect(EloquentComponentProviderFacade_1.EloquentComponentProvider['binding']).toEqual({
                Model: ['test', 'a', 'b']
            });
            EloquentComponentProviderFacade_1.EloquentComponentProvider.bind('Model', 'b');
            expect(EloquentComponentProviderFacade_1.EloquentComponentProvider['binding']).toEqual({
                Model: ['test', 'a', 'b']
            });
        });
    });
    describe('.resolve()', function () {
        it('throws ReferenceError if the component name is not register yet', function () {
            try {
                EloquentComponentProviderFacade_1.EloquentComponentProvider.resolve('not-found', {}, {});
            }
            catch (error) {
                expect(error).toBeInstanceOf(ReferenceError);
                expect(error.message).toEqual('Component "not-found" is not found.');
                return;
            }
            expect('Should not reach this line').toEqual('Hmm');
        });
        it('calls NajsBinding.make() with model and driver in param', function () {
            const makeSpy = Sinon.spy(NajsBinding, 'make');
            const model = {};
            const driver = {};
            EloquentComponentProviderFacade_1.EloquentComponentProvider.resolve('test', model, driver);
            expect(makeSpy.calledWith('Test', [model, driver]));
            makeSpy.restore();
        });
    });
    describe('.getComponents()', function () {
        it('returns all components which has .isDefault = true if the model is not passed', function () {
            EloquentComponentProviderFacade_1.EloquentComponentProvider['components'] = {
                a: { className: 'A', isDefault: true, index: 2 },
                b: { className: 'B', isDefault: false, index: 0 },
                c: { className: 'C', isDefault: true, index: 1 }
            };
            expect(EloquentComponentProviderFacade_1.EloquentComponentProvider.getComponents()).toEqual(['c', 'a']);
        });
        it('pushes binding components to the list if there is config of model in "binding"', function () {
            EloquentComponentProviderFacade_1.EloquentComponentProvider['components'] = {
                a: { className: 'A', isDefault: true, index: 2 },
                b: { className: 'B', isDefault: false, index: 0 },
                c: { className: 'C', isDefault: true, index: 1 },
                d: { className: 'D', isDefault: false, index: 3 }
            };
            EloquentComponentProviderFacade_1.EloquentComponentProvider['binding'] = {
                Test: ['d']
            };
            expect(EloquentComponentProviderFacade_1.EloquentComponentProvider.getComponents('Test')).toEqual(['c', 'a', 'd']);
            expect(EloquentComponentProviderFacade_1.EloquentComponentProvider.getComponents('NotFound')).toEqual(['c', 'a']);
        });
        it('always sort the result by the component index', function () {
            EloquentComponentProviderFacade_1.EloquentComponentProvider['components'] = {
                a: { className: 'A', isDefault: true, index: 2 },
                b: { className: 'B', isDefault: true, index: 0 },
                c: { className: 'C', isDefault: true, index: 1 },
                d: { className: 'D', isDefault: true, index: 3 }
            };
            expect(EloquentComponentProviderFacade_1.EloquentComponentProvider.getComponents()).toEqual(['b', 'c', 'a', 'd']);
        });
    });
    describe('.proxify()', function () {
        it('calls .getComponents(), calls .getModelComponentName() and merge them together', function () {
            EloquentComponentProviderFacade_1.EloquentComponentProvider.proxify({}, {});
        });
    });
});
