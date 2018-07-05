import 'jest'
import * as Sinon from 'sinon'
import { register } from 'najs-binding'
import { Record } from '../../lib/features/Record'
import { RecordManager } from '../../lib/features/RecordManager'
import { RecordManagerBase } from '../../lib/features/RecordManagerBase'
import { SettingFeature } from './../../lib/features/SettingFeature'

describe('RecordManager', function() {
  const recordManager = new RecordManager()

  it('extends RecordManagerBase and implements Autoload under name "NajsEloquent.Feature.RecordManager"', function() {
    expect(recordManager).toBeInstanceOf(RecordManagerBase)
    expect(recordManager.getClassName()).toEqual('NajsEloquent.Feature.RecordManager')
  })

  describe('.initialize()', function() {
    it('simply assigns the data to model.attributes if data is instance of Record', function() {
      const data = new Record()
      const model: any = {}

      recordManager.initialize(model, true, data)
      expect(model.attributes === data).toBe(true)
    })

    it('creates new Record instance if data not found or not a raw object', function() {
      const modelA: any = {}
      recordManager.initialize(modelA, true)
      expect(modelA.attributes).toBeInstanceOf(Record)

      const modelB: any = {}
      recordManager.initialize(modelB, true, <any>123)
      expect(modelB.attributes).toBeInstanceOf(Record)
    })

    it('creates new Record instance which wrap data if data is a raw object and isGuarded is false', function() {
      const data = {}
      const model: any = {
        fill() {}
      }
      const spy = Sinon.stub(model, 'fill')

      recordManager.initialize(model, false, data)
      expect(model.attributes).toBeInstanceOf(Record)
      expect(model.attributes['data'] === data).toBe(true)
      expect(spy.called).toBe(false)
    })

    it('creates new Record instance and use model.fill() if data is raw object and isGuarded is true', function() {
      const data = {}
      const model: any = {
        fill() {}
      }
      const spy = Sinon.stub(model, 'fill')

      recordManager.initialize(model, true, data)
      expect(model.attributes).toBeInstanceOf(Record)
      expect(model.attributes['data'] === data).toBe(false)
      expect(spy.called).toBe(true)
    })
  })

  describe('.getAttribute()', function() {
    it('calls and returns model.attributes.getAttribute()', function() {
      const model: any = {
        attributes: {
          getAttribute() {
            return 'result'
          }
        }
      }
      const stub = Sinon.stub(model.attributes, 'getAttribute')
      stub.returns('anything')

      expect(recordManager.getAttribute(model, 'test')).toEqual('anything')
      expect(stub.calledWith('test')).toBe(true)
    })
  })

  describe('.setAttribute()', function() {
    it('calls and returns model.attributes.setAttribute()', function() {
      const model: any = {
        attributes: {
          setAttribute() {
            return 'result'
          }
        }
      }
      const stub = Sinon.stub(model.attributes, 'setAttribute')
      stub.returns('anything')

      expect(recordManager.setAttribute(model, 'test', 'value')).toEqual('anything')
      expect(stub.calledWith('test', 'value')).toBe(true)
    })
  })

  describe('.hasAttribute()', function() {
    it('always returns true', function() {
      const model: any = {}
      expect(recordManager.hasAttribute(model, 'a')).toBe(true)
      expect(recordManager.hasAttribute(model, 'b')).toBe(true)
      expect(recordManager.hasAttribute(model, 'c')).toBe(true)
    })
  })

  describe('.getPrimaryKeyName()', function() {
    it('uses SettingFeature.getSettingProperty() with property "primaryKey" and default value = "id"', function() {
      class ModelWithoutCustomPrimaryKey {
        getClassName() {
          return 'ModelWithoutCustomPrimaryKey'
        }

        getDriver() {
          return {
            getSettingFeature() {
              return new SettingFeature()
            }
          }
        }
      }
      register(ModelWithoutCustomPrimaryKey)

      class ModelWithCustomPrimaryKey {
        primaryKey = 'test'

        getClassName() {
          return 'ModelWithCustomPrimaryKey'
        }

        getDriver() {
          return {
            getSettingFeature() {
              return new SettingFeature()
            }
          }
        }
      }
      register(ModelWithCustomPrimaryKey)

      expect(recordManager.getPrimaryKeyName(<any>new ModelWithoutCustomPrimaryKey())).toEqual('id')
      expect(recordManager.getPrimaryKeyName(<any>new ModelWithCustomPrimaryKey())).toEqual('test')
    })
  })

  describe('.toObject()', function() {
    it('calls and returns model.attributes.toObject()', function() {
      const model: any = {
        attributes: {
          toObject() {
            return 'result'
          }
        }
      }
      const stub = Sinon.stub(model.attributes, 'toObject')
      stub.returns('anything')

      expect(recordManager.toObject(model)).toEqual('anything')
      expect(stub.calledWith()).toBe(true)
    })
  })
})
