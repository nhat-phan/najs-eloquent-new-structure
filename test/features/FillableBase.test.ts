import 'jest'
import { FillableFeature } from '../../lib/features/FillableFeature'

describe('FillableBase', function() {
  const featureInstance = new FillableFeature()

  describe('.useSettingFeatureOf()', function() {
    it('is an helper to reduce repetition code. It returns SettingFeature from a driver', function() {
      const feature = {}
      const model: any = {
        getDriver() {
          return {
            getSettingFeature() {
              return feature
            }
          }
        }
      }

      expect(featureInstance.useSettingFeatureOf(model) === feature).toBe(true)
    })
  })

  describe('.useRecordManagerOf()', function() {
    it('is an helper to reduce repetition code. It returns RecordManager from a driver', function() {
      const feature = {}
      const model: any = {
        getDriver() {
          return {
            getRecordManager() {
              return feature
            }
          }
        }
      }

      expect(featureInstance.useRecordManagerOf(model) === feature).toBe(true)
    })
  })

  describe('.useFillableFeatureOf()', function() {
    it('is an helper to reduce repetition code. It returns RecordManager from a driver', function() {
      const feature = {}
      const model: any = {
        getDriver() {
          return {
            getFillableFeature() {
              return feature
            }
          }
        }
      }

      expect(featureInstance.useFillableFeatureOf(model) === feature).toBe(true)
    })
  })

  describe('.useSerializationFeatureOf()', function() {
    it('is an helper to reduce repetition code. It returns RecordManager from a driver', function() {
      const feature = {}
      const model: any = {
        getDriver() {
          return {
            getSerializationFeature() {
              return feature
            }
          }
        }
      }

      expect(featureInstance.useSerializationFeatureOf(model) === feature).toBe(true)
    })
  })
})
