import 'jest'
import * as Sinon from 'sinon'
import { FeatureBase } from '../../lib/features/FeatureBase'
import { RelationFeature } from '../../lib/features/RelationFeature'
import { RelationDataBucket } from '../../lib/relations/RelationDataBucket'
import { RelationPublicApi } from '../../lib/features/mixin/RelationPublicApi'
import { RelationData } from '../../lib/relations/RelationData'
import { RelationFactory } from '../../lib/relations/RelationFactory'
import { RelationNotDefinedError } from '../../lib/errors/RelationNotDefinedError'
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
    it('throws a RelationNotDefinedError if the relationDefinitions of model is not found', function() {
      const model: any = {
        getModelName() {
          return 'Test'
        }
      }

      try {
        feature.findByName(model, 'any')
      } catch (error) {
        expect(error).toBeInstanceOf(RelationNotDefinedError)
        expect(error.message).toEqual('Relation any is not defined in model Test.')
        return
      }
      expect('should not reach here').toEqual('hm')
    })

    it('throws a RelationNotDefinedError if the name is not found in relationDefinitions', function() {
      const model: any = {
        relationDefinitions: {
          test: true
        },

        getModelName() {
          return 'Test'
        }
      }

      try {
        feature.findByName(model, 'any')
      } catch (error) {
        expect(error).toBeInstanceOf(RelationNotDefinedError)
        expect(error.message).toEqual('Relation any is not defined in model Test.')
        return
      }
      expect('should not reach here').toEqual('hm')
    })

    it('gets definitions in relationDefinition, then trigger the target type "getter"', function() {
      const relation: any = {}
      const model: any = {
        relationDefinitions: {
          test: {
            accessor: 'test',
            target: 'relation',
            targetType: 'getter'
          }
        },

        get relation() {
          return relation
        }
      }

      expect(feature.findByName(model, 'test') === relation).toBe(true)
    })

    it('gets definitions in relationDefinition, then trigger the target type "function"', function() {
      const relation: any = {}
      const model: any = {
        relationDefinitions: {
          test: {
            accessor: 'test',
            target: 'getRelation',
            targetType: 'function'
          }
        },

        getRelation() {
          return relation
        }
      }

      expect(feature.findByName(model, 'test') === relation).toBe(true)
    })

    it('splits input by dot, and find the relation by first part, then passes the rest to relation.with()', function() {
      const relation: any = {
        with() {}
      }
      const model: any = {
        relationDefinitions: {
          test: {
            accessor: 'test',
            target: 'getRelation',
            targetType: 'function'
          }
        },

        getRelation() {
          return relation
        }
      }

      const withSpy = Sinon.spy(relation, 'with')
      expect(feature.findByName(model, 'test.a.b') === relation).toBe(true)
      expect(withSpy.calledWith('a.b')).toBe(true)
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
    it('does nothing if the accessor already defined in prototype', function() {
      class A {
        get test() {
          return 'anything'
        }
      }
      const model: any = new A()
      feature.defineAccessor(model, 'test')
      expect(model.test).toEqual('anything')
    })

    it('defines an accessor which call this.getRelationByName(accessor).getData() in model prototype', function() {
      class B {
        getRelationByName(name: string) {
          return {
            getData() {
              return name + '-data'
            }
          }
        }
      }
      const model: any = new B()
      feature.defineAccessor(model, 'test')
      expect(model.test).toEqual('test-data')
      expect(model['not-found']).toBeUndefined()
    })
  })
})
