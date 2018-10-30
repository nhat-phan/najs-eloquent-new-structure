import 'jest'
import * as Sinon from 'sinon'
import { HasManyExecutor } from '../../../../lib/relations/relationships/executors/HasManyExecutor'
import { MorphManyExecutor } from '../../../../lib/relations/relationships/executors/MorphManyExecutor'

describe('MorphManyExecutor', function() {
  it('extends HasManyExecutor', function() {
    const dataBucket: any = {}
    const targetModel: any = {}
    const executor = new MorphManyExecutor(dataBucket, targetModel, 'test', 'Value')
    expect(executor).toBeInstanceOf(HasManyExecutor)
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

      const executor = new MorphManyExecutor(dataBucket, targetModel, 'test', 'Test')
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

      const executor = new MorphManyExecutor(dataBucket, targetModel, 'test', 'Test')
      expect(executor.setQuery(query) === executor).toBe(true)
      expect(whereSpy.calledWith('test', 'Test')).toBe(true)
    })
  })
})
