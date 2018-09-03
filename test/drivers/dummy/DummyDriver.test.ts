import 'jest'
import * as Sinon from 'sinon'
import * as NajsBinding from 'najs-binding'
import { DummyDriver } from '../../../lib/drivers/dummy/DummyDriver'
import { RecordManager } from '../../../lib/drivers/RecordManager'

describe('DummyDriver', function() {
  it('implements Najs.Contracts.Autoload under name NajsEloquent.Driver.DummyDriver', function() {
    const dummyDriver = new DummyDriver()
    expect(dummyDriver.getClassName()).toEqual('NajsEloquent.Driver.DummyDriver')
  })

  describe('constructor()', function() {
    it('creates instance of RecordManager via NajsBinding.make() and assigned to property recordManager', function() {
      const makeSpy = Sinon.spy(NajsBinding, 'make')
      const dummyDriver = new DummyDriver()

      expect(dummyDriver['recordManager']).toBeInstanceOf(RecordManager)
      expect(makeSpy.lastCall.calledWith('NajsEloquent.Feature.RecordManager')).toBe(true)
      makeSpy.restore()
    })
  })

  describe('.getRecordManager()', function() {
    it('simply returns "recordManager" property', function() {
      const recordManager: any = {}
      const dummyDriver = new DummyDriver()
      dummyDriver['recordManager'] = recordManager
      expect(dummyDriver.getRecordManager() === recordManager).toBe(true)
    })
  })

  describe('.makeQuery()', function() {
    it('simply returns an empty object, dummy driver is not support query builder', function() {
      const dummyDriver = new DummyDriver()
      expect(dummyDriver.makeQuery(<any>{})).toEqual({})
    })
  })
})
