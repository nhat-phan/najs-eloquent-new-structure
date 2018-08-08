import 'jest'
import * as Sinon from 'sinon'
import { QueryBuilderHandlerBase } from '../../lib/query-builders/QueryBuilderHandlerBase'

describe('QueryBuilderHandlerBase', function() {
  function makeInstance(model: any): QueryBuilderHandlerBase {
    return Reflect.construct(QueryBuilderHandlerBase, [model])
  }

  describe('constructor()', function() {
    it('assigns model to property model, init used = false & softDeleteState = should-add', function() {
      const model = {}
      const query = makeInstance(model)

      expect(query.getModel() === model).toBe(true)
      expect(query.isUsed()).toBe(false)
      expect(query.getSoftDeleteState()).toEqual('should-add')
    })
  })

  describe('.getModel()', function() {
    it('simply returns model', function() {
      const model = {}
      const query = makeInstance(model)

      expect(query.getModel() === model).toBe(true)
    })
  })

  describe('.getPrimaryKeyName()', function() {
    it('simply returns model.getPrimaryKeyName()', function() {
      const model = {
        getPrimaryKeyName() {
          return 'result'
        }
      }
      const query = makeInstance(model)

      expect(query.getPrimaryKeyName()).toEqual('result')
    })
  })

  describe('.setQueryName()', function() {
    it('sets queryName by passed param value', function() {
      const model = {}
      const query = makeInstance(model)

      query.setQueryName('test')
      expect(query.getQueryName()).toEqual('test')
    })
  })

  describe('.getQueryName()', function() {
    it('simply returns queryName value', function() {
      const model = {}
      const query = makeInstance(model)

      query.setQueryName('test')
      expect(query.getQueryName()).toEqual('test')
    })
  })

  describe('.setLogGroup()', function() {
    it('sets logGroup by passed param value', function() {
      const model = {}
      const query = makeInstance(model)

      query.setLogGroup('test')
      expect(query.getLogGroup()).toEqual('test')
    })
  })

  describe('.getLogGroup()', function() {
    it('simply returns logGroup value', function() {
      const model = {}
      const query = makeInstance(model)

      query.setLogGroup('test')
      expect(query.getLogGroup()).toEqual('test')
    })
  })

  describe('.markUsed()', function() {
    it('assigns true to used property', function() {
      const model = {}
      const query = makeInstance(model)

      query.markUsed()
      expect(query.isUsed()).toBe(true)
    })
  })

  describe('.isUsed()', function() {
    it('simply returns used property', function() {
      const model = {}
      const query = makeInstance(model)

      query.markUsed()
      expect(query.isUsed()).toBe(true)
    })
  })

  describe('.hasSoftDeletes()', function() {
    it('calls .hasSoftDeletes() from SoftDeletesFeature of the model', function() {
      const model = {
        getDriver() {
          return {
            getSoftDeletesFeature() {
              return {
                hasSoftDeletes() {
                  return 'result'
                }
              }
            }
          }
        }
      }
      const query = makeInstance(model)

      expect(query.hasSoftDeletes()).toEqual('result')
    })
  })

  describe('.getSoftDeletesSetting()', function() {
    it('calls .getSoftDeletesSetting() from SoftDeletesFeature of the model', function() {
      const model = {
        getDriver() {
          return {
            getSoftDeletesFeature() {
              return {
                getSoftDeletesSetting() {
                  return 'result'
                }
              }
            }
          }
        }
      }
      const query = makeInstance(model)

      expect(query.getSoftDeletesSetting()).toEqual('result')
    })
  })

  describe('.hasTimestamps()', function() {
    it('calls .hasTimestamps() from TimestampsFeature of the model', function() {
      const model = {
        getDriver() {
          return {
            getTimestampsFeature() {
              return {
                hasTimestamps() {
                  return 'result'
                }
              }
            }
          }
        }
      }
      const query = makeInstance(model)

      expect(query.hasTimestamps()).toEqual('result')
    })
  })

  describe('.getTimestampsSetting()', function() {
    it('calls .getTimestampsSetting() from TimestampsFeature of the model', function() {
      const model = {
        getDriver() {
          return {
            getTimestampsFeature() {
              return {
                getTimestampsSetting() {
                  return 'result'
                }
              }
            }
          }
        }
      }
      const query = makeInstance(model)

      expect(query.getTimestampsSetting()).toEqual('result')
    })
  })

  describe('.markSoftDeleteState()', function() {
    it('sets softDeleteState by passed param value', function() {
      const model = {}
      const query = makeInstance(model)

      query.markSoftDeleteState('added')
      expect(query.getSoftDeleteState()).toEqual('added')
    })
  })

  describe('.getSoftDeleteState()', function() {
    it('simply returns logGroup value', function() {
      const model = {}
      const query = makeInstance(model)

      query.markSoftDeleteState('should-not-add')
      expect(query.getSoftDeleteState()).toEqual('should-not-add')
    })
  })

  describe('.shouldAddSoftDeleteCondition()', function() {
    it('returns true if softDeleteState is should-add AND model .hasSoftDeletes', function() {
      const dataset = [
        {
          state: 'should-add',
          hasSoftDeletes: false,
          result: false
        },
        {
          state: 'should-not-add',
          hasSoftDeletes: false,
          result: false
        },
        {
          state: 'added',
          hasSoftDeletes: false,
          result: false
        },
        {
          state: 'should-add',
          hasSoftDeletes: true,
          result: true
        },
        {
          state: 'should-not-add',
          hasSoftDeletes: true,
          result: false
        },
        {
          state: 'added',
          hasSoftDeletes: true,
          result: false
        }
      ]

      for (const data of dataset) {
        const model = {
          getDriver() {
            return {
              getSoftDeletesFeature() {
                return {
                  hasSoftDeletes() {
                    return data.hasSoftDeletes
                  }
                }
              }
            }
          }
        }
        const query = makeInstance(model)
        query.markSoftDeleteState(data.state as any)
        expect(query.shouldAddSoftDeleteCondition()).toBe(data.result)
      }
    })
  })

  describe('.createCollection()', function() {
    it('simply calls make_collection() with result an this.createInstance as a mapper', function() {
      const model: any = {}
      const query = makeInstance(model)
      const createInstanceStub = Sinon.stub(query, 'createInstance')
      createInstanceStub.returns({})

      const a = {},
        b = {}
      query.createCollection([a, b])
      expect(createInstanceStub.calledTwice).toBe(true)
      expect(createInstanceStub.firstCall.calledWith(a)).toBe(true)
      expect(createInstanceStub.secondCall.calledWith(b)).toBe(true)
    })
  })

  describe('.createInstance()', function() {
    it('makes dataBucket from RelationFeature then calls .makeModel from bucket and push the model to bucket', function() {
      const instance = {}
      const dataBucket = {
        makeModel() {
          return instance
        },
        add() {}
      }
      const relationFeature = {
        getDataBucket() {
          return undefined
        },
        makeDataBucket() {
          return dataBucket
        }
      }
      const model = {
        getDriver() {
          return {
            getRelationFeature() {
              return relationFeature
            }
          }
        }
      }
      const query = makeInstance(model)
      const makeModelSpy = Sinon.spy(dataBucket, 'makeModel')
      const addSpy = Sinon.spy(dataBucket, 'add')

      const result = {}
      expect(query.createInstance(result) === instance).toBe(true)
      expect(makeModelSpy.calledWith(model, result)).toBe(true)
      expect(addSpy.calledWith(instance)).toBe(true)
    })

    it('makes can reuse current bucket if it already exists', function() {
      const instance = {}
      const dataBucket = {
        makeModel() {
          return instance
        },
        add() {}
      }
      const relationFeature = {
        getDataBucket() {
          return dataBucket
        }
      }
      const model = {
        getDriver() {
          return {
            getRelationFeature() {
              return relationFeature
            }
          }
        }
      }
      const query = makeInstance(model)
      const makeModelSpy = Sinon.spy(dataBucket, 'makeModel')
      const addSpy = Sinon.spy(dataBucket, 'add')

      const result = {}
      expect(query.createInstance(result) === instance).toBe(true)
      expect(makeModelSpy.calledWith(model, result)).toBe(true)
      expect(addSpy.calledWith(instance)).toBe(true)
    })
  })
})
