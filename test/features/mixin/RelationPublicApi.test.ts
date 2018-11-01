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
    },

    isLoadedRelation() {
      return 'isLoadedRelation-result'
    },

    getLoadedRelations() {
      return 'getLoadedRelations-result'
    }
  }

  const model = {
    driver: {
      getRelationFeature() {
        return relationFeature
      }
    }
  }

  describe('.getRelationshipByName()', function() {
    it('calls and returns RelationFeature.findByName()', function() {
      const stub = Sinon.stub(relationFeature, 'findByName')
      stub.returns('anything')

      expect(RelationPublicApi.getRelationshipByName.call(model)).toEqual('anything')
      expect(stub.calledWith(model)).toBe(true)
      stub.restore()
    })
  })

  describe('.defineRelation()', function() {
    it('calls and returns RelationFeature.findDataByName().getFactory()', function() {
      const data = {
        getFactory() {
          return 'anything'
        }
      }
      const stub = Sinon.stub(relationFeature, 'findDataByName')
      stub.returns(data)

      expect(RelationPublicApi.defineRelation.call(model, 'test')).toEqual('anything')
      expect(stub.calledWith(model, 'test')).toBe(true)
      stub.restore()
    })
  })

  describe('.load()', function() {
    it('flattens arguments then runs and returns .getRelationshipByName().load() via Promise.all()', async function() {
      const relations = {
        a: {
          async load() {
            return new Promise(resolve => {
              setTimeout(function() {
                resolve('a')
              }, 20)
            })
          }
        },
        b: {
          async load() {
            return new Promise(resolve => {
              setTimeout(function() {
                resolve('b')
              }, 30)
            })
          }
        },
        c: {
          async load() {
            return new Promise(resolve => {
              setTimeout(function() {
                resolve('c')
              }, 10)
            })
          }
        }
      }
      const stub = Sinon.stub(RelationPublicApi, 'getRelationshipByName')
      stub.callsFake(function(name: string) {
        return relations[name]
      })

      expect(await RelationPublicApi.load(['b'], 'a')).toEqual(['b', 'a'])
      expect(await RelationPublicApi.load(['c'], ['a', 'b'])).toEqual(['c', 'a', 'b'])
    })
  })

  describe('.isLoaded()', function() {
    it('calls and returns RelationFeature.isLoadedRelation()', function() {
      const stub = Sinon.stub(relationFeature, 'isLoadedRelation')
      stub.returns('anything')

      expect(RelationPublicApi.isLoaded.call(model, 'test')).toEqual('anything')
      expect(stub.calledWith(model, 'test')).toBe(true)
      stub.restore()
    })
  })

  describe('.getLoaded()', function() {
    it('calls and returns RelationFeature.getLoadedRelations()', function() {
      const stub = Sinon.stub(relationFeature, 'getLoadedRelations')
      stub.returns('anything')

      expect(RelationPublicApi.getLoaded.call(model)).toEqual('anything')
      expect(stub.calledWith(model)).toBe(true)
      stub.restore()
    })
  })
})
