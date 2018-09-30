import 'jest'
import * as Sinon from 'sinon'
import { register } from 'najs-binding'
import { Model } from '../../lib/model/Model'
import { EloquentDriverProvider } from '../../lib/facades/global/EloquentDriverProviderFacade'
import { MemoryDriver } from '../../lib/drivers/memory/MemoryDriver'

EloquentDriverProvider.register(MemoryDriver, 'memory', true)

class TestModel extends Model {
  getClassName() {
    return 'TestModel'
  }
}
register(TestModel)

class ModelA extends Model {
  getClassName() {
    return 'ModelA'
  }
}
register(ModelA)

class ModelB extends Model {
  getClassName() {
    return 'ModelB'
  }
}
register(ModelB)

describe('Model', function() {
  it('should works', function() {
    const test = new TestModel()
    test.getDriver()
    test.newQuery()
    try {
      test.newQuery('test')
    } catch (error) {}
  })

  describe('Static Query Methods', function() {
    describe('.newQuery()', function() {
      it('creates an instance of Model then calls and return .newQuery()', function() {
        const newQuerySpy = Sinon.spy(Model.prototype, 'newQuery')

        const queryA = ModelA.newQuery()
        expect(newQuerySpy.calledWith()).toBe(true)
        expect(queryA['handler'].getModel()).toBeInstanceOf(ModelA)
        newQuerySpy.resetHistory()

        const queryB = ModelB.newQuery()
        expect(newQuerySpy.calledWith()).toBe(true)
        expect(queryB['handler'].getModel()).toBeInstanceOf(ModelB)
        newQuerySpy.resetHistory()

        const queryTest = TestModel.newQuery('test')
        expect(newQuerySpy.calledWith('test')).toBe(true)
        expect(queryTest['handler'].getModel()).toBeInstanceOf(TestModel)
        newQuerySpy.resetHistory()

        newQuerySpy.restore()
      })
    })

    describe('.queryName()', function() {
      it('simply calls and returns .newQuery()', function() {
        const spy = Sinon.spy(Model, 'newQuery')

        const queryA = ModelA.queryName('test')
        expect(queryA['handler'].getModel()).toBeInstanceOf(ModelA)
        expect(spy.calledWith('test')).toBe(true)

        spy.restore()
      })
    })

    const methods = [
      'setLogGroup',
      'select',
      'limit',
      'orderBy',
      'orderByAsc',
      'orderByDesc',
      'withTrashed',
      'onlyTrashed',
      'where',
      'whereNot',
      'whereIn',
      'whereNotIn',
      'whereNull',
      'whereNotNull',
      'whereBetween',
      'whereNotBetween'
    ]
    for (const method of methods) {
      describe(`.${method}()`, function() {
        it(`calls .newQuery() then calls .${method}() with original arguments`, function() {
          const query = {
            [method]: function() {
              return 'anything'
            }
          }
          const spy = Sinon.spy(query, method)
          const stub = Sinon.stub(Model, 'newQuery')
          stub.returns(query)

          expect(ModelA[method]()).toEqual('anything')
          expect(spy.calledWith()).toBe(true)
          spy.resetHistory()

          expect(ModelA[method](1)).toEqual('anything')
          expect(spy.calledWith(1)).toBe(true)
          spy.resetHistory()

          expect(ModelA[method](1, 2)).toEqual('anything')
          expect(spy.calledWith(1, 2)).toBe(true)
          spy.resetHistory()

          expect(ModelA[method](1, 2, 3)).toEqual('anything')
          expect(spy.calledWith(1, 2, 3)).toBe(true)
          spy.resetHistory()

          stub.restore()
        })
      })
    }
  })
})