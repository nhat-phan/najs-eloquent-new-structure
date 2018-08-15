import 'jest'
import * as Sinon from 'sinon'
import { Record } from '../../../lib/drivers/Record'
import { QueryLog } from '../../../lib/facades/global/QueryLogFacade'
import { init_mongodb, delete_collection_use_mongodb } from '../../util'
import { MongodbProviderFacade } from '../../../lib/facades/global/MongodbProviderFacade'
import { MongodbRecordExecutor } from '../../../lib/drivers/mongodb/MongodbRecordExecutor'
import { MongodbQueryLog } from '../../../lib/drivers/mongodb/MongodbQueryLog'

const Moment = require('moment')

describe('MongodbRecordExecutor', function() {
  beforeAll(async function() {
    await init_mongodb('mongodb_record_executor')
  })

  afterAll(async function() {
    delete_collection_use_mongodb('test')
  })

  beforeEach(function() {
    QueryLog.clear().enable()
  })

  function makeExecutor(model: any, record: Record) {
    return new MongodbRecordExecutor(
      model,
      record,
      MongodbProviderFacade.getDatabase().collection('test'),
      new MongodbQueryLog()
    )
  }

  function makeModel(name: string, timestamps: boolean | object, softDeletes: boolean | object) {
    let timestampsFeature = {}
    if (timestamps === false) {
      timestampsFeature = {
        hasTimestamps() {
          return false
        }
      }
    } else {
      timestampsFeature = {
        hasTimestamps() {
          return true
        },
        getTimestampsSetting() {
          return timestamps
        }
      }
    }

    let softDeleteFeature = {}
    if (softDeletes === false) {
      softDeleteFeature = {
        hasSoftDeletes() {
          return false
        }
      }
    } else {
      softDeleteFeature = {
        hasSoftDeletes() {
          return true
        },
        getSoftDeletesSetting() {
          return softDeletes
        }
      }
    }

    const model = {
      getDriver() {
        return {
          getSoftDeletesFeature() {
            return softDeleteFeature
          },
          getTimestampsFeature() {
            return timestampsFeature
          }
        }
      },

      getModelName() {
        return name
      }
    }
    return model
  }

  function expect_query_log(data: object, result: any = undefined, index: number = 0) {
    const logData = QueryLog.pull()[index]['data']
    if (typeof result !== undefined) {
      expect(logData['result'] === result).toBe(true)
    }
    expect(logData).toMatchObject(data)
  }

  describe('.fillData()', function() {
    it('does nothing if there is no timestamps or softDeletes settings', function() {
      const model = makeModel('Test', false, false)
      const record = new Record()
      const executor = makeExecutor(model, record)
      executor.fillData(true)
      expect(record.toObject()).toEqual({})
    })

    it('fills updatedAt only if isCreate = false if has timestamp settings', function() {
      const now = Moment('2018-01-01T00:00:00.000Z')
      Moment.now = () => {
        return now
      }

      const model = makeModel('Test', { createdAt: 'created_at', updatedAt: 'updated_at' }, false)
      const record = new Record()
      const executor = makeExecutor(model, record)
      executor.fillData(false)
      expect(record.toObject()).toEqual({ updated_at: now.toDate() })
    })

    it('fills updatedAt/createdAt if isCreate = true if has timestamp settings', function() {
      const now = Moment('2018-01-01T00:00:00.000Z')
      Moment.now = () => {
        return now
      }

      const model = makeModel('Test', { createdAt: 'created_at', updatedAt: 'updated_at' }, false)
      const record = new Record()
      const executor = makeExecutor(model, record)
      executor.fillData(true)
      expect(record.toObject()).toEqual({ updated_at: now.toDate(), created_at: now.toDate() })
    })

    it('skips createdAt if it already exists', function() {
      const now = Moment('2018-01-01T00:00:00.000Z')
      Moment.now = () => {
        return now
      }

      const model = makeModel('Test', { createdAt: 'created_at', updatedAt: 'updated_at' }, false)
      const record = new Record({ created_at: 'anything' })
      const executor = makeExecutor(model, record)
      executor.fillData(true)
      expect(record.toObject()).toEqual({ updated_at: now.toDate(), created_at: 'anything' })
    })

    it('fills deletedAt = null there is a softDeletes setting', function() {
      const model = makeModel('Test', false, { deletedAt: 'deleted_at' })
      const record = new Record()
      const executor = makeExecutor(model, record)
      executor.fillData(true)
      // tslint:disable-next-line
      expect(record.toObject()).toEqual({ deleted_at: null })
    })

    it('skips deletedAt if it already exists', function() {
      const model = makeModel('Test', false, { deletedAt: 'deleted_at' })
      const record = new Record({ deleted_at: 'anything' })
      const executor = makeExecutor(model, record)
      executor.fillData(true)
      expect(record.toObject()).toEqual({ deleted_at: 'anything' })
    })
  })

  describe('.create()', function() {
    it('calls .fillData(true) by default then save the data by collection.insertOne()', async function() {
      const model = makeModel('Test', false, false)
      const executor = makeExecutor(model, new Record())
      const fillDataSpy = Sinon.spy(executor, 'fillData')

      await executor.create()
      expect(fillDataSpy.calledWith(true)).toBe(true)
    })

    it('skips .fillData(true) if the option shouldFillData = false', async function() {
      const model = makeModel('Test', false, false)
      const executor = makeExecutor(model, new Record())
      const fillDataSpy = Sinon.spy(executor, 'fillData')

      await executor.create(false)
      expect(fillDataSpy.calledWith(true)).toBe(false)
    })

    it('can create without timestamps or softDeletes settings', async function() {
      const model = makeModel('Test', false, false)
      const result = await makeExecutor(model, new Record({ test: 'data' })).create()
      expect_query_log(
        {
          raw: 'db.test.insertOne({"test":"data"})',
          action: 'Test.create()'
        },
        result
      )
    })

    it('can create with timestamps', async function() {
      const model = makeModel('Test', { createdAt: 'created_at', updatedAt: 'updated_at' }, false)
      const now = Moment('2018-01-01T00:00:00.000Z')
      Moment.now = () => {
        return now
      }

      const result = await makeExecutor(model, new Record({ test: 'data' })).create()
      expect_query_log(
        {
          raw: `db.test.insertOne(${JSON.stringify({
            test: 'data',
            updated_at: now.toDate(),
            created_at: now.toDate()
          })})`,
          action: 'Test.create()'
        },
        result
      )
    })

    it('can create with softDeletes', async function() {
      const model = makeModel('Test', false, { deletedAt: 'deleted_at' })
      const now = Moment('2018-01-01T00:00:00.000Z')
      Moment.now = () => {
        return now
      }

      const result = await makeExecutor(model, new Record({ test: 'data' })).create()
      expect_query_log(
        {
          raw: `db.test.insertOne(${JSON.stringify({
            test: 'data',
            // tslint:disable-next-line
            deleted_at: null
          })})`,
          action: 'Test.create()'
        },
        result
      )
    })
  })

  describe('.update()', function() {
    it('should work', function() {
      makeExecutor({} as any, new Record()).update()
    })
  })

  describe('.delete()', function() {
    it('should work', function() {
      makeExecutor({} as any, new Record()).delete(true)
    })
  })

  describe('.restore()', function() {
    it('should work', function() {
      makeExecutor({} as any, new Record()).restore()
    })
  })
})
