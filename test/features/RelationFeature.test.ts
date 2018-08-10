import 'jest'
import * as Sinon from 'sinon'
import { FeatureBase } from '../../lib/features/FeatureBase'
import { RelationFeature } from '../../lib/features/RelationFeature'
import { RelationDataBucket } from '../../lib/relations/RelationDataBucket'
import { RelationPublicApi } from '../../lib/features/mixin/RelationPublicApi'
import { RelationData } from '../../lib/relations/RelationData'
import { RelationFactory } from '../../lib/relations/RelationFactory'
import { RelationDefinitionFinder } from '../../lib/relations/RelationDefinitionFinder'

describe('RelationFeature', function() {
  const feature = new RelationFeature()

  it('extends FeatureBase and implements Autoload under name "NajsEloquent.Feature.RelationFeature"', function() {
    expect(feature).toBeInstanceOf(FeatureBase)
    expect(feature.getClassName()).toEqual('NajsEloquent.Feature.RelationFeature')
  })

  describe('.getFeatureName()', function() {
    it('returns literally string "Relation"', function() {
      expect(feature.getFeatureName()).toEqual('Relation')
    })
  })

  describe('.getPublicApi()', function() {
    it('returns an RelationPublicApi object', function() {
      expect(feature.getPublicApi() === RelationPublicApi).toBe(true)
    })
  })

  describe('.makeDataBucket()', function() {
    it('simply returns an instance of RelationDataBucket', function() {
      const model: any = {}
      expect(feature.makeDataBucket(model)).toBeInstanceOf(RelationDataBucket)
    })
  })

  describe('.makeFactory()', function() {
    it('makes and returns an instance of RelationFactory', function() {
      const model: any = {}
      const factory = feature.makeFactory(model, 'test')
      expect(factory).toBeInstanceOf(RelationFactory)
      expect(factory['rootModel'] === model).toBe(true)
      expect(factory['name'] === 'test').toBe(true)
    })
  })

  describe('.getDataBucket()', function() {
    it('simply returns an property "relationDataBucket" of model', function() {
      const relationDataBucket = {}
      const model: any = {
        relationDataBucket: relationDataBucket
      }
      expect(feature.getDataBucket(model) === relationDataBucket).toBe(true)
    })
  })

  describe('.setDataBucket()', function() {
    it('simply sets an property "relationDataBucket" of model', function() {
      const relationDataBucket: any = {}
      const model: any = {}

      feature.setDataBucket(model, relationDataBucket)
      expect(model.relationDataBucket === relationDataBucket).toBe(true)
    })
  })

  describe('.createKeyForDataBucket()', function() {
    it('returns a record name of the Record via .getRecordName()', function() {
      const model: any = {
        getDriver() {
          return {
            getRecordManager() {
              return {
                getRecordName() {
                  return 'anything'
                }
              }
            }
          }
        }
      }

      expect(feature.createKeyForDataBucket(model)).toEqual('anything')
    })
  })

  describe('.getDefinitions()', function() {
    it('simply returns an property "relationDefinitions" of model', function() {
      const relationDefinitions = {}
      const model: any = {
        relationDefinitions: relationDefinitions
      }
      expect(feature.getDefinitions(model) === relationDefinitions).toBe(true)
    })
  })

  describe('.buildDefinitions()', function() {
    it('creates an instance of RelationDefinitionFinder then calls .getDefinitions()', function() {
      const model: any = {}
      const prototype: any = {}
      const bases: any = []
      const stub = Sinon.stub(RelationDefinitionFinder.prototype, 'getDefinitions')
      stub.returns('anything')

      expect(feature.buildDefinitions(model, prototype, bases)).toEqual('anything')
      stub.restore()
    })
  })

  describe('.findByName()', function() {
    it('returns an empty object for now', function() {
      expect(feature.findByName({} as any, 'test')).toEqual({})
    })
  })

  describe('.findDataByName()', function() {
    it('returns an instance if given name is found in "relations" property', function() {
      const data = {}
      const model: any = {
        relations: {
          test: data
        }
      }

      expect(feature.findDataByName(model, 'test') === data).toBe(true)
    })

    it('create an instance of RelationData, then call defineAccessor if name not found in "relations"', function() {
      const model: any = {
        relations: {}
      }
      const makeFactorySpy = Sinon.spy(feature, 'makeFactory')
      const defineAccessorSpy = Sinon.spy(feature, 'defineAccessor')

      expect(feature.findDataByName(model, 'test')).toBeInstanceOf(RelationData)
      expect(makeFactorySpy.calledWith(model, 'test')).toBe(true)
      expect(defineAccessorSpy.calledWith(model, 'test')).toBe(true)
      makeFactorySpy.restore()
      defineAccessorSpy.restore()
    })
  })

  describe('.defineAccessor()', function() {
    it('do nothing for now', function() {
      const model: any = {}
      feature.defineAccessor(model, 'test')
    })
  })
})
