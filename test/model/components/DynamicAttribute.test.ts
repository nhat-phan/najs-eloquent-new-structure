import 'jest'
import * as Sinon from 'sinon'
import { Eloquent } from '../../../lib/model/Eloquent'
import { DummyDriver } from '../../../lib/drivers/DummyDriver'
import { DynamicAttribute } from '../../../lib/model/components/DynamicAttribute'

describe('Model/DynamicAttribute', function() {
  describe('Unit', function() {
    describe('.getClassName()', function() {
      it('implements Najs.Contracts.Autoload and returns "NajsEloquent.Model.Component.DynamicAttribute" as class name', function() {
        const dynamicAttribute = new DynamicAttribute()
        expect(dynamicAttribute.getClassName()).toEqual('NajsEloquent.Model.Component.DynamicAttribute')
      })
    })

    describe('.extend()', function() {
      it('extends the given prototype with 1 function', function() {
        class Test {}
        const prototype = Test.prototype

        const functions = ['hasAttribute']
        const dynamicAttribute = new DynamicAttribute()
        dynamicAttribute.extend(prototype, [], new DummyDriver())
        for (const name of functions) {
          expect(typeof prototype[name] === 'function').toBe(true)
          expect(prototype[name] === DynamicAttribute[name]).toBe(true)
        }
      })

      it('define 2 properties which in prototype and shared to all instances', function() {
        class Test {}
        const prototype = Test.prototype

        const dynamicAttribute = new DynamicAttribute()
        dynamicAttribute.extend(prototype, [], new DummyDriver())

        const a = new Test()
        const b = new Test()
        expect(a['knownAttributes']).not.toBeUndefined()
        expect(b['dynamicAttributes']).not.toBeUndefined()
        expect(a['knownAttributes'] === b['knownAttributes']).toBe(true)
        expect(a['dynamicAttributes'] === b['dynamicAttributes']).toBe(true)
      })

      it('defines knownAttributes with the result of .buildKnownAttributes()', function() {
        class Test {}
        const prototype = Test.prototype
        const bases = ['a', 'b']
        const driver = new DummyDriver()

        const buildKnownAttributesStub = Sinon.stub(DynamicAttribute, 'buildKnownAttributes')
        buildKnownAttributesStub.returns('anything')

        const dynamicAttribute = new DynamicAttribute()
        dynamicAttribute.extend(prototype, bases, driver)

        const instance = new Test()
        expect(instance['knownAttributes']).toEqual('anything')
        expect(buildKnownAttributesStub.calledWith(prototype, bases)).toBe(true)
        buildKnownAttributesStub.restore()
      })

      it('defines dynamicAttributes with the result of .buildDynamicAttributes()', function() {
        class Test {}
        const prototype = Test.prototype
        const bases = ['a', 'b']
        const driver = new DummyDriver()

        const buildDynamicAttributesStub = Sinon.stub(DynamicAttribute, 'buildDynamicAttributes')
        buildDynamicAttributesStub.returns('anything')

        const dynamicAttribute = new DynamicAttribute()
        dynamicAttribute.extend(prototype, bases, driver)

        const instance = new Test()
        expect(instance['dynamicAttributes']).toEqual('anything')
        expect(buildDynamicAttributesStub.calledWith(prototype, bases, driver)).toBe(true)
        buildDynamicAttributesStub.restore()
      })
    })

    describe('static .createDynamicAttributeIfNeeded()', function() {
      it('create new property with dynamicAttribute structure if needed', function() {
        const container = {}
        DynamicAttribute.createDynamicAttributeIfNeeded(container, 'test')
        expect(container['test']).toEqual({ name: 'test', getter: false, setter: false })

        DynamicAttribute.createDynamicAttributeIfNeeded(container, 'test')
        expect(container['test']).toEqual({ name: 'test', getter: false, setter: false })
      })
    })

    describe('static .findGettersAndSetters()', function() {
      class Model extends Eloquent {
        get first_name(): string {
          return 'test'
        }
        set last_name(value: string) {}
        get password(): string {
          return 'password'
        }
        set password(value: string) {}

        doSomething() {}
      }

      it('loops all properties of class prototype and sets getter or setter variable in structure', function() {
        const result = {}
        DynamicAttribute.findGettersAndSetters(result, Model.prototype)
        expect(result).toEqual({
          first_name: { name: 'first_name', getter: true, setter: false },
          last_name: { name: 'last_name', getter: false, setter: true },
          password: { name: 'password', getter: true, setter: true }
        })
      })
    })

    describe('static .findAccessorsAndMutators()', function() {
      class Model extends Eloquent {
        setFirstNameAttribute() {}

        getFullNameAttribute() {}

        setPasswordAttribute() {}

        getPasswordAttribute() {}
      }

      it('loops all properties of class prototype and sets accessor or mutator variable in structure', function() {
        const result = {}
        DynamicAttribute.findAccessorsAndMutators(result, Model.prototype, new DummyDriver())
        expect(result).toEqual({
          first_name: { name: 'first_name', getter: false, setter: false, mutator: 'setFirstNameAttribute' },
          full_name: { name: 'full_name', getter: false, setter: false, accessor: 'getFullNameAttribute' },
          password: {
            name: 'password',
            getter: false,
            setter: false,
            accessor: 'getPasswordAttribute',
            mutator: 'setPasswordAttribute'
          }
        })
      })
    })

    describe('static .buildDynamicAttributes()', function() {
      class Parent extends Eloquent {
        get first_name(): string {
          return 'test'
        }
        set last_name(value: string) {}
        get password(): string {
          return 'password'
        }
        set password(value: string) {}

        setFirstNameAttribute() {}

        getFullNameAttribute() {}

        setPasswordAttribute() {}

        getPasswordAttribute() {}
      }

      class Child extends Parent {
        getAnythingAttribute() {}
      }

      it('calls .findGettersAndSetters()/.findAccessorsAndMutators() for prototypes and bases', function() {
        const result = DynamicAttribute.buildDynamicAttributes(Parent.prototype, [], new DummyDriver())
        expect(result).toEqual({
          first_name: { name: 'first_name', getter: true, setter: false, mutator: 'setFirstNameAttribute' },
          last_name: { name: 'last_name', getter: false, setter: true },
          full_name: { name: 'full_name', getter: false, setter: false, accessor: 'getFullNameAttribute' },
          password: {
            name: 'password',
            getter: true,
            setter: true,
            accessor: 'getPasswordAttribute',
            mutator: 'setPasswordAttribute'
          }
        })
      })

      it('works with class inheritance', function() {
        const result = DynamicAttribute.buildDynamicAttributes(Child.prototype, [Parent.prototype], new DummyDriver())
        expect(result).toEqual({
          first_name: { name: 'first_name', getter: true, setter: false, mutator: 'setFirstNameAttribute' },
          last_name: { name: 'last_name', getter: false, setter: true },
          full_name: { name: 'full_name', getter: false, setter: false, accessor: 'getFullNameAttribute' },
          anything: { name: 'anything', getter: false, setter: false, accessor: 'getAnythingAttribute' },
          password: {
            name: 'password',
            getter: true,
            setter: true,
            accessor: 'getPasswordAttribute',
            mutator: 'setPasswordAttribute'
          }
        })
      })
    })
  })
})
