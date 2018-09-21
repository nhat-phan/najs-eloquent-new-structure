import 'jest'
import * as Sinon from 'sinon'
import { ExecutorBase } from '../../../lib/drivers/ExecutorBase'
import { ExecutorUtils } from '../../../lib/query-builders/shared/ExecutorUtils'
import { Record } from '../../../lib/drivers/Record'
import { RecordCollector } from '../../../lib/drivers/RecordCollector'
import { QueryLog } from '../../../lib/facades/global/QueryLogFacade'
import { MemoryDataSource } from '../../../lib/drivers/memory/MemoryDataSource'
import { MemoryDataSourceProvider } from '../../../lib/facades/global/MemoryDataSourceProviderFacade'
import { MemoryQueryBuilder } from '../../../lib/drivers/memory/MemoryQueryBuilder'
import { MemoryQueryBuilderHandler } from '../../../lib/drivers/memory/MemoryQueryBuilderHandler'
import { MemoryQueryExecutor } from '../../../lib/drivers/memory/MemoryQueryExecutor'

MemoryDataSourceProvider.register(MemoryDataSource, 'memory', true)

const User: any = {
  getModelName() {
    return 'User'
  },

  getPrimaryKeyName() {
    return 'id'
  }
}

const Role: any = {
  getModelName() {
    return 'Role'
  },

  getPrimaryKeyName() {
    return 'id'
  }
}

const UserDataSource = MemoryDataSourceProvider.create(User)
const RoleDataSource = MemoryDataSourceProvider.create(Role)

