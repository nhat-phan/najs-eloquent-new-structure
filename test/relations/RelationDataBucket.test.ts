import 'jest'
import * as Sinon from 'sinon'
import * as NajsBinding from 'najs-binding'
import { RelationDataBucket } from '../../lib/relations/RelationDataBucket'
import { make_collection } from '../../lib/util/factory'

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

  describe('.add()', function() {
    it('is chainable, it calls this.getRecords() then .put() the record of model to bucket', function() {
      const record = {}
      const model: any = {
        getPrimaryKey() {
          return 'key'
        },
        getRecord() {
          return record
        }
      }

      const collection = make_collection({})

      const dataBucket = new RelationDataBucket()
      const getRecordsStub = Sinon.stub(dataBucket, 'getRecords')
      getRecordsStub.returns(collection)

      expect(dataBucket.add(model) === dataBucket).toBe(true)
      expect(collection.all()).toEqual({
        key: record
      })
    })
  })

  describe('.makeModel()', function() {
    it('uses make() to create model instance then assign the relationDataBucket to it', function() {
      const relationFeature = {
        setDataBucket(model: any, bucket: any) {
          model['relationDataBucket'] = bucket
        }
      }
      const model = {
        getDriver() {
          return {
            getRelationFeature() {
              return relationFeature
            }
          }
        }
      }
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
    it('simply returns .bucket[key] with the key created from RelationFeature.createKeyForDataBucket()', function() {
      const relationFeature = {
        createKeyForDataBucket(model: any) {
          return 'anything'
        }
      }
      const model: any = {
        getDriver() {
          return {
            getRelationFeature() {
              return relationFeature
            }
          }
        }
      }
      const dataBucket = new RelationDataBucket()
      expect(dataBucket.getRecords(model).all()).toEqual({})
      expect(dataBucket.getRecords(model).all()).toEqual({})
    })
  })
})
