import 'jest'
import { MongodbRecordExecutor } from '../../../lib/drivers/mongodb/MongodbRecordExecutor'

describe('MongodbRecordExecutor', function() {
  function makeExecutor() {
    return new MongodbRecordExecutor({} as any, {} as any, {} as any, {} as any)
  }

  describe('.create()', function() {
    it('should work', function() {
      makeExecutor().create()
    })
  })

  describe('.update()', function() {
    it('should work', function() {
      makeExecutor().update()
    })
  })

  describe('.delete()', function() {
    it('should work', function() {
      makeExecutor().delete(true)
    })
  })

  describe('.restore()', function() {
    it('should work', function() {
      makeExecutor().restore()
    })
  })
})
