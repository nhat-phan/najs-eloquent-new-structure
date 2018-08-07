import 'jest'
import { Model } from '../../lib/model/Model'
import { EloquentDriverProvider } from '../../lib/facades/global/EloquentDriverProviderFacade'
import { DummyDriver } from '../../lib/drivers/dummy/DummyDriver'
import { ObjectId } from 'bson'

EloquentDriverProvider.register(DummyDriver, 'dummy', true)

describe('Model', function() {
  it('should works', function() {
    const test = new Model()
    test.query()
    try {
      test.query('test')
    } catch (error) {}
  })

  it('equals', function() {
    const a = new ObjectId()
    const b = new ObjectId()
    console.log(a.toHexString())
    console.log(b.toString() === b.toHexString())
    // const id = a.toHexString()
  })
})
