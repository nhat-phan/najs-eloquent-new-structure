import 'jest'
import { FeatureBase } from '../../lib/features/FeatureBase'
import { RelationFeature } from '../../lib/features/RelationFeature'
import { RelationDataBucket } from '../../lib/relations/RelationDataBucket'

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
    it('returns an empty object', function() {
      expect(feature.getPublicApi()).toEqual({})
    })
  })

  describe('.makeDataBucket()', function() {
    it('simply returns an instance of RelationDataBucket', function() {
      const model: any = {}
      expect(feature.makeDataBucket(model)).toBeInstanceOf(RelationDataBucket)
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
})
