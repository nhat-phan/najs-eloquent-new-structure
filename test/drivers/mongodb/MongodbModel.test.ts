import 'jest'
import * as Sinon from 'sinon'
import { Model } from '../../../lib/model/Model'
import { MongodbModel } from '../../../lib/drivers/mongodb/MongodbModel'
import { MongodbQueryBuilder } from '../../../lib/drivers/mongodb/MongodbQueryBuilder'

describe('MongodbModel', function() {
  class User extends MongodbModel {
    getClassName() {
      return 'User'
    }
  }

  it('extends Model', function() {
    const model = new User()
    expect(model).toBeInstanceOf(MongodbModel)
    expect(model).toBeInstanceOf(Model)
  })

  describe('.newQuery()', function() {
    it('returns an instance of MongodbQueryBuilder', function() {
      const model = new User()
      expect(model.newQuery()).toBeInstanceOf(MongodbQueryBuilder)
    })
  })

  describe('.getNativeCollection()', function() {
    it('calls and returns .newQuery().collection()', function() {
      const collection = {}
      const fakeQuery = {
        collection() {
          return collection
        }
      }
      const model = new User()
      const newQueryStub = Sinon.stub(model, 'newQuery')
      newQueryStub.returns(fakeQuery)

      expect(model.getNativeCollection() === collection).toBe(true)
    })
  })
})
