import 'jest'
import { Model } from '../../lib/model/Model'
import { DummyDriver } from '../../lib/drivers/DummyDriver'
import { EloquentDriverProviderFacade } from '../../lib/facades/global/EloquentDriverProviderFacade'

EloquentDriverProviderFacade.register(DummyDriver, 'dummy', true)

class User extends Model {
  static className = 'User'
}

describe('NajsEloquent', function() {
  it('defines "attributes" as a getter/setter to remove circular reference', function() {
    const user = new User()
    expect(user['attributes'] === user['driver'].getRecord()).toBe(true)
    const attributes = { test: 'anything' }
    user['attributes'] = attributes
    expect(user['driver'].getRecord() === attributes).toBe(true)

    const descriptor = Object.getOwnPropertyDescriptor(Model.prototype, 'attributes')
    expect(descriptor).not.toBeUndefined()
    expect(descriptor && typeof descriptor.get).toBe('function')
    expect(descriptor && typeof descriptor.set).toBe('function')
  })
})