describe('MemoryQueryExecutor', function() {
  const dataset = [
    { first_name: 'john', last_name: 'doe', age: 30 },
    { first_name: 'jane', last_name: 'doe', age: 25 },
    { first_name: 'tony', last_name: 'stark', age: 40 },
    { first_name: 'thor', last_name: 'god', age: 1000 },
    { first_name: 'captain', last_name: 'american', age: 100 },
    { first_name: 'tony', last_name: 'stewart', age: 40 },
    { first_name: 'peter', last_name: 'parker', age: 15 }
  ]

  beforeAll(async function() {
    for (const data of dataset) {
      UserDataSource.push(new Record(data))
    }
    await UserDataSource.write()

    for (let i = 0; i < 10; i++) {
      RoleDataSource.push(
        new Record({
          name: 'role-' + i,
          deleted_at: new Date()
        })
      )
    }
    await RoleDataSource.write()
  })

  beforeEach(function() {
    QueryLog.clear().enable()
  })

  function expect_match_user(result: any, expected: any) {
    for (const name in expected) {
      expect(result.getAttribute(name)).toEqual(expected[name])
    }
  }

  function expect_query_log(data: object, result: any = undefined, index: number = 0) {
    const logData = QueryLog.pull()[index]['data']
    if (typeof result !== undefined) {
      expect(logData['result'] === result).toBe(true)
    }
    expect(logData).toMatchObject(data)
  }

  function makeQueryBuilderHandler(model: any): MemoryQueryBuilderHandler {
    let fakeModel: any
    if (typeof model === 'string') {
      fakeModel = {
        getModelName() {
          return model
        },

        getPrimaryKeyName() {
          return 'id'
        },

        getDriver() {
          return {
            getSoftDeletesFeature() {
              return {
                hasSoftDeletes() {
                  return false
                }
              }
            },
            getTimestampsFeature() {
              return {
                hasTimestamps() {
                  return false
                }
              }
            }
          }
        },

        getRecordName() {
          return model
        }
      }
    } else {
      fakeModel = model
    }

    return new MemoryQueryBuilderHandler(fakeModel)
  }

  function makeQueryBuilder(handler: MemoryQueryBuilderHandler): MemoryQueryBuilder<any> {
    return new MemoryQueryBuilder(handler)
  }

  it('extends ExecutorBase', function() {
    const executor = makeQueryBuilderHandler('User').getQueryExecutor()
    expect(executor).toBeInstanceOf(ExecutorBase)
  })

  describe('.get()', function() {
    it('gets all data of collection and return an instance of Collection<Eloquent<T>>', async function() {
      const handler = makeQueryBuilderHandler('User')
      const result = await handler.getQueryExecutor().get()

      expect_query_log(
        {
          raw: 'RecordCollector.use(NajsEloquent.Driver.Memory.MemoryDataSource("User")).exec()',
          action: 'get'
        },
        result
      )
      expect(result.length).toEqual(7)
      for (let i = 0; i < 7; i++) {
        expect_match_user(result[i], dataset[i])
      }
    })

    it('returns an empty collection if no result', async function() {
      const handler = makeQueryBuilderHandler('User')
      makeQueryBuilder(handler).where('first_name', 'no-one')
      const result = await handler.getQueryExecutor().get()

      expect_query_log(
        {
          raw: `RecordCollector.use(NajsEloquent.Driver.Memory.MemoryDataSource("User")).filterBy(${JSON.stringify({
            $and: [{ field: 'first_name', operator: '=', value: 'no-one' }]
          })}).exec()`
        },
        result
      )
      expect(result.length === 0).toBe(true)
    })

    it('can get data by query builder, case 1', async function() {
      const handler = makeQueryBuilderHandler('User')
      makeQueryBuilder(handler).where('age', 1000)
      const result = await handler.getQueryExecutor().get()

      expect_query_log(
        {
          raw: `RecordCollector.use(NajsEloquent.Driver.Memory.MemoryDataSource("User")).filterBy(${JSON.stringify({
            $and: [{ field: 'age', operator: '=', value: 1000 }]
          })}).exec()`,
          action: 'get'
        },
        result
      )
      expect(result.length).toEqual(1)
      expect_match_user(result[0], dataset[3])
    })

    it('can get data by query builder, case 2', async function() {
      const handler = makeQueryBuilderHandler('User')
      makeQueryBuilder(handler).where('age', 40)
      const result = await handler.getQueryExecutor().get()

      expect_query_log(
        {
          raw: `RecordCollector.use(NajsEloquent.Driver.Memory.MemoryDataSource("User")).filterBy(${JSON.stringify({
            $and: [{ field: 'age', operator: '=', value: 40 }]
          })}).exec()`,
          action: 'get'
        },
        result
      )
      expect(result.length).toEqual(2)
      expect_match_user(result[0], dataset[2])
      expect_match_user(result[1], dataset[5])
    })

    it('can get data by query builder, case 3', async function() {
      const handler = makeQueryBuilderHandler('User')
      makeQueryBuilder(handler)
        .where('age', 40)
        .where('last_name', 'stark')
      const result = await handler.getQueryExecutor().get()

      expect_query_log(
        {
          raw: `RecordCollector.use(NajsEloquent.Driver.Memory.MemoryDataSource("User")).filterBy(${JSON.stringify({
            $and: [{ field: 'age', operator: '=', value: 40 }, { field: 'last_name', operator: '=', value: 'stark' }]
          })}).exec()`,
          action: 'get'
        },
        result
      )
      expect(result.length).toEqual(1)
      expect_match_user(result[0], dataset[2])
    })

    it('can get data by query builder, case 4', async function() {
      const handler = makeQueryBuilderHandler('User')
      makeQueryBuilder(handler)
        .where('age', 40)
        .orWhere('first_name', 'peter')
      const result = await handler.getQueryExecutor().get()

      expect_query_log(
        {
          raw: `RecordCollector.use(NajsEloquent.Driver.Memory.MemoryDataSource("User")).filterBy(${JSON.stringify({
            $or: [{ field: 'age', operator: '=', value: 40 }, { field: 'first_name', operator: '=', value: 'peter' }]
          })}).exec()`,
          action: 'get'
        },
        result
      )
      expect(result.length).toEqual(3)
      expect_match_user(result[0], dataset[2])
      expect_match_user(result[1], dataset[5])
      expect_match_user(result[2], dataset[6])
    })

    it('can get data by query builder, case 5', async function() {
      const handler = makeQueryBuilderHandler('User')
      makeQueryBuilder(handler)
        .where('age', 40)
        .orWhere('first_name', 'peter')
        .orderBy('id', 'desc')
      const result = await handler.getQueryExecutor().get()

      expect_query_log(
        {
          raw: `RecordCollector.use(NajsEloquent.Driver.Memory.MemoryDataSource("User")).orderBy(${JSON.stringify([
            ['id', 'desc']
          ])}).filterBy(${JSON.stringify({
            $or: [{ field: 'age', operator: '=', value: 40 }, { field: 'first_name', operator: '=', value: 'peter' }]
          })}).exec()`,
          action: 'get'
        },
        result
      )
      expect(result.length).toEqual(3)
      expect_match_user(result[0], dataset[6])
      expect_match_user(result[1], dataset[5])
      expect_match_user(result[2], dataset[2])
    })

    it('returns an empty array if executeMode is disabled', async function() {
      const handler = makeQueryBuilderHandler('User')
      makeQueryBuilder(handler)
        .where('age', 40)
        .orWhere('first_name', 'peter')
        .orderBy('id', 'desc')

      const result = await handler
        .getQueryExecutor()
        .setExecuteMode('disabled')
        .get()

      expect_query_log(
        {
          raw: `RecordCollector.use(NajsEloquent.Driver.Memory.MemoryDataSource("User")).orderBy(${JSON.stringify([
            ['id', 'desc']
          ])}).filterBy(${JSON.stringify({
            $or: [{ field: 'age', operator: '=', value: 40 }, { field: 'first_name', operator: '=', value: 'peter' }]
          })}).exec()`,
          action: 'get'
        },
        result
      )
      expect(result).toEqual([])
    })
  })

  describe('.collectResult()', function() {
    it('calls DataSource.read(), then calls and returns collector.exec()', async function() {
      const readSpy = Sinon.spy(UserDataSource, 'read')
      const handler = makeQueryBuilderHandler('User')
      const executor: MemoryQueryExecutor = handler.getQueryExecutor() as any

      const collector = executor.makeCollector()
      const collectorExecStub = Sinon.stub(collector, 'exec')
      collectorExecStub.returns('anything')

      expect(await executor.collectResult(collector)).toEqual('anything')
      expect(readSpy.called).toBe(true)
      expect(collectorExecStub.called).toBe(true)
    })
  })

  describe('.makeCollector()', function() {
    it('makes and return a RecordCollector instance which using the DataSource', function() {
      const handler = makeQueryBuilderHandler('User')
      const executor: MemoryQueryExecutor = handler.getQueryExecutor() as any

      const collector = executor.makeCollector()
      expect(collector['dataSource'] === UserDataSource).toBe(true)
    })

    it('calls collector.limit() if query builder has limit data', function() {
      const handler = makeQueryBuilderHandler('User')
      makeQueryBuilder(handler).limit(5)
      const executor: MemoryQueryExecutor = handler.getQueryExecutor() as any

      const collector = executor.makeCollector()
      expect(collector['limited']).toEqual(5)
    })

    it('calls collector.orderBy() if query builder has ordering data', function() {
      const handler = makeQueryBuilderHandler('User')
      makeQueryBuilder(handler)
        .orderBy('a')
        .orderBy('b', 'desc')
      const executor: MemoryQueryExecutor = handler.getQueryExecutor() as any

      const collector = executor.makeCollector()
      expect(collector).toBeInstanceOf(RecordCollector)
      expect(collector['sortedBy']).toEqual([['a', 'asc'], ['b', 'desc']])
    })

    it('calls collector.select() if query builder has selected data', function() {
      const handler = makeQueryBuilderHandler('User')
      makeQueryBuilder(handler)
        .select('a')
        .select('b', ['c', 'd'])
      const executor: MemoryQueryExecutor = handler.getQueryExecutor() as any

      const collector = executor.makeCollector()
      expect(collector['selected']).toEqual(['a', 'b', 'c', 'd'])
    })

    it('calls collector.filterBy() if query builder has conditions data', function() {
      const handler = makeQueryBuilderHandler('User')
      makeQueryBuilder(handler)
        .where('a', 1)
        .orWhere('b', 2)
      const executor: MemoryQueryExecutor = handler.getQueryExecutor() as any

      const collector = executor.makeCollector()
      expect(collector['conditions']).toEqual({
        $or: [{ field: 'a', operator: '=', value: 1 }, { field: 'b', operator: '=', value: 2 }]
      })
    })
  })

  describe('.getFilterConditions()', function() {
    it('calls ExecutorUtils.addSoftDeleteConditionIfNeeded() to add softDeletes conditions', function() {
      const spy = Sinon.spy(ExecutorUtils, 'addSoftDeleteConditionIfNeeded')
      const handler = makeQueryBuilderHandler('User')
      const query = makeQueryBuilder(handler)
      query.where('a', 1).where('b', 2)

      const executor: MemoryQueryExecutor = handler.getQueryExecutor() as any
      executor.getFilterConditions()
      expect(spy.calledWith(handler)).toBe(true)
    })

    it('converts BasicQuery to conditions object by BasicQueryConverter', function() {
      const handler = makeQueryBuilderHandler('User')
      const query = makeQueryBuilder(handler)
      query.where('a', 1).where('b', 2)

      const executor: MemoryQueryExecutor = handler.getQueryExecutor() as any
      const conditions = executor.getFilterConditions()

      expect(conditions).toEqual({
        $and: [{ field: 'a', operator: '=', value: 1 }, { field: 'b', operator: '=', value: 2 }]
      })
    })
  })
})
