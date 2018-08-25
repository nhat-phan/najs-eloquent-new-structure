import 'jest'
import { MongooseQueryExecutor } from '../../../lib/drivers/mongoose/MongooseQueryExecutor'
import { MongooseQueryBuilderHandler } from '../../../lib/drivers/mongoose/MongooseQueryBuilderHandler'
import { MongodbQueryLog } from '../../../lib/drivers/mongodb/MongodbQueryLog'
import { Schema } from 'mongoose'
const mongoose = require('mongoose')

const UserModel = mongoose.model('User', new Schema({}))

describe('MongooseQueryExecutor', function() {
  function makeQueryExecutor() {
    const model: any = {}
    const handler = new MongooseQueryBuilderHandler(model)
    return new MongooseQueryExecutor(handler, UserModel, new MongodbQueryLog())
  }

  describe('.get()', function() {
    it('should work', function() {
      makeQueryExecutor().get()
    })
  })

  describe('.first()', function() {
    it('should work', function() {
      makeQueryExecutor().first()
    })
  })

  describe('.count()', function() {
    it('should work', function() {
      makeQueryExecutor().count()
    })
  })

  describe('.update()', function() {
    it('should work', function() {
      makeQueryExecutor().update({})
    })
  })

  describe('.delete()', function() {
    it('should work', function() {
      makeQueryExecutor().delete()
    })
  })

  describe('.restore()', function() {
    it('should work', function() {
      makeQueryExecutor().restore()
    })
  })

  describe('.execute()', function() {
    it('should work', function() {
      makeQueryExecutor().execute()
    })
  })
})
