import 'jest'
import * as Sinon from 'sinon'
import { FeatureBase } from '../../lib/features/FeatureBase'
import { SerializationFeature } from '../../lib/features/SerializationFeature'
import { SerializationPublicApi } from '../../lib/features/mixin/SerializationPublicApi'
import { SettingFeature } from '../../lib/features/SettingFeature'

describe('SerializationFeature', function() {
  const serializationFeature = new SerializationFeature()

  it('extends FeatureBase, implements Najs.Contracts.Autoload under name NajsEloquent.Feature.SerializationFeature', function() {
    expect(serializationFeature).toBeInstanceOf(FeatureBase)
    expect(serializationFeature.getClassName()).toEqual('NajsEloquent.Feature.SerializationFeature')
  })

  describe('.attachPublicApi()', function() {
    it('simply assigns all functions in SerializationPublicApi to the prototype', function() {
      const prototype = {}

      serializationFeature.attachPublicApi(prototype, [{}], <any>{})
      for (const name in SerializationPublicApi) {
        expect(prototype[name] === SerializationPublicApi[name]).toBe(true)
      }
    })
  })

  describe('.getFeatureName()', function() {
    it('returns literally string "Serialization"', function() {
      expect(serializationFeature.getFeatureName()).toEqual('Serialization')
    })
  })

  describe('.getVisible()', function() {
    it('calls and returns SettingFeature.getArrayUniqueSetting() with property "visible", default value []', function() {
      const settingFeature = {
        getArrayUniqueSetting() {
          return 'result'
        }
      }
      const model: any = {
        getDriver() {
          return {
            getSettingFeature() {
              return settingFeature
            }
          }
        }
      }
      const stub = Sinon.stub(settingFeature, 'getArrayUniqueSetting')
      stub.returns('anything')

      expect(serializationFeature.getVisible(model)).toEqual('anything')
      expect(stub.calledWith(model, 'visible', [])).toBe(true)
    })
  })

  describe('.getHidden()', function() {
    it('calls and returns SettingFeature.getArrayUniqueSetting() with property "hidden", default value []', function() {
      const settingFeature = {
        getArrayUniqueSetting() {
          return 'result'
        }
      }
      const model: any = {
        getDriver() {
          return {
            getSettingFeature() {
              return settingFeature
            }
          }
        }
      }
      const stub = Sinon.stub(settingFeature, 'getArrayUniqueSetting')
      stub.returns('anything')

      expect(serializationFeature.getHidden(model)).toEqual('anything')
      expect(stub.calledWith(model, 'hidden', [])).toBe(true)
    })
  })

  describe('.markVisible()', function() {
    it('calls and returns SettingFeature.pushToUniqueArraySetting() with property "visible" and passed param', function() {
      const settingFeature = {
        pushToUniqueArraySetting() {
          return 'result'
        }
      }
      const model: any = {
        getDriver() {
          return {
            getSettingFeature() {
              return settingFeature
            }
          }
        }
      }
      const stub = Sinon.stub(settingFeature, 'pushToUniqueArraySetting')
      stub.returns('anything')

      const keys: any = ['a', ['b', 'c']]
      expect(serializationFeature.markVisible(model, keys)).toEqual('anything')
      expect(stub.calledWith(model, 'visible', keys)).toBe(true)
    })
  })

  describe('.markHidden()', function() {
    it('calls and returns SettingFeature.pushToUniqueArraySetting() with property "hidden" and passed param', function() {
      const settingFeature = {
        pushToUniqueArraySetting() {
          return 'result'
        }
      }
      const model: any = {
        getDriver() {
          return {
            getSettingFeature() {
              return settingFeature
            }
          }
        }
      }
      const stub = Sinon.stub(settingFeature, 'pushToUniqueArraySetting')
      stub.returns('anything')

      const keys: any = ['a', ['b', 'c']]
      expect(serializationFeature.markHidden(model, keys)).toEqual('anything')
      expect(stub.calledWith(model, 'hidden', keys)).toBe(true)
    })
  })

  describe('.isVisible()', function() {
    it('calls and returns SettingFeature.isInWhiteList() with params from .getVisible() and .getHidden()', function() {
      const settingFeature = {
        isInWhiteList() {
          return 'result'
        }
      }
      const model: any = {
        getDriver() {
          return {
            getSettingFeature() {
              return settingFeature
            }
          }
        }
      }
      const getFillableResult = {}
      const getFillableStub = Sinon.stub(serializationFeature, 'getVisible')
      getFillableStub.returns(getFillableResult)

      const getGuardedResult = {}
      const getGuardedStub = Sinon.stub(serializationFeature, 'getHidden')
      getGuardedStub.returns(getGuardedResult)

      const stub = Sinon.stub(settingFeature, 'isInWhiteList')
      stub.returns('anything')

      const keys: any = ['a', ['b', 'c']]

      expect(serializationFeature.isVisible(model, keys)).toEqual('anything')
      expect(getFillableStub.calledWith(model)).toBe(true)
      expect(getGuardedStub.calledWith(model)).toBe(true)
      expect(stub.calledWith(model, keys, getFillableResult, getGuardedResult)).toBe(true)

      getFillableStub.restore()
      getGuardedStub.restore()
    })
  })

  describe('.isHidden()', function() {
    it('calls and returns SettingFeature.isInBlackList() with params from and .getHidden()', function() {
      const settingFeature = {
        isInBlackList() {
          return 'result'
        }
      }
      const model: any = {
        getDriver() {
          return {
            getSettingFeature() {
              return settingFeature
            }
          }
        }
      }

      const getGuardedResult = {}
      const getGuardedStub = Sinon.stub(serializationFeature, 'getHidden')
      getGuardedStub.returns(getGuardedResult)

      const stub = Sinon.stub(settingFeature, 'isInBlackList')
      stub.returns('anything')

      const keys: any = ['a', ['b', 'c']]

      expect(serializationFeature.isHidden(model, keys)).toEqual('anything')
      expect(getGuardedStub.calledWith(model)).toBe(true)
      expect(stub.calledWith(model, keys, getGuardedResult)).toBe(true)

      getGuardedStub.restore()
    })
  })

  describe('.toObject()', function() {
    it('calls and returns RecordManager.toObject()', function() {
      const result = {}
      const model: any = {
        getDriver() {
          return {
            getRecordManager() {
              return {
                toObject() {
                  return result
                }
              }
            }
          }
        }
      }

      expect(serializationFeature.toObject(model) === result).toBe(true)
    })
  })

  describe('.toJson()', function() {
    const dataset = [
      {
        data: { a: 1, b: 2, c: 3, d: 4 },
        visible: [],
        hidden: [],
        result: { a: 1, b: 2, c: 3, d: 4 }
      },
      {
        data: { a: 1, b: 2, c: 3, d: 4 },
        visible: [],
        hidden: ['a'],
        result: { b: 2, c: 3, d: 4 }
      },
      {
        data: { a: 1, b: 2, c: 3, d: 4 },
        visible: ['a', 'b'],
        hidden: [],
        result: { a: 1, b: 2 }
      },
      {
        data: { a: 1, b: 2, c: 3, d: 4 },
        visible: ['a', 'c'],
        hidden: ['b'],
        result: { a: 1, c: 3 }
      }
    ]

    for (const item of dataset) {
      it('gets data from .toObject(), and filter data if the attribute name matches SettingFeature.isKeyInWhiteList()', function() {
        const data = item.data
        const model: any = {
          getDriver() {
            return {
              getSettingFeature() {
                return new SettingFeature()
              },
              getRecordManager() {
                return {
                  toObject() {
                    return data
                  },
                  getKnownAttributes() {
                    return []
                  }
                }
              }
            }
          }
        }

        const getVisibleResult = item.visible
        const getVisibleStub = Sinon.stub(serializationFeature, 'getVisible')
        getVisibleStub.returns(getVisibleResult)

        const getHiddenResult = item.hidden
        const getHiddenStub = Sinon.stub(serializationFeature, 'getHidden')
        getHiddenStub.returns(getHiddenResult)

        expect(serializationFeature.toJson(model)).toEqual(item.result)

        getVisibleStub.restore()
        getHiddenStub.restore()
      })
    }
  })
})
