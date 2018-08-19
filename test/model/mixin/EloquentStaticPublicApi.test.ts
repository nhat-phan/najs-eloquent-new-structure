import 'jest'
import * as Sinon from 'sinon'
import { EloquentPublicApi } from '../../../lib/model/mixin/EloquentPublicApi'
import { EloquentStaticPublicApi } from '../../../lib/model/mixin/EloquentStaticPublicApi'

describe('EloquentStaticPublicApi', function() {
  it('extends EloquentPublicApi', function() {
    for (const name in EloquentPublicApi) {
      expect(EloquentStaticPublicApi[name] === EloquentPublicApi[name]).toBe(true)
    }
  })

  describe('.newQuery()', function() {
    it('creates an instance by Reflect.construct() then calls and returns the instance .newQuery()', function() {
      const instance = {
        newQuery() {}
      }

      const constructStub = Sinon.stub(Reflect, 'construct')
      constructStub.returns(instance)

      const stub = Sinon.stub(instance, 'newQuery')
      stub.returns('anything')

      expect(EloquentStaticPublicApi.newQuery()).toEqual('anything')
      expect(stub.calledWith()).toBe(true)
      stub.resetHistory()

      expect(EloquentStaticPublicApi.newQuery('test')).toEqual('anything')
      expect(stub.calledWith('test')).toBe(true)

      constructStub.restore()
    })
  })
})
