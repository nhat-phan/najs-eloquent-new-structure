import 'jest'
import * as Sinon from 'sinon'
import { RelationPublicApi } from '../../../lib/features/mixin/RelationPublicApi'

describe('RelationPublicApi', function() {
  const relationFeature = {
    findByName() {
      return 'findByName-result'
    },

    findDataByName() {
      return 'findDataByName-result'
    }
  }

  const model = {
    driver: {
      getRelationFeature() {
        return relationFeature
      }
    }
  }

  describe('.getRelationByName()', function() {
    it('calls and returns RelationFeature.findByName()', function() {
      const stub = Sinon.stub(relationFeature, 'findByName')
      stub.returns('anything')

      expect(RelationPublicApi.getRelationByName.call(model)).toEqual('anything')
      expect(stub.calledWith(model)).toBe(true)
      stub.restore()
    })
  })

  describe('.defineRelationProperty()', function() {
    it('calls and returns RelationFeature.findDataByName().getFactory()', function() {
      const data = {
        getFactory() {
          return 'anything'
        }
      }
      const stub = Sinon.stub(relationFeature, 'findDataByName')
      stub.returns(data)

      expect(RelationPublicApi.defineRelationProperty.call(model, 'test')).toEqual('anything')
      expect(stub.calledWith(model, 'test')).toBe(true)
      stub.restore()
    })
  })

  describe('.defineRelationAccessor()', function() {
    it('just an alias of .defineRelationProperty()', function() {
      const model: any = {
        defineRelationProperty() {
          return 'anything'
        }
      }
      const spy = Sinon.spy(model, 'defineRelationProperty')

      expect(RelationPublicApi.defineRelationAccessor.call(model, 'test')).toEqual('anything')
      expect(spy.calledWith('test')).toBe(true)
      spy.restore()
    })
  })
})
