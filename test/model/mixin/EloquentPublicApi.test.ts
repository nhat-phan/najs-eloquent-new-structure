import 'jest'
import * as Sinon from 'sinon'
import { QueryPublicApi } from '../../../lib/features/mixin/QueryPublicApi'

describe('EloquentPublicApi', function() {
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

  const functions = {
    select: [[], ['a', ['b', 'c']], ['a', 'b', 'c']],
    limit: [[1], [1000], [10000]],
    orderBy: [['test'], ['test', 'asc'], ['test', 'desc']],
    orderByAsc: [['a'], ['b']],
    orderByDesc: [['a'], ['b']],
    where: [[function() {}], ['a', '10'], ['a', '>', '10']],
    whereNot: [['a', '100']],
    whereIn: [['a', [1, 2, 3]]],
    whereNotIn: [['a', [1, 2, 3]]],
    whereNull: [['a'], ['b'], ['c']],
    whereNotNull: [['a'], ['b'], ['c']],
    whereBetween: [['a', [1, 100]]],
    whereNotBetween: [['a', [1, 100]]],
    withTrashed: [[]],
    onlyTrashed: [[]],
    first: [[], ['id']],
    find: [[], ['id']],
    get: [[], ['a', ['b', 'c']], ['a', 'b', 'c']],
    all: [[]],
    count: [[]],
    pluck: [['a'], ['a', 'b']],
    findById: [['id']],
    findOrFail: [['id']],
    firstOrFail: [['id']]
  }

  for (const name in functions) {
    describe(`.${name}()`, function() {
      it(`calls and returns .newQuery().${name}()`, function() {
        const queryBuilder = {
          [name]() {}
        }
        const model = {
          newQuery() {
            return queryBuilder
          }
        }
        const stub = Sinon.stub(queryBuilder, name)
        stub.returns('anything')

        const params = functions[name]
        for (const param of params) {
          expect(QueryPublicApi[name].apply(model, param)).toEqual('anything')
          expect(stub.calledWith(...param)).toBe(true)
          stub.resetHistory()
        }
      })
    })
  }
})
