import 'jest'
import * as Sinon from 'sinon'
import { OneRowExecutor } from '../../../../lib/relations/relationships/executors/OneRowExecutor'

describe('OneRowExecutor', function() {
  describe('constructor()', function() {
    it('takes dataBucket and targetModel and assigns to the properties "dataBucket", "targetModel" respectively', function() {
      const dataBucket: any = {}
      const targetModel: any = {}
      const executor = new OneRowExecutor(dataBucket, targetModel)
      expect(executor['dataBucket'] === dataBucket).toBe(true)
      expect(executor['targetModel'] === targetModel).toBe(true)
    })
  })

  describe('.executeCollector()', function() {
    it('calls collector.limit(1) then exec() and returns undefined if there is no result', function() {
      const collector: any = {
        limit() {},
        exec() {}
      }
      const limitSpy = Sinon.spy(collector, 'limit')
      const execStub = Sinon.stub(collector, 'exec')

      execStub.returns([])
      const dataBucket: any = {}
      const targetModel: any = {}
      const executor = new OneRowExecutor(dataBucket, targetModel)
      expect(executor.executeCollector(collector)).toBeUndefined()
      expect(limitSpy.calledWith(1)).toBe(true)
      expect(execStub.calledWith()).toBe(true)
    })

    it('calls collector.limit(1) then exec(), then create a Model by DataBucket.makeModel() with the first item of result', function() {
      const collector: any = {
        limit() {},
        exec() {}
      }
      const limitSpy = Sinon.spy(collector, 'limit')
      const execStub = Sinon.stub(collector, 'exec')

      const itemOne = {}
      const itemTwo = {}
      execStub.returns([itemOne, itemTwo])

      const dataBucket: any = {
        makeModel(target: any, data: any) {
          return data
        }
      }
      const targetModel: any = {}
      const executor = new OneRowExecutor(dataBucket, targetModel)

      const spy = Sinon.spy(dataBucket, 'makeModel')

      expect(executor.executeCollector(collector) === itemOne).toBe(true)
      expect(limitSpy.calledWith(1)).toBe(true)
      expect(execStub.calledWith()).toBe(true)
      expect(spy.calledWith(targetModel, itemOne)).toBe(true)
    })
  })

  describe('.executeQuery()', function() {
    it('simply calls and returns query.get()', async function() {
      const dataBucket: any = {}
      const targetModel: any = {}
      const executor = new OneRowExecutor(dataBucket, targetModel)
      const query: any = {
        async first() {
          return 'anything'
        }
      }
      expect(await executor.executeQuery(query)).toBe('anything')
    })
  })

  describe('.getEmptyValue()', function() {
    it('returns undefined', function() {
      const dataBucket: any = {}
      const targetModel: any = {}
      const executor = new OneRowExecutor(dataBucket, targetModel)
      expect(executor.getEmptyValue()).toBeUndefined()
    })
  })
})
