import 'jest'
import { make } from 'najs-binding'
import { MongodbConditionMatcherFactory } from '../../../lib/drivers/mongodb/MongodbConditionMatcherFactory'
import { MongodbConditionMatcher } from '../../../lib/drivers/mongodb/MongodbConditionMatcher'

describe('MongodbConditionMatcherFactory', function() {
  it('implements Autoload with singleton under name ""', function() {
    const factory = make<MongodbConditionMatcherFactory>(MongodbConditionMatcherFactory)
    expect(factory.getClassName()).toEqual('NajsEloquent.Driver.Mongodb.MongodbConditionMatcherFactory')
    const anotherInstance = make<MongodbConditionMatcherFactory>(MongodbConditionMatcherFactory)
    expect(anotherInstance === factory).toBe(true)
  })

  describe('.make()', function() {
    it('simply returns an instance of MongodbConditionMatcher', function() {
      const factory = make<MongodbConditionMatcherFactory>(MongodbConditionMatcherFactory)
      expect(factory.make({ bool: 'and', field: 'test', operator: '=', value: 'any' })).toBeInstanceOf(
        MongodbConditionMatcher
      )
    })
  })

  describe('.transform()', function() {
    it('calls and returns MongodbConditionMatcher.getCondition()', function() {
      const factory = make<MongodbConditionMatcherFactory>(MongodbConditionMatcherFactory)
      const data: any = {
        getCondition() {
          return 'anything'
        }
      }
      expect(factory.transform(data)).toEqual('anything')
    })
  })
})
