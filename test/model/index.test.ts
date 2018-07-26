import 'jest'
import { Model } from '../../lib/model/Model'
import { EloquentDriverProvider } from '../../lib/facades/global/EloquentDriverProviderFacade'
import { DummyDriver } from '../../lib/drivers/dummy/DummyDriver'

EloquentDriverProvider.register(DummyDriver, 'dummy', true)

describe('Model', function() {
  it('should works', function() {
    const test = new Model()
    test.query()
  })
})
