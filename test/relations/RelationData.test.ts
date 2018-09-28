import 'jest'
import { RelationData } from '../../lib/relations/RelationData'

describe('RelationData', function() {
  describe('constructor()', function() {
    it('inits the data with RelationFactory and state = "unload"', function() {
      const factory: any = {}
      const relationData = new RelationData(factory)
      expect(relationData['factory'] === factory).toBe(true)
      expect(relationData['state']).toEqual('unload')
    })
  })

  describe('.getFactory()', function() {
    it('simply returns property "factory"', function() {
      const factory: any = {}
      const relationData = new RelationData(factory)
      expect(relationData.getFactory() === factory).toBe(true)
    })
  })

  describe('.isLoaded()', function() {
    it('returns true if state = "loaded"', function() {
      const factory: any = {}
      const relationData = new RelationData(factory)
      expect(relationData.isLoaded()).toBe(false)
      relationData['state'] = 'loaded'
      expect(relationData.isLoaded()).toBe(true)
    })
  })

  describe('.hasData()', function() {
    it('returns true if state = "collected"', function() {
      const factory: any = {}
      const relationData = new RelationData(factory)
      expect(relationData.hasData()).toBe(false)
      relationData['state'] = 'collected'
      expect(relationData.hasData()).toBe(true)
    })
  })

  describe('.getData()', function() {
    it('simply returns property "data"', function() {
      const factory: any = {}
      const data: any = {}
      const relationData = new RelationData(factory)
      relationData['data'] = data
      expect(relationData.getData() === data).toBe(true)
    })
  })

  describe('.setData()', function() {
    it('sets given value to property "data", sets state to "collected" and returns data', function() {
      const factory: any = {}
      const data: any = {}
      const relationData = new RelationData(factory)
      expect(relationData.setData(data) === data).toBe(true)
      expect(relationData.hasData()).toBe(true)
      expect(relationData['state']).toEqual('collected')
      expect(relationData.getData() === data).toBe(true)
    })
  })

  describe('.getLoadType()', function() {
    it('returns "unknown" if loadType is not found, otherwise returns property loadType', function() {
      const factory: any = {}
      const relationData = new RelationData(factory)
      expect(relationData.getLoadType()).toEqual('unknown')
      relationData.setLoadType('lazy')
      expect(relationData.getLoadType()).toEqual('lazy')
    })
  })

  describe('.setLoadType()', function() {
    it('is chainable, sets given value to property loadType, sets state to "loaded"', function() {
      const factory: any = {}
      const relationData = new RelationData(factory)
      expect(relationData.getLoadType()).toEqual('unknown')
      expect(relationData.setLoadType('eager') === relationData).toBe(true)
      expect(relationData['state']).toEqual('loaded')
      expect(relationData.getLoadType()).toEqual('eager')
    })
  })
})
