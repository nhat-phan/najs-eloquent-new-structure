import 'jest'
import * as NajsBinding from 'najs-binding'
import * as Sinon from 'sinon'
import * as Helper from '../../lib/util/helpers'
import { Model } from '../../lib/model/Model'
import { MemoryDriver } from '../../lib/drivers/memory/MemoryDriver'
import { DriverProvider } from '../../lib/facades/global/DriverProviderFacade'
import { HasOne } from '../../lib/relations/relationships/HasOne'
import { RelationUtilities } from '../../lib/relations/RelationUtilities'
import { RelationNotFoundInNewInstanceError } from '../../lib/errors/RelationNotFoundInNewInstanceError'

DriverProvider.register(MemoryDriver, 'memory', true)

describe('Relation', function() {
  function makeRelation(model: any, name: string) {
    return new HasOne(model, name, {} as any, '', '')
  }

  describe('constructor()', function() {
    it('assigns rootModel, name properties respectively and create default RelationUtilities if not provided', function() {
      const rootModel: any = {}
      const relation = makeRelation(rootModel, 'test')
      expect(relation['rootModel'] === rootModel).toBe(true)
      expect(relation['name']).toEqual('test')
      expect(relation['chains']).toEqual([])
    })
  })

  describe('.targetModel', function() {
    it('calls make() to creates an instance of Target model, then assigns to reuse property "targetModelInstance"', function() {
      const instance: any = {}
      const makeStub = Sinon.stub(NajsBinding, 'make')
      makeStub.returns(instance)

      const relation = makeRelation({}, 'test')
      relation['targetDefinition'] = 'Target'

      expect(relation['targetModel'] === instance).toBe(true)
      expect(makeStub.calledWith('Target')).toBe(true)
      makeStub.resetHistory()

      expect(relation['targetModel'] === instance).toBe(true)
      expect(makeStub.calledWith('Target')).toBe(false)

      makeStub.restore()
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
    it('is chainable, flattens arguments then append to property "chains"', function() {
      const rootModel: any = {}
      const relation = makeRelation(rootModel, 'test')
      expect(relation.with('a', 'b', ['c', 'd']) === relation).toBe(true)
      expect(relation['chains']).toEqual(['a', 'b', 'c', 'd'])
      expect(relation.with(['a', 'e'], 'b', 'f', ['c', 'd']) === relation).toBe(true)
      expect(relation['chains']).toEqual(['a', 'b', 'c', 'd', 'e', 'f'])
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
    it('returns undefined if .isLoaded() returns false', function() {
      const relationData: any = {
        hasData() {
          return false
        },
        getData() {
          return 'anything'
        },
        setData(data: any) {
          return data
        }
      }
      const rootModel: any = {}
      const relation = makeRelation(rootModel, 'test')

      const stub = Sinon.stub(relation, 'isLoaded')
      stub.returns(false)

      const getRelationDataStub = Sinon.stub(relation, 'getRelationData')
      getRelationDataStub.returns(relationData)

      const collectDataStub = Sinon.stub(relation, 'collectData')
      collectDataStub.returns('collected-data')

      const setDataSpy = Sinon.spy(relationData, 'setData')
      const markInverseRelationsToLoadedSpy = Sinon.spy(relation, 'markInverseRelationsToLoaded')

      expect(relation.getData()).toBeUndefined()
      expect(getRelationDataStub.called).toBe(false)
      expect(setDataSpy.called).toBe(false)
      expect(collectDataStub.called).toBe(false)
      expect(markInverseRelationsToLoadedSpy.called).toBe(false)
    })

    it('returns getRelationData().getData() if the relation has data', function() {
      const relationData: any = {
        hasData() {
          return true
        },
        getData() {
          return 'anything'
        },
        setData(data: any) {
          return data
        }
      }
      const rootModel: any = {}
      const relation = makeRelation(rootModel, 'test')

      const stub = Sinon.stub(relation, 'isLoaded')
      stub.returns(true)

      const getRelationDataStub = Sinon.stub(relation, 'getRelationData')
      getRelationDataStub.returns(relationData)

      const collectDataStub = Sinon.stub(relation, 'collectData')
      collectDataStub.returns('collected-data')

      const setDataSpy = Sinon.spy(relationData, 'setData')
      const markInverseRelationsToLoadedSpy = Sinon.spy(relation, 'markInverseRelationsToLoaded')

      expect(relation.getData()).toEqual('anything')
      expect(getRelationDataStub.called).toBe(true)
      expect(setDataSpy.called).toBe(false)
      expect(collectDataStub.called).toBe(false)
      expect(markInverseRelationsToLoadedSpy.called).toBe(false)
    })

    it('calls .collectData(), then RelationData.setData() then calls and returns .markInverseRelationsToLoaded()', function() {
      const relationData: any = {
        hasData() {
          return false
        },
        getData() {
          return 'anything'
        },
        setData(data: any) {
          return data
        }
      }
      const rootModel: any = {}
      const relation = makeRelation(rootModel, 'test')

      const stub = Sinon.stub(relation, 'isLoaded')
      stub.returns(true)

      const getRelationDataStub = Sinon.stub(relation, 'getRelationData')
      getRelationDataStub.returns(relationData)

      const collectDataStub = Sinon.stub(relation, 'collectData')
      collectDataStub.returns('collected-data')

      const setDataSpy = Sinon.spy(relationData, 'setData')
      const markInverseRelationsToLoadedSpy = Sinon.spy(relation, 'markInverseRelationsToLoaded')

      expect(relation.getData()).toEqual('collected-data')
      expect(getRelationDataStub.called).toBe(true)
      expect(setDataSpy.calledWith('collected-data')).toBe(true)
      expect(collectDataStub.called).toBe(true)
      expect(markInverseRelationsToLoadedSpy.calledWith('collected-data')).toBe(true)
    })
  })

  describe('.lazyLoad()', function() {
    it('calls and return .loadData() with type = "lazy"', async function() {
      const rootModel: any = {}
      const relation = makeRelation(rootModel, 'test')
      const stub = Sinon.stub(relation, 'loadData' as any)
      stub.returns('anything')

      const result = await relation.lazyLoad()
      expect(result).toEqual('anything')
      expect(stub.calledWith('lazy')).toBe(true)
    })
  })

  describe('.eagerLoad()', function() {
    it('calls and return .loadData() with type = "eager"', async function() {
      const rootModel: any = {}
      const relation = makeRelation(rootModel, 'test')
      const stub = Sinon.stub(relation, 'loadData' as any)
      stub.returns('anything')

      const result = await relation.eagerLoad()
      expect(result).toEqual('anything')
      expect(stub.calledWith('eager')).toBe(true)
    })
  })

  describe('.markInverseRelationsToLoaded()', function() {
    // TODO: implementation needed
    it('does nothing for now', function() {
      const rootModel: any = {}
      const relation = makeRelation(rootModel, 'test')
      relation.markInverseRelationsToLoaded({})
    })
  })

  describe('.loadData()', function() {
    it('always sets load type to relationData', async function() {
      const relationData: any = {
        setLoadType() {
          return this
        },

        setData() {}
      }
      const rootModel: any = {}

      const relation = makeRelation(rootModel, 'test')

      const markLoadedInDataBucketStub = Sinon.stub(RelationUtilities, 'markLoadedInDataBucket')
      markLoadedInDataBucketStub.returns('anything')

      const getRelationDataStub = Sinon.stub(relation, 'getRelationData')
      getRelationDataStub.returns(relationData)

      const spy = Sinon.spy(relationData, 'setLoadType')

      const fetchDataStub = Sinon.stub(relation, 'fetchData')
      fetchDataStub.returns('anything')

      await relation.lazyLoad()
      expect(spy.calledWith('lazy')).toBe(true)
      spy.resetHistory()

      await relation.eagerLoad()
      expect(spy.calledWith('eager')).toBe(true)
      markLoadedInDataBucketStub.restore()
    })

    it('calls .fetchData() to get result, then calls and returns .loadChains(result)', async function() {
      const relationData: any = {
        setLoadType() {
          return this
        },

        setData() {}
      }
      const rootModel: any = {}

      const relation = makeRelation(rootModel, 'test')

      const markLoadedInDataBucketStub = Sinon.stub(RelationUtilities, 'markLoadedInDataBucket')
      markLoadedInDataBucketStub.returns('anything')

      const getRelationDataStub = Sinon.stub(relation, 'getRelationData')
      getRelationDataStub.returns(relationData)

      const fetchDataStub = Sinon.stub(relation, 'fetchData')
      fetchDataStub.returns('anything')

      const loadChainsStub = Sinon.stub(relation, 'loadChains' as any)
      loadChainsStub.returns('modified')

      expect(await relation.lazyLoad()).toEqual('modified')
      markLoadedInDataBucketStub.restore()
    })

    it('call RelationData.setData() if the load type is "lazy", calls RelationUtilities.markLoadedInDataBucket() if type is "eager"', async function() {
      const relationData: any = {
        setLoadType() {
          return this
        },

        setData() {}
      }
      const rootModel: any = {}

      const relation = makeRelation(rootModel, 'test')

      const markLoadedInDataBucketStub = Sinon.stub(RelationUtilities, 'markLoadedInDataBucket')
      markLoadedInDataBucketStub.returns('anything')

      const getRelationDataStub = Sinon.stub(relation, 'getRelationData')
      getRelationDataStub.returns(relationData)

      const spy = Sinon.spy(relationData, 'setData')

      const fetchDataStub = Sinon.stub(relation, 'fetchData')
      fetchDataStub.returns('anything')

      await relation.lazyLoad()
      expect(spy.calledWith('anything')).toBe(true)
      expect(markLoadedInDataBucketStub.called).toBe(false)
      spy.resetHistory()

      await relation.eagerLoad()
      expect(spy.called).toBe(false)
      expect(markLoadedInDataBucketStub.calledWith(relation, rootModel, 'test')).toBe(true)

      markLoadedInDataBucketStub.restore()
    })
  })

  describe('.loadChains()', function() {
    it('returns result if the result is falsy', async function() {
      const rootModel: any = {}
      const relation = makeRelation(rootModel, 'test')

      const dataset = [false, undefined, 0, '']
      for (const item in dataset) {
        expect((await relation.loadChains(item)) === item).toBe(true)
      }
    })

    it('returns result when the "chains" is undefined or has length = 0', async function() {
      const rootModel: any = {}
      const relation = makeRelation(rootModel, 'test')
      const result = {}

      relation['chains'] = undefined as any
      expect((await relation.loadChains(result)) === result).toBe(true)

      relation['chains'] = []
      expect((await relation.loadChains(result)) === result).toBe(true)
    })

    it('calls Model.load() then returns the result if result is a Model instance', async function() {
      class TestModel extends Model {
        getClassName() {
          return 'TestModel'
        }
      }
      NajsBinding.register(TestModel)

      const rootModel: any = {}
      const relation = makeRelation(rootModel, 'test')

      const result = new TestModel()

      const chains = 'test'
      relation.with(chains)

      const stub = Sinon.stub(result, 'load')
      stub.returns('anything')

      expect((await relation.loadChains(result)) === result).toBe(true)
      expect(stub.calledWith(['test'])).toBe(true)
    })

    it('calls helpers.distinctModelByClassInCollection() then do nothing and returns result if distinctModelByClassInCollection() is empty', async function() {
      const rootModel: any = {}
      const relation = makeRelation(rootModel, 'test')

      const stub = Sinon.stub(Helper, 'distinctModelByClassInCollection')
      stub.returns([])

      const result = {}
      relation.with('chains')
      expect((await relation.loadChains(result)) === result).toBe(true)
      stub.restore()
    })

    it('calls helpers.distinctModelByClassInCollection() then calls and wait all result via Promise.all() and finally returns result', async function() {
      const rootModel: any = {}
      const relation = makeRelation(rootModel, 'test')

      const stub = Sinon.stub(Helper, 'distinctModelByClassInCollection')
      const model1: any = {
        load() {
          return Promise.resolve('1')
        }
      }
      const model2: any = {
        load() {
          return Promise.resolve('2')
        }
      }
      stub.returns([model1, model2])

      const result = {}
      relation.with('chains')

      const spy1 = Sinon.spy(model1, 'load')
      const spy2 = Sinon.spy(model2, 'load')

      expect((await relation.loadChains(result)) === result).toBe(true)
      expect(spy1.calledWith(['chains'])).toBe(true)
      expect(spy2.calledWith(['chains'])).toBe(true)
      stub.restore()
    })
  })

  describe('.load()', function() {
    it('calls and returns this.getData() if the relation is loaded', async function() {
      const rootModel: any = {}
      const relation = makeRelation(rootModel, 'test')

      const isLoadedStub = Sinon.stub(relation, 'isLoaded')
      isLoadedStub.returns(true)

      const getDataStub = Sinon.stub(relation, 'getData')
      getDataStub.returns('get-data-result')

      const getDataBucketStub = Sinon.stub(relation, 'getDataBucket')
      getDataBucketStub.returns({})

      const lazyLoadStub = Sinon.stub(relation, 'lazyLoad')
      lazyLoadStub.returns(Promise.resolve('lazy-load-result'))

      const eagerLoadStub = Sinon.stub(relation, 'eagerLoad')
      eagerLoadStub.returns(Promise.resolve('eager-load-result'))

      expect(await relation.load()).toEqual('get-data-result')
    })

    it('calls and returns this.eagerLoad() if the relation is not loaded and dataBucket is found', async function() {
      const rootModel: any = {}
      const relation = makeRelation(rootModel, 'test')

      const isLoadedStub = Sinon.stub(relation, 'isLoaded')
      isLoadedStub.returns(false)

      const getDataBucketStub = Sinon.stub(relation, 'getDataBucket')
      getDataBucketStub.returns({})

      const lazyLoadStub = Sinon.stub(relation, 'lazyLoad')
      lazyLoadStub.returns(Promise.resolve('lazy-load-result'))

      const eagerLoadStub = Sinon.stub(relation, 'eagerLoad')
      eagerLoadStub.returns(Promise.resolve('eager-load-result'))

      expect(await relation.load()).toEqual('eager-load-result')
    })

    it('calls and returns this.lazyLoad() if the relation is not loaded and dataBucket is NOT found', async function() {
      const rootModel: any = {
        isNew() {
          return false
        }
      }
      const relation = makeRelation(rootModel, 'test')

      const isLoadedStub = Sinon.stub(relation, 'isLoaded')
      isLoadedStub.returns(false)

      const getDataBucketStub = Sinon.stub(relation, 'getDataBucket')
      getDataBucketStub.returns(undefined)

      const lazyLoadStub = Sinon.stub(relation, 'lazyLoad')
      lazyLoadStub.returns(Promise.resolve('lazy-load-result'))

      const eagerLoadStub = Sinon.stub(relation, 'eagerLoad')
      eagerLoadStub.returns(Promise.resolve('eager-load-result'))

      expect(await relation.load()).toEqual('lazy-load-result')
    })

    it('throws an RelationNotFoundInNewInstanceError if the dataBucket NOT found and the model is new instance', async function() {
      const rootModel: any = {
        isNew() {
          return true
        },
        getModelName() {
          return 'ModelName'
        }
      }

      const relation = makeRelation(rootModel, 'test')

      const isLoadedStub = Sinon.stub(relation, 'isLoaded')
      isLoadedStub.returns(false)

      const getDataBucketStub = Sinon.stub(relation, 'getDataBucket')
      getDataBucketStub.returns(undefined)

      const lazyLoadStub = Sinon.stub(relation, 'lazyLoad')
      lazyLoadStub.returns(Promise.resolve('lazy-load-result'))

      const eagerLoadStub = Sinon.stub(relation, 'eagerLoad')
      eagerLoadStub.returns(Promise.resolve('eager-load-result'))

      try {
        await relation.load()
      } catch (error) {
        expect(error).toBeInstanceOf(RelationNotFoundInNewInstanceError)
        return
      }
      expect('should not reach this line').toEqual('hm')
    })
  })
})
