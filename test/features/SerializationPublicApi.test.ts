import 'jest'
import * as Sinon from 'sinon'
import { SerializationPublicApi } from '../../lib/features/SerializationPublicApi'

describe('SerializationPublicApi', function() {
  const serializationFeature = {
    getVisible() {
      return 'getVisible-result'
    },
    getHidden() {
      return 'getHidden-result'
    },
    markVisible() {
      return 'markVisible-result'
    },
    markHidden() {
      return 'markHidden-result'
    },
    isVisible() {
      return 'isVisible-result'
    },
    isHidden() {
      return 'isHidden-result'
    },
    toObject() {
      return 'toObject-result'
    },
    toJSON() {
      return 'toJSON-result'
    },
    toJson() {
      return 'toJson-result'
    }
  }

  const model = {
    driver: {
      getSerializationFeature() {
        return serializationFeature
      }
    }
  }

  describe('.getVisible()', function() {
    it('calls and returns SerializationFeature.getVisible()', function() {
      const stub = Sinon.stub(serializationFeature, 'getVisible')
      stub.returns('anything')

      expect(SerializationPublicApi.getVisible.call(model)).toEqual('anything')
      expect(stub.calledWith(model)).toBe(true)
      stub.restore()
    })
  })

  describe('.getHidden()', function() {
    it('calls and returns SerializationFeature.getHidden()', function() {
      const stub = Sinon.stub(serializationFeature, 'getHidden')
      stub.returns('anything')

      expect(SerializationPublicApi.getHidden.call(model)).toEqual('anything')
      expect(stub.calledWith(model)).toBe(true)
      stub.restore()
    })
  })

  describe('.markVisible()', function() {
    it('is chainable, calls SerializationFeature.markVisible()', function() {
      const stub = Sinon.stub(serializationFeature, 'markVisible')
      stub.returns('anything')

      expect(SerializationPublicApi.markVisible.call(model, 'a', 'b') === model).toBe(true)
      expect(stub.calledWith(model)).toBe(true)
      expect(stub.lastCall.args[1][0]).toEqual('a')
      expect(stub.lastCall.args[1][1]).toEqual('b')
      stub.restore()
    })
  })

  describe('.markHidden()', function() {
    it('is chainable, calls SerializationFeature.markHidden()', function() {
      const stub = Sinon.stub(serializationFeature, 'markHidden')
      stub.returns('anything')

      expect(SerializationPublicApi.markHidden.call(model, 'a', 'b') === model).toBe(true)
      expect(stub.calledWith(model)).toBe(true)
      expect(stub.lastCall.args[1][0]).toEqual('a')
      expect(stub.lastCall.args[1][1]).toEqual('b')
      stub.restore()
    })
  })

  describe('.isVisible()', function() {
    it('calls and returns SerializationFeature.isVisible()', function() {
      const stub = Sinon.stub(serializationFeature, 'isVisible')
      stub.returns('anything')

      expect(SerializationPublicApi.isVisible.call(model, 'a', 'b')).toEqual('anything')
      expect(stub.calledWith(model)).toBe(true)
      expect(stub.lastCall.args[1][0]).toEqual('a')
      expect(stub.lastCall.args[1][1]).toEqual('b')
      stub.restore()
    })
  })

  describe('.isHidden()', function() {
    it('calls and returns SerializationFeature.isHidden()', function() {
      const stub = Sinon.stub(serializationFeature, 'isHidden')
      stub.returns('anything')

      expect(SerializationPublicApi.isHidden.call(model, 'a', 'b')).toEqual('anything')
      expect(stub.calledWith(model)).toBe(true)
      expect(stub.lastCall.args[1][0]).toEqual('a')
      expect(stub.lastCall.args[1][1]).toEqual('b')
      stub.restore()
    })
  })

  describe('.toObject()', function() {
    it('calls and returns SerializationFeature.toObject()', function() {
      const stub = Sinon.stub(serializationFeature, 'toObject')
      stub.returns('anything')

      expect(SerializationPublicApi.toObject.call(model)).toEqual('anything')
      expect(stub.calledWith(model)).toBe(true)
      stub.restore()
    })
  })

  describe('.toJSON()', function() {
    it('calls and returns SerializationFeature.toJson()', function() {
      const stub = Sinon.stub(serializationFeature, 'toJson')
      stub.returns('anything')

      expect(SerializationPublicApi.toJSON.call(model)).toEqual('anything')
      expect(stub.calledWith(model)).toBe(true)
      stub.restore()
    })
  })

  describe('.toJson()', function() {
    it('calls and returns SerializationFeature.toJson()', function() {
      const stub = Sinon.stub(serializationFeature, 'toJson')
      stub.returns('anything')

      expect(SerializationPublicApi.toJson.call(model)).toEqual('anything')
      expect(stub.calledWith(model)).toBe(true)
      stub.restore()
    })
  })
})
