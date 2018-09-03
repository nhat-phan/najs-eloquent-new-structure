import 'jest'
import * as Sinon from 'sinon'
import * as NajsBinding from 'najs-binding'
import { DriverBase } from '../../../lib/drivers/DriverBase'
import { MongooseDriver } from '../../../lib/drivers/mongoose/MongooseDriver'
import { MongooseQueryBuilder } from '../../../lib/drivers/mongoose/MongooseQueryBuilder'
import { MongooseDocumentManager } from '../../../lib/drivers/mongoose/MongooseDocumentManager'

describe('MongooseDriver', function() {
  it('extends DriverBase, implements Autoload under name "NajsEloquent.Driver.MongooseDriver"', function() {
    const driver = new MongooseDriver()
    expect(driver).toBeInstanceOf(DriverBase)
    expect(driver.getClassName()).toEqual('NajsEloquent.Driver.MongooseDriver')
  })

  describe('constructor()', function() {
    it('makes RecordManager from "NajsEloquent.Driver.Mongoose.MongooseDocumentManager" class', function() {
      const makeSpy = Sinon.spy(NajsBinding, 'make')
      const driver = new MongooseDriver()
      expect(makeSpy.lastCall.calledWith('NajsEloquent.Driver.Mongoose.MongooseDocumentManager')).toBe(true)
      expect(driver['documentManager']).toBeInstanceOf(MongooseDocumentManager)
      makeSpy.restore()
    })
  })

  describe('.getClassName()', function() {
    it('implements Autoload under name "NajsEloquent.Driver.MongooseDriver"', function() {
      const driver = new MongooseDriver()
      expect(driver.getClassName()).toEqual('NajsEloquent.Driver.MongooseDriver')
    })
  })

  describe('.getRecordManager()', function() {
    it('simply returns property "documentManager"', function() {
      const driver = new MongooseDriver()
      expect(driver.getRecordManager() === driver['documentManager']).toBe(true)
    })
  })

  describe('.makeQuery()', function() {
    it('creates and returns an instance of MongooseQueryBuilder every calls', function() {
      const model: any = {
        getRecordName() {
          return 'model'
        }
      }
      const driver = new MongooseDriver()
      const query1 = driver.makeQuery(model)
      const query2 = driver.makeQuery(model)
      expect(query1 === query2).toBe(false)
      expect(query1).toBeInstanceOf(MongooseQueryBuilder)
    })
  })
})
