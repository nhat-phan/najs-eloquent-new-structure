import 'jest'
import * as Sinon from 'sinon'
import { QueryPublicApi } from '../../../lib/features/mixin/QueryPublicApi'

describe('QueryPublicApi', function() {
  // describe('.newQuery()', function() {
  //   it('calls and returns QueryFeature.newQuery()', function() {
  //     const feature = {
  //       newQuery() {
  //         return 'anything'
  //       }
  //     }
  //     const model: any = {
  //       getDriver() {
  //         return {
  //           getQueryFeature() {
  //             return feature
  //           }
  //         }
  //       }
  //     }

  //     const spy = Sinon.spy(feature, 'newQuery')
  //     expect(QueryPublicApi.newQuery.apply(model)).toEqual('anything')
  //     expect(spy.calledWith(model)).toBe(true)
  //   })

  //   it('calls QueryFeature.newQuery() then calls .QueryFeature.queryName() in case there is a name passed in the first param', function() {
  //     const query = {
  //       queryName() {
  //         return 'anything'
  //       }
  //     }
  //     const feature = {
  //       newQuery() {
  //         return query
  //       }
  //     }
  //     const model: any = {
  //       getDriver() {
  //         return {
  //           getQueryFeature() {
  //             return feature
  //           }
  //         }
  //       }
  //     }

  //     const spy = Sinon.spy(query, 'queryName')
  //     expect(QueryPublicApi.newQuery.apply(model, ['test'])).toEqual('anything')
  //     expect(spy.calledWith('test')).toBe(true)
  //   })
  // })

  describe('.queryName()', function() {
    it('calls and returns .newQuery()', function() {
      const model = {
        newQuery() {}
      }
      const stub = Sinon.stub(model, 'newQuery')
      stub.returns('anything')
      expect(QueryPublicApi.queryName.call(model, 'test')).toEqual('anything')
      expect(stub.calledWith('test')).toBe(true)
    })
  })

  const functions = [
    'setLogGroup',
    'select',
    'limit',
    'orderBy',
    'orderByAsc',
    'orderByDesc',
    'where',
    'whereNot',
    'whereIn',
    'whereNotIn',
    'whereNull',
    'whereNotNull',
    'whereBetween',
    'whereNotBetween',
    'withTrashed',
    'onlyTrashed',
    'first',
    'find',
    'get',
    'all',
    'count',
    'pluck',
    'findById',
    'findOrFail',
    'firstOrFail'
  ]

  for (const method of functions) {
    describe(`.${method}()`, function() {
      it(`calls .newQuery() then calls .${method}() with original arguments`, function() {
        const query = {
          [method]: function() {
            return 'anything'
          }
        }
        const model = {
          newQuery() {}
        }
        const spy = Sinon.spy(query, method)
        const stub = Sinon.stub(model, 'newQuery')
        stub.returns(query)

        expect(QueryPublicApi[method].apply(model)).toEqual('anything')
        expect(spy.calledWith()).toBe(true)
        spy.resetHistory()

        expect(QueryPublicApi[method].apply(model, [1])).toEqual('anything')
        expect(spy.calledWith(1)).toBe(true)
        spy.resetHistory()

        expect(QueryPublicApi[method].apply(model, [1, 2])).toEqual('anything')
        expect(spy.calledWith(1, 2)).toBe(true)
        spy.resetHistory()

        expect(QueryPublicApi[method].apply(model, [1, 2, 3])).toEqual('anything')
        expect(spy.calledWith(1, 2, 3)).toBe(true)
        spy.resetHistory()

        stub.restore()
      })
    })
  }
})
