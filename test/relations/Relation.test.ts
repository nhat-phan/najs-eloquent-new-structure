import 'jest'
import * as Sinon from 'sinon'
import { HasOneRelation } from '../../lib/relations/basic/HasOneRelation'
import { RelationUtilities } from '../../lib/relations/RelationUtilities'

describe('Relation', function() {
  function makeRelation(model: any, name: string) {
    return new HasOneRelation(model, name)
  }

  describe('constructor()', function() {
    it('assigns rootModel, name properties respectively and create default RelationUtilities if not provided', function() {
      const rootModel: any = {}
      const relation = makeRelation(rootModel, 'test')
      expect(relation['rootModel'] === rootModel).toBe(true)
      expect(relation['name']).toEqual('test')
      expect(relation['loadChains']).toEqual([])
    })
  })

  describe('.getName()', function() {
    it('simply returns the name property', function() {
      const rootModel: any = {}
      const relation = makeRelation(rootModel, 'test')
      const name: any = {}
      relation['name'] = name
      expect(relation.getName() === name).toBe(true)
    })
  })

  describe('.getRelationData()', function() {
    it('calls and returns RelationFeature.findDataByName()', function() {
      const relationFeature = {
        findDataByName() {
          return 'anything'
        }
      }
      const rootModel: any = {
        getDriver() {
          return {
            getRelationFeature() {
              return relationFeature
            }
          }
        }
      }
      const relation = makeRelation(rootModel, 'test')
      const spy = Sinon.spy(relationFeature, 'findDataByName')

      expect(relation.getRelationData()).toEqual('anything')
      expect(spy.calledWith(rootModel, 'test')).toBe(true)
    })
  })

  describe('.getDataBucket()', function() {
    it('calls and returns RelationFeature.getDataBucket()', function() {
      const relationFeature = {
        getDataBucket() {
          return 'anything'
        }
      }
      const rootModel: any = {
        getDriver() {
          return {
            getRelationFeature() {
              return relationFeature
            }
          }
        }
      }
      const relation = makeRelation(rootModel, 'test')
      const spy = Sinon.spy(relationFeature, 'getDataBucket')

      expect(relation.getDataBucket()).toEqual('anything')
      expect(spy.calledWith(rootModel)).toBe(true)
    })
  })

  describe('.with()', function() {
    it('is chainable, flattens arguments then append to property loadChains', function() {
      const rootModel: any = {}
      const relation = makeRelation(rootModel, 'test')
      expect(relation.with('a', 'b', ['c', 'd']) === relation).toBe(true)
      expect(relation['loadChains']).toEqual(['a', 'b', 'c', 'd'])
      expect(relation.with(['a', 'e'], 'b', 'f', ['c', 'd']) === relation).toBe(true)
      expect(relation['loadChains']).toEqual(['a', 'b', 'c', 'd', 'e', 'f'])
    })
  })

  describe('.isLoaded()', function() {
    it('return true if getRelationData().isLoaded() is true', function() {
      const relationFeature = {
        findDataByName() {
          return {
            isLoaded() {
              return true
            }
          }
        }
      }
      const rootModel: any = {
        getDriver() {
          return {
            getRelationFeature() {
              return relationFeature
            }
          }
        }
      }
      const relation = makeRelation(rootModel, 'test')

      expect(relation.isLoaded()).toBe(true)
    })

    it('return true if RelationUtilities.isLoadedInDataBucket() is true', function() {
      const relationFeature = {
        findDataByName() {
          return {
            isLoaded() {
              return false
            }
          }
        }
      }
      const rootModel: any = {
        getDriver() {
          return {
            getRelationFeature() {
              return relationFeature
            }
          }
        }
      }
      const relation = makeRelation(rootModel, 'test')
      const stub = Sinon.stub(RelationUtilities, 'isLoadedInDataBucket')
      stub.returns(true)

      expect(relation.isLoaded()).toBe(true)
      expect(stub.calledWith(relation, rootModel, 'test')).toBe(true)
      stub.restore()
    })

    it('return false if both case above return false', function() {
      const relationFeature = {
        findDataByName() {
          return {
            isLoaded() {
              return false
            }
          }
        }
      }
      const rootModel: any = {
        getDriver() {
          return {
            getRelationFeature() {
              return relationFeature
            }
          }
        }
      }
      const relation = makeRelation(rootModel, 'test')
      const stub = Sinon.stub(RelationUtilities, 'isLoadedInDataBucket')
      stub.returns(false)

      expect(relation.isLoaded()).toBe(false)
      expect(stub.calledWith(relation, rootModel, 'test')).toBe(true)
      stub.restore()
    })
  })

  describe('.getData()', function() {
    it('does nothing for now', function() {
      const rootModel: any = {}
      const relation = makeRelation(rootModel, 'test')
      relation.getData()
    })
  })

  describe('.load()', function() {
    it('does nothing for now', function() {
      const rootModel: any = {}
      const relation = makeRelation(rootModel, 'test')
      relation.load()
    })
  })
})
