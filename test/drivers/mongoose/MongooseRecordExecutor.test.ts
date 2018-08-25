import 'jest'
import * as Sinon from 'sinon'
import { Document, model, Schema } from 'mongoose'
import { init_mongoose, delete_collection } from '../../util'
import { QueryLog } from '../../../lib/facades/global/QueryLogFacade'
import { MongooseRecordExecutor } from '../../../lib/drivers/mongoose/MongooseRecordExecutor'
import { MongodbQueryLog } from '../../../lib/drivers/mongodb/MongodbQueryLog'

const mongoose = require('mongoose')

describe('MongooseRecordExecutor', function() {
  const Model = model('MongooseModel', new Schema({}))

  beforeAll(async function() {
    await init_mongoose(mongoose, 'mongoose_record_executor')
  })

  afterAll(async function() {
    delete_collection(mongoose, 'test')
  })

  beforeEach(function() {
    QueryLog.clear().enable()
  })

  function makeExecutor(model: any, document: Document) {
    return new MongooseRecordExecutor(model, document, new MongodbQueryLog())
  }

  function makeDocument(): Document {
    return new Model()
  }

  function expect_query_log(data: object, result: any = undefined, index: number = 0) {
    const logData = QueryLog.pull()[index]['data']
    if (typeof result !== undefined) {
      expect(logData['result'] === result).toBe(true)
    }
    expect(logData).toMatchObject(data)
  }

  describe('.create()', function() {
    it('calls and returns this.document.save()', async function() {
      const model: any = {
        getModelName() {
          return 'Test'
        }
      }
      const document = makeDocument()
      const spy = Sinon.spy(document, 'save')

      const executor = makeExecutor(model, document)
      const result = await executor.create()

      expect_query_log(
        {
          raw: 'Test.save()',
          action: 'Test.create()'
        },
        result
      )
      expect(spy.called).toBe(true)
    })
  })

  describe('.update()', function() {
    it('calls and returns this.document.save()', async function() {
      const model: any = {
        getModelName() {
          return 'Test'
        }
      }
      const document = makeDocument()
      const spy = Sinon.spy(document, 'save')

      const executor = makeExecutor(model, document)
      const result = await executor.update()

      expect_query_log(
        {
          raw: 'Test.save()',
          action: 'Test.update()'
        },
        result
      )
      expect(spy.called).toBe(true)
    })
  })

  describe('.softDelete()', function() {
    it('calls and returns this.document.delete()', async function() {
      const model: any = {
        getModelName() {
          return 'Test'
        }
      }
      const document: any = {
        async delete() {}
      }
      const spy = Sinon.spy(document, 'delete')

      const executor = makeExecutor(model, document)
      const result = await executor.softDelete()

      expect_query_log(
        {
          raw: 'Test.delete()',
          action: 'Test.softDelete()'
        },
        result
      )
      expect(spy.called).toBe(true)
    })
  })

  describe('.hardDelete()', function() {
    it('calls and returns this.document.remove()', async function() {
      const model: any = {
        getModelName() {
          return 'Test'
        }
      }
      const document = makeDocument()
      const spy = Sinon.spy(document, 'remove')

      const executor = makeExecutor(model, document)
      const result = await executor.hardDelete()

      expect_query_log(
        {
          raw: 'Test.remove()',
          action: 'Test.hardDelete()'
        },
        result
      )
      expect(spy.called).toBe(true)
    })
  })

  describe('.restore()', function() {
    it('calls and returns this.document.restore()', async function() {
      const model: any = {
        getModelName() {
          return 'Test'
        }
      }
      const document: any = {
        async restore() {}
      }
      const spy = Sinon.spy(document, 'restore')

      const executor = makeExecutor(model, document)
      const result = await executor.restore()

      expect_query_log(
        {
          raw: 'Test.restore()',
          action: 'Test.restore()'
        },
        result
      )
      expect(spy.called).toBe(true)
    })
  })
})
