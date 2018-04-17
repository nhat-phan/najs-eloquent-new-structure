import 'jest'
// import * as Sinon from 'sinon'
import { Eloquent } from '../../../lib/model/Eloquent'
import { Attribute } from '../../../lib/model/components/Attribute'
import { DummyDriver } from '../../../lib/drivers/DummyDriver'
import { EloquentDriverProvider } from '../../../lib/facades/global/EloquentDriverProviderFacade'

EloquentDriverProvider.register(DummyDriver, 'dummy', true)

describe('Model/Attribute', function() {
  describe('Unit', function() {
    describe('.getClassName()', function() {
      it('implements Najs.Contracts.Autoload and returns "NajsEloquent.Model.Component.Attribute" as class name', function() {
        const attribute = new Attribute()
        expect(attribute.getClassName()).toEqual('NajsEloquent.Model.Component.Attribute')
      })
    })

    describe('.extend()', function() {
      it('extends the given prototype with 8 functions', function() {
        const functions = [
          'hasAttribute',
          'getAttribute',
          'setAttribute',
          'getPrimaryKey',
          'setPrimaryKey',
          'getPrimaryKeyName'
        ]
        const prototype = {}
        const attribute = new Attribute()
        attribute.extend(prototype, prototype)
        for (const name in functions) {
          expect(prototype[name] === Attribute[name]).toBe(true)
        }
      })
    })
  })

  describe('Integration', function() {
    class User extends Eloquent {
      static className = 'User'
      static fillable = ['first_name', 'last_name']
    }

    it('should work', function() {
      const user = new User()
      user.setAttribute('test', 'test')
      user.getAttribute('test')
      user.hasAttribute('anything')
      user.hasAttribute('driver')
      user.getPrimaryKey()
      user.setPrimaryKey('test')
      user.getPrimaryKeyName()
    })
  })
})
