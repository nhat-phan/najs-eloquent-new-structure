import 'jest'
import * as Sinon from 'sinon'
import * as NajsBinding from 'najs-binding'
import { RelationDataBucket } from '../../lib/relations/RelationDataBucket'

describe('RelationDataBucket', function() {
  it('implements Autoload under name "NajsEloquent.Relation.RelationDataBucket"', function() {
    const dataBucket = new RelationDataBucket()
    expect(dataBucket.getClassName()).toEqual('NajsEloquent.Relation.RelationDataBucket')
  })

  describe('constructor()', function() {
    it('initialize bucket as an empty object', function() {
      const dataBucket = new RelationDataBucket()
      expect(dataBucket['bucket']).toEqual({})
    })
  })

  describe('.gather()', function() {
    it('is chainable, it calls collect.put() and save the record to right bucket', function() {
      const record = {}
      const model: any = {
        getRecordName() {
          return 'name'
        },
        getPrimaryKey() {
          return 'key'
        },
        getRecord() {
          return record
        }
      }

      const dataBucket = new RelationDataBucket()
      expect(dataBucket.gather(model) === dataBucket).toBe(true)
      expect(dataBucket.getRecords(model).all()).toEqual({
        key: record
      })
    })
  })

  describe('.makeModel()', function() {
    it('uses make() to create model instance then assign the relationDataBucket to it', function() {
      const model = {}
      const makeStub = Sinon.stub(NajsBinding, 'make')
      makeStub.returns(model)

      class ModelClass {
        getClassName() {
          return 'ModelClassName'
        }
      }
      const record = {}
      const dataBucket = new RelationDataBucket()
      const result = dataBucket.makeModel(ModelClass as any, record)

      expect(result === model).toBe(true)
      expect(result['relationDataBucket'] === dataBucket).toBe(true)
      expect(makeStub.calledWith('ModelClassName')).toBe(true)
      makeStub.restore()
    })
  })

  describe('.getRecords()', function() {
    it('simply returns .bucket[key] with the key created from .createKeyForModel', function() {
      const model: any = {
        getRecordName() {
          return 'test'
        }
      }
      const dataBucket = new RelationDataBucket()
      expect(dataBucket.getRecords(model).all()).toEqual({})
      expect(dataBucket.getRecords(model).all()).toEqual({})
    })
  })

  describe('.createKeyForModel()', function() {
    it('creates key, then creates an empty collection in bucket if not found and return the key', function() {
      const model: any = {
        getRecordName() {
          return 'test'
        }
      }
      const dataBucket = new RelationDataBucket()
      expect(dataBucket.createKeyForModel(model)).toEqual('test')
      expect(dataBucket.getRecords(model).count()).toBe(0)
      dataBucket.getRecords(model).put('1', 'any')
      expect(dataBucket.getRecords(model).count()).toBe(1)
    })
  })
})
