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

  describe('.query()', function() {
    it('returns an instance of MongodbQueryBuilder', function() {
      const model = new User()
      expect(model.query()).toBeInstanceOf(MongodbQueryBuilder)
    })
  })

  describe('.getNativeCollection()', function() {
    it('calls and returns .query().collection()', function() {
      const collection = {}
      const fakeQuery = {
        collection() {
          return collection
        }
      }
      const model = new User()
      const queryStub = Sinon.stub(model, 'query')
      queryStub.returns(fakeQuery)

      expect(model.getNativeCollection() === collection).toBe(true)
    })
  })
})
