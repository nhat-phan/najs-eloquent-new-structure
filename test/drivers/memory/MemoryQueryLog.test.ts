import 'jest'
import * as Sinon from 'sinon'
import { MemoryQueryLog } from '../../../lib/drivers/memory/MemoryQueryLog'
import { QueryLogBase } from '../../../lib/drivers/QueryLogBase'

describe('MemoryQueryLog', function() {
  it('extends QueryLogBase', function() {
    const logger = new MemoryQueryLog()
    expect(logger).toBeInstanceOf(QueryLogBase)
  })

  describe('.getDefaultData()', function() {
    it('simply calls and returns .getEmptyData()', function() {
      const logger = new MemoryQueryLog()
      const stub = Sinon.stub(logger, 'getEmptyData')
      stub.returns('anything')

      expect(logger.getDefaultData()).toEqual('anything')
    })
  })

  describe('.dataSource()', function() {
    it('assigns the className of DataSource class to dataSource property', function() {
      const logger = new MemoryQueryLog()
      const dataSource: any = {
        getClassName() {
          return 'anything'
        }
      }
      expect(logger.dataSource(dataSource) === logger).toBe(true)
      expect(logger['data']['dataSource']).toEqual('anything')
    })
  })
})
