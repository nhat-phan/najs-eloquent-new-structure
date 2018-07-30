import 'jest'
import * as Sinon from 'sinon'
import { NotFoundError } from '../../../lib/errors/NotFoundError'
import { AdvancedQuery } from '../../../lib/query-builders/mixin/AdvancedQuery'

describe('AdvancedQuery', function() {
  describe('.find()', function() {
    it('calls this.handler.getQueryExecutor().find() to find result, and returns if result is falsy', async function() {
      const queryExecutor = {
        find() {
          return 'find-result'
        }
      }
      const builder = {
        handler: {
          getPrimaryKeyName() {
            return 'primary-key'
          },
          getQueryExecutor() {
            return queryExecutor
          },
          createInstance() {
            return 'instance'
          }
        },
        where() {}
      }
      const whereSpy = Sinon.spy(builder, 'where')
      const createInstanceSpy = Sinon.spy(builder.handler, 'createInstance')
      const findStub = Sinon.stub(queryExecutor, 'find')
      findStub.returns(Promise.resolve(undefined))

      expect(await AdvancedQuery.find.call(builder)).toBeUndefined()
      expect(whereSpy.called).toBe(false)
      expect(findStub.calledWith()).toBe(true)
      expect(createInstanceSpy.called).toBe(false)
    })

    it('calls this.handler.createInstance() if result is not falsy', async function() {
      const queryExecutor = {
        find() {
          return 'find-result'
        }
      }
      const builder = {
        handler: {
          getPrimaryKeyName() {
            return 'primary-key'
          },
          getQueryExecutor() {
            return queryExecutor
          },
          createInstance() {
            return 'instance'
          }
        },
        where() {}
      }
      const whereSpy = Sinon.spy(builder, 'where')
      const createInstanceSpy = Sinon.spy(builder.handler, 'createInstance')
      const findStub = Sinon.stub(queryExecutor, 'find')
      findStub.returns(Promise.resolve('any'))

      expect(await AdvancedQuery.find.call(builder)).toEqual('instance')
      expect(whereSpy.called).toBe(false)
      expect(findStub.calledWith()).toBe(true)
      expect(createInstanceSpy.calledWith('any')).toBe(true)
    })

    it('calls .where() and passes id if param exist', async function() {
      const queryExecutor = {
        find() {
          return 'find-result'
        }
      }
      const builder = {
        handler: {
          getPrimaryKeyName() {
            return 'primary-key'
          },
          getQueryExecutor() {
            return queryExecutor
          },
          createInstance() {
            return 'instance'
          }
        },
        where() {}
      }
      const whereSpy = Sinon.spy(builder, 'where')
      const createInstanceSpy = Sinon.spy(builder.handler, 'createInstance')
      const findStub = Sinon.stub(queryExecutor, 'find')
      findStub.returns(Promise.resolve('any'))

      expect(await AdvancedQuery.find.call(builder, 'test')).toEqual('instance')
      expect(whereSpy.calledWith('primary-key', 'test')).toBe(true)
      expect(findStub.calledWith()).toBe(true)
      expect(createInstanceSpy.calledWith('any')).toBe(true)
    })
  })

  describe('.first()', function() {
    it('just an alias of .find()', async function() {
      const stub = Sinon.stub(AdvancedQuery, 'find')
      stub.returns('result')

      expect(await AdvancedQuery.first('any')).toEqual('result')
      expect(stub.calledWith('any')).toBe(true)
      stub.restore()
    })
  })

  describe('.get()', function() {
    it('calls handler.getQueryExecutor().get() to get results and calls handler.createCollection()', async function() {
      const queryExecutor = {
        get() {
          return 'get-result'
        }
      }
      const builder = {
        handler: {
          getPrimaryKeyName() {
            return 'primary-key'
          },
          getQueryExecutor() {
            return queryExecutor
          },
          createCollection() {
            return 'collection'
          }
        },
        select() {}
      }
      const selectSpy = Sinon.spy(builder, 'select')
      const createCollectionSpy = Sinon.spy(builder.handler, 'createCollection')
      const getStub = Sinon.stub(queryExecutor, 'get')
      getStub.returns(Promise.resolve('any'))

      expect(await AdvancedQuery.get.call(builder)).toEqual('collection')
      expect(selectSpy.called).toBe(false)
      expect(getStub.calledWith()).toBe(true)
      expect(createCollectionSpy.calledWith('any')).toBe(true)
    })

    it('calls this.select() if params is not empty', async function() {
      const queryExecutor = {
        get() {
          return 'get-result'
        }
      }
      const builder = {
        handler: {
          getPrimaryKeyName() {
            return 'primary-key'
          },
          getQueryExecutor() {
            return queryExecutor
          },
          createCollection() {
            return 'collection'
          }
        },
        select() {}
      }
      const selectSpy = Sinon.spy(builder, 'select')
      const createCollectionSpy = Sinon.spy(builder.handler, 'createCollection')
      const getStub = Sinon.stub(queryExecutor, 'get')
      getStub.returns(Promise.resolve('any'))

      expect(await AdvancedQuery.get.call(builder, '1', '2', '3')).toEqual('collection')
      expect(selectSpy.calledWith('1', '2', '3')).toBe(true)
      expect(getStub.calledWith()).toBe(true)
      expect(createCollectionSpy.calledWith('any')).toBe(true)
    })
  })

  describe('.all()', function() {
    it('just an alias of .get()', async function() {
      const stub = Sinon.stub(AdvancedQuery, 'get')
      stub.returns('result')

      expect(await AdvancedQuery.all()).toEqual('result')
      expect(stub.calledWith()).toBe(true)
      stub.restore()
    })
  })

  describe('.pluck()', function() {
    it('calls .select() with valueKey and indexKey, then calls .executor().get() and reduce the result', async function() {
      const queryExecutor = {
        get() {
          return 'get-result'
        }
      }
      const builder = {
        handler: {
          getPrimaryKeyName() {
            return 'primary-key'
          },
          getQueryExecutor() {
            return queryExecutor
          },
          createCollection() {
            return 'collection'
          }
        },
        select() {}
      }
      const selectSpy = Sinon.spy(builder, 'select')
      const createCollectionSpy = Sinon.spy(builder.handler, 'createCollection')
      const getPrimaryKeyNameSpy = Sinon.spy(builder.handler, 'getPrimaryKeyName')
      const getStub = Sinon.stub(queryExecutor, 'get')
      getStub.returns(Promise.resolve([{ value: '1', key: 'a' }, { value: '2', key: 'b' }, { value: '3', key: 'a' }]))

      expect(await AdvancedQuery.pluck.call(builder, 'value', 'key')).toEqual({
        a: '3',
        b: '2'
      })
      expect(selectSpy.calledWith('value', 'key')).toBe(true)
      expect(getStub.calledWith()).toBe(true)
      expect(getPrimaryKeyNameSpy.calledWith()).toBe(false)
      expect(createCollectionSpy.called).toBe(false)
    })

    it('uses .getPrimaryKeyName() if the indexKey not provided', async function() {
      const queryExecutor = {
        get() {
          return 'get-result'
        }
      }
      const builder = {
        handler: {
          getPrimaryKeyName() {
            return 'key'
          },
          getQueryExecutor() {
            return queryExecutor
          },
          createCollection() {
            return 'collection'
          }
        },
        select() {}
      }
      const selectSpy = Sinon.spy(builder, 'select')
      const createCollectionSpy = Sinon.spy(builder.handler, 'createCollection')
      const getPrimaryKeyNameSpy = Sinon.spy(builder.handler, 'getPrimaryKeyName')
      const getStub = Sinon.stub(queryExecutor, 'get')
      getStub.returns(Promise.resolve([{ value: '1', key: 'a' }, { value: '2', key: 'b' }, { value: '3', key: 'a' }]))

      expect(await AdvancedQuery.pluck.call(builder, 'value')).toEqual({
        a: '3',
        b: '2'
      })
      expect(selectSpy.calledWith('value', 'key')).toBe(true)
      expect(getStub.calledWith()).toBe(true)
      expect(getPrimaryKeyNameSpy.calledWith()).toBe(true)
      expect(createCollectionSpy.called).toBe(false)
    })
  })

  describe('.findById()', function() {
    it('just an alias of .find()', async function() {
      const stub = Sinon.stub(AdvancedQuery, 'find')
      stub.returns('result')

      expect(await AdvancedQuery.findById('any')).toEqual('result')
      expect(stub.calledWith('any')).toBe(true)
      stub.restore()
    })
  })

  describe('.findOrFail()', function() {
    it('calls this.find() and returns the result if exists', async function() {
      const stub = Sinon.stub(AdvancedQuery, 'find')
      stub.returns('result')

      expect(await AdvancedQuery.findOrFail('any')).toEqual('result')
      expect(stub.calledWith('any')).toBe(true)
      stub.restore()
    })

    it('calls this.find() and throws NotFoundError if there is no result', async function() {
      const builder = {
        handler: {
          getModel() {
            return {
              getModelName() {
                return 'Model'
              }
            }
          }
        },
        find() {}
      }
      try {
        await AdvancedQuery.findOrFail.call(builder, 'any')
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundError)
        expect((error as NotFoundError).model).toEqual('Model')
        return
      }
      expect('should not reach this line').toEqual('hm')
    })
  })

  describe('.firstOrFail()', function() {
    it('just an alias of .findOrFail()', async function() {
      const stub = Sinon.stub(AdvancedQuery, 'findOrFail')
      stub.returns('result')

      expect(await AdvancedQuery.firstOrFail('any')).toEqual('result')
      expect(stub.calledWith('any')).toBe(true)
      stub.restore()
    })
  })
})
