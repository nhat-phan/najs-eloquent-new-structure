import 'jest'
import * as Sinon from 'sinon'
import * as Helpers from '../../../../lib/util/helpers'
import { HasOneExecutor } from '../../../../lib/relations/relationships/executors/HasOneExecutor'
import { MorphOneExecutor } from '../../../../lib/relations/relationships/executors/MorphOneExecutor'

describe('MorphOneExecutor', function() {
  it('extends HasOneExecutor', function() {
    const isModelStub = Sinon.stub(Helpers, 'isModel')
    isModelStub.returns(true)

    const dataBucket: any = {}
    const targetModel: any = {
      getModelName() {
        return 'Test'
      }
    }
    const executor = new MorphOneExecutor(dataBucket, targetModel, 'test')
    expect(executor).toBeInstanceOf(HasOneExecutor)
    isModelStub.restore()
  })

  describe('.setCollector()', function() {
    it('adds condition for "targetMorphTypeName" then calls and returns super.setCollector()', function() {
      const isModelStub = Sinon.stub(Helpers, 'isModel')
      isModelStub.returns(true)

      const dataBucket: any = {}
      const targetModel: any = {
        getModelName() {
          return 'Test'
        }
      }
      const collector: any = {
        filterBy() {}
      }

      const filterBySpy = Sinon.spy(collector, 'filterBy')

      const conditions: any[] = ['a', 'b', 'c']
      const reader: any = {}

      const executor = new MorphOneExecutor(dataBucket, targetModel, 'test')
      expect(executor.setCollector(collector, conditions, reader) === executor).toBe(true)

      const filterConditions = filterBySpy.lastCall.args[0]
      expect(filterConditions).toEqual({
        $and: [{ field: 'test', operator: '=', value: 'Test', reader: reader }, 'a', 'b', 'c']
      })
      isModelStub.restore()
    })
  })

  describe('.setQuery()', function() {
    it('adds condition for "targetMorphTypeName" then calls and returns super.setQuery()', function() {
      const isModelStub = Sinon.stub(Helpers, 'isModel')
      isModelStub.returns(true)

      const dataBucket: any = {}
      const targetModel: any = {
        getModelName() {
          return 'Test'
        }
      }
      const query: any = {
        where() {}
      }

      const whereSpy = Sinon.spy(query, 'where')

      const executor = new MorphOneExecutor(dataBucket, targetModel, 'test')
      expect(executor.setQuery(query) === executor).toBe(true)
      expect(whereSpy.calledWith('test', 'Test')).toBe(true)

      isModelStub.restore()
    })
  })
})
