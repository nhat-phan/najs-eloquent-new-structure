import 'jest'
import * as Sinon from 'sinon'
import { Record } from '../../lib/drivers/Record'
import { RecordDataReader } from '../../lib/drivers/RecordDataReader'

describe('RecordDataReader', function() {
  describe('.getAttribute()', function() {
    it('calls and returns data.getAttribute()', function() {
      const record = new Record()

      const stub = Sinon.stub(record, 'getAttribute')
      stub.returns('anything')
      expect(RecordDataReader.getAttribute(record, 'a')).toEqual('anything')
      expect(stub.calledWith('a')).toBe(true)
    })
  })

  describe('.pick()', function() {
    it('creates new Record instance with the Lodash.pick() data', function() {
      const record = new Record({ id: 1, first_name: 'a', last_name: 'x', age: 30 })
      const result = RecordDataReader.pick(record, ['first_name', 'last_name'])
      expect(result === record).toBe(false)
      expect(result.toObject()).toEqual({ first_name: 'a', last_name: 'x' })
    })
  })
})
