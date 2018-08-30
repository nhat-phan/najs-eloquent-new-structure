import 'jest'
import * as Sinon from 'sinon'
import { Model } from '../../../lib/model/Model'
import { MongooseModel } from '../../../lib/drivers/mongoose/MongooseModel'
import { MongooseQueryBuilder } from '../../../lib/drivers/mongoose/MongooseQueryBuilder'
import { PrototypeManager } from '../../../lib/util/PrototypeManager'
import { register } from 'najs-binding'

describe('MongooseModel', function() {
  class User extends MongooseModel {
    getClassName() {
      return 'User'
    }
  }
  register(User)

  it('extends Model', function() {
    const model = new User()
    expect(model).toBeInstanceOf(MongooseModel)
    expect(model).toBeInstanceOf(Model)
  })

  it('should not be discovered by RelationFinder', function() {
    expect(PrototypeManager.shouldFindRelationsIn(MongooseModel.prototype)).toBe(false)
  })

  describe('.newQuery()', function() {
    it('returns an instance of MongooseQueryBuilder', function() {
      const model = new User()
      expect(model.newQuery()).toBeInstanceOf(MongooseQueryBuilder)
    })
  })

  describe('.getNativeModel()', function() {
    it('calls and returns .newQuery().nativeModel()', function() {
      const nativeModel = {}
      const fakeQuery = {
        nativeModel() {
          return nativeModel
        }
      }
      const model = new User()
      const newQueryStub = Sinon.stub(model, 'newQuery')
      newQueryStub.returns(fakeQuery)

      expect(model.getNativeModel() === nativeModel).toBe(true)
    })
  })
})
