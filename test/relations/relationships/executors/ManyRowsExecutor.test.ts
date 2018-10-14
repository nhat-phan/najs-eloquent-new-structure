import 'jest'
import * as Sinon from 'sinon'
import { ManyRowsExecutor } from '../../../../lib/relations/relationships/executors/ManyRowsExecutor'
import { isCollection } from '../../../../lib/util/helpers'

describe('ManyRowsExecutor', function() {
  describe('constructor()', function() {
    it('takes dataBucket and targetModel and assigns to the properties "dataBucket", "targetModel" respectively', function() {
      const dataBucket: any = {}
      const targetModel: any = {}
      const executor = new ManyRowsExecutor(dataBucket, targetModel)
      expect(executor['dataBucket'] === dataBucket).toBe(true)
      expect(executor['targetModel'] === targetModel).toBe(true)
    })
  })

  describe('.executeCollector()', function() {
    it('calls collector.exec(), then create a Collection by DataBucket.makeCollection() with the result', function() {
      const collector: any = {
        exec() {}
      }
      const execStub = Sinon.stub(collector, 'exec')

      const itemOne = {}
      const itemTwo = {}
      const result = [itemOne, itemTwo]
      execStub.returns(result)

      const dataBucket: any = {
        makeCollection(target: any, data: any) {
          return data
        }
      }
      const targetModel: any = {}
      const executor = new ManyRowsExecutor(dataBucket, targetModel)

      const spy = Sinon.spy(dataBucket, 'makeCollection')

      expect((executor.executeCollector(collector) as any) === result).toBe(true)
      expect(execStub.calledWith()).toBe(true)
      expect(spy.calledWith(targetModel, [itemOne, itemTwo])).toBe(true)
    })
  })

  describe('.executeQuery()', function() {
    it('simply calls and returns query.get()', async function() {
      const dataBucket: any = {}
      const targetModel: any = {}
      const executor = new ManyRowsExecutor(dataBucket, targetModel)
      const query: any = {
        async get() {
          return 'anything'
        }
      }
      expect(await executor.executeQuery(query)).toBe('anything')
    })
  })

  describe('.getEmptyValue()', function() {
    it('returns empty collection', function() {
      const dataBucket: any = {}
      const targetModel: any = {}
      const executor = new ManyRowsExecutor(dataBucket, targetModel)
      expect(isCollection(executor.getEmptyValue())).toBe(true)
    })
  })
})
