import 'jest'
import * as Sinon from 'sinon'
import * as NajsBinding from 'najs-binding'
import { EloquentComponentProvider } from '../../lib/facades/global/EloquentComponentProviderFacade'

describe('ComponentProvider', function() {
  describe('.register()', function() {
    it('calls NajsBinding.register() for the component if it is a function', function() {
      expect(EloquentComponentProvider['components']).toEqual({})

      const registerSpy = Sinon.spy(NajsBinding, 'register')
      class Test {
        static className = 'Test'
      }
      EloquentComponentProvider.register(Test, 'test')

      expect(EloquentComponentProvider['components']).toEqual({
        test: {
          className: 'Test',
          isDefault: false,
          index: 0
        }
      })
      expect(registerSpy.calledWith(Test)).toBe(true)

      registerSpy.restore()
    })

    it('adds to "components" with the index is current count of Components, isDefault = false if not passed', function() {
      EloquentComponentProvider.register('NewComponent', 'new', true)
      expect(EloquentComponentProvider['components']).toEqual({
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
      })
    })
  })

  describe('.bind()', function() {
    it('auto creates an array for model if the there is no key in "binding"', function() {
      expect(EloquentComponentProvider['binding']).toEqual({})
      EloquentComponentProvider.bind('Model', 'test')
      expect(EloquentComponentProvider['binding']).toEqual({
        Model: ['test']
      })
    })

    it('pushes the component name to the "binding"[Model] array', function() {
      EloquentComponentProvider.bind('Model', 'a')
      expect(EloquentComponentProvider['binding']).toEqual({
        Model: ['test', 'a']
      })
    })

    it('auto removes duplicated components', function() {
      EloquentComponentProvider.bind('Model', 'a')
      expect(EloquentComponentProvider['binding']).toEqual({
        Model: ['test', 'a']
      })
      EloquentComponentProvider.bind('Model', 'b')
      expect(EloquentComponentProvider['binding']).toEqual({
        Model: ['test', 'a', 'b']
      })
      EloquentComponentProvider.bind('Model', 'b')
      expect(EloquentComponentProvider['binding']).toEqual({
        Model: ['test', 'a', 'b']
      })
    })
  })

  describe('.resolve()', function() {
    it('throws ReferenceError if the component name is not register yet', function() {
      try {
        EloquentComponentProvider.resolve('not-found', <any>{}, <any>{})
      } catch (error) {
        expect(error).toBeInstanceOf(ReferenceError)
        expect(error.message).toEqual('Component "not-found" is not found.')
        return
      }
      expect('Should not reach this line').toEqual('Hmm')
    })

    it('calls NajsBinding.make() with model and driver in param', function() {
      const makeSpy = Sinon.spy(NajsBinding, 'make')
      const model = {}
      const driver = {}
      EloquentComponentProvider.resolve('test', <any>model, <any>driver)
      expect(makeSpy.calledWith('Test', [model, driver]))
      makeSpy.restore()
    })
  })

  describe('.getComponents()', function() {
    it('returns all components which has .isDefault = true if the model is not passed', function() {
      EloquentComponentProvider['components'] = {
        a: { className: 'A', isDefault: true, index: 2 },
        b: { className: 'B', isDefault: false, index: 0 },
        c: { className: 'C', isDefault: true, index: 1 }
      }
      expect(EloquentComponentProvider.getComponents()).toEqual(['c', 'a'])
    })

    it('pushes binding components to the list if there is config of model in "binding"', function() {
      EloquentComponentProvider['components'] = {
        a: { className: 'A', isDefault: true, index: 2 },
        b: { className: 'B', isDefault: false, index: 0 },
        c: { className: 'C', isDefault: true, index: 1 },
        d: { className: 'D', isDefault: false, index: 3 }
      }
      EloquentComponentProvider['binding'] = {
        Test: ['d']
      }
      expect(EloquentComponentProvider.getComponents('Test')).toEqual(['c', 'a', 'd'])
      expect(EloquentComponentProvider.getComponents('NotFound')).toEqual(['c', 'a'])
    })

    it('always sort the result by the component index', function() {
      EloquentComponentProvider['components'] = {
        a: { className: 'A', isDefault: true, index: 2 },
        b: { className: 'B', isDefault: true, index: 0 },
        c: { className: 'C', isDefault: true, index: 1 },
        d: { className: 'D', isDefault: true, index: 3 }
      }
      expect(EloquentComponentProvider.getComponents()).toEqual(['b', 'c', 'a', 'd'])
    })
  })

  describe('.proxify()', function() {
    it('calls .getComponents(), calls .getModelComponentName() and merge them together', function() {
      EloquentComponentProvider.proxify(<any>{}, <any>{})
    })
  })
})
