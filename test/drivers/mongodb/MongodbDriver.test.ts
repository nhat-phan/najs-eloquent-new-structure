import 'jest'
import * as Sinon from 'sinon'
import * as NajsBinding from 'najs-binding'
import { DriverBase } from '../../../lib/drivers/DriverBase'
import { MongodbDriver } from '../../../lib/drivers/mongodb/MongodbDriver'
import { RecordManager } from '../../../lib/drivers/RecordManager'
import { MongodbQueryBuilder } from '../../../lib/drivers/mongodb/MongodbQueryBuilder'

describe('MongodbDriver', function() {
  it('extends DriverBase, implements Autoload under name "NajsEloquent.Driver.MongodbDriver"', function() {
    const driver = new MongodbDriver()
    expect(driver).toBeInstanceOf(DriverBase)
    expect(driver.getClassName()).toEqual('NajsEloquent.Driver.MongodbDriver')
  })

  describe('constructor()', function() {
    it('makes RecordManager from "NajsEloquent.Feature.RecordManager" class', function() {
      const makeSpy = Sinon.spy(NajsBinding, 'make')
      const driver = new MongodbDriver()
      expect(makeSpy.lastCall.calledWith('NajsEloquent.Feature.RecordManager')).toBe(true)
      expect(driver['recordManager']).toBeInstanceOf(RecordManager)
      makeSpy.restore()
    })
  })

  describe('.getClassName()', function() {
    it('implements Autoload under name "NajsEloquent.Driver.MongodbDriver"', function() {
      const driver = new MongodbDriver()
      expect(driver.getClassName()).toEqual('NajsEloquent.Driver.MongodbDriver')
    })
  })

  describe('.getRecordManager()', function() {
    it('simply returns property "recordManager"', function() {
      const driver = new MongodbDriver()
      expect(driver.getRecordManager() === driver['recordManager']).toBe(true)
    })
  })

  describe('.newQuery()', function() {
    it('creates and returns an instance of MongodbQueryBuilder every calls', function() {
      const model: any = {
        getRecordName() {
          return 'model'
        }
      }
      const driver = new MongodbDriver()
      const query1 = driver.newQuery(model)
      const query2 = driver.newQuery(model)
      expect(query1 === query2).toBe(false)
      expect(query1).toBeInstanceOf(MongodbQueryBuilder)
    })
  })
})
