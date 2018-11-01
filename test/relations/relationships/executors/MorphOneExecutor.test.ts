import 'jest'
import * as Sinon from 'sinon'
import { HasOneExecutor } from '../../../../lib/relations/relationships/executors/HasOneExecutor'
import { MorphOneExecutor } from '../../../../lib/relations/relationships/executors/MorphOneExecutor'

describe('MorphOneExecutor', function() {
  it('extends HasOneExecutor', function() {
    const dataBucket: any = {}
    const targetModel: any = {}
    const executor = new MorphOneExecutor(dataBucket, targetModel, 'test', 'Value')
    expect(executor).toBeInstanceOf(HasOneExecutor)
  })

  describe('.setCollector()', function() {
    it('adds condition for "targetMorphTypeName" then calls and returns super.setCollector()', function() {
      const dataBucket: any = {}
      const targetModel: any = {}
      const collector: any = {
        filterBy() {}
      }

      const filterBySpy = Sinon.spy(collector, 'filterBy')

      const conditions: any[] = ['a', 'b', 'c']
      const reader: any = {}

      const executor = new MorphOneExecutor(dataBucket, targetModel, 'test', 'Test')
      expect(executor.setCollector(collector, conditions, reader) === executor).toBe(true)

      const filterConditions = filterBySpy.lastCall.args[0]
      expect(filterConditions).toEqual({
        $and: [{ field: 'test', operator: '=', value: 'Test', reader: reader }, 'a', 'b', 'c']
      })
    })
  })

  describe('.setQuery()', function() {
    it('adds condition for "targetMorphTypeName" then calls and returns super.setQuery()', function() {
      const dataBucket: any = {}
      const targetModel: any = {}
      const query: any = {
        where() {}
      }

      const whereSpy = Sinon.spy(query, 'where')

      const executor = new MorphOneExecutor(dataBucket, targetModel, 'test', 'Test')
      expect(executor.setQuery(query) === executor).toBe(true)
      expect(whereSpy.calledWith('test', 'Test')).toBe(true)
    })
  })
})