import 'jest'
import * as Sinon from 'sinon'
import * as NajsBinding from 'najs-binding'
import { DriverBase } from '../../../lib/drivers/DriverBase'
import { MongodbDriver } from '../../../lib/drivers/mongodb/MongodbDriver'
import { RecordManager } from '../../../lib/drivers/RecordManager'
import { MongodbQueryBuilderFactory } from '../../../lib/drivers/mongodb/MongodbQueryBuilderFactory'

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

  describe('.makeQueryBuilderFactory()', function() {
    it('creates and returns an instance of MongodbQueryBuilderFactory', function() {
      const driver = new MongodbDriver()
      const factory1 = driver.makeQueryBuilderFactory()
      const factory2 = driver.makeQueryBuilderFactory()
      expect(factory1 === factory2).toBe(true)
      expect(factory1).toBeInstanceOf(MongodbQueryBuilderFactory)
    })
  })
})
