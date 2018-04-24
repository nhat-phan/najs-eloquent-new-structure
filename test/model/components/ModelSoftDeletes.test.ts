import 'jest'
// import * as Sinon from 'sinon'
import { Eloquent } from '../../../lib/model/Eloquent'
import { ModelSoftDeletes } from '../../../lib/model/components/ModelSoftDeletes'
import { DummyDriver } from '../../../lib/drivers/DummyDriver'
import { EloquentDriverProvider } from '../../../lib/facades/global/EloquentDriverProviderFacade'

EloquentDriverProvider.register(DummyDriver, 'dummy', true)

describe('Model/Fillable', function() {
  describe('Unit', function() {
    describe('.getClassName()', function() {
      it('implements Najs.Contracts.Autoload and returns "NajsEloquent.Model.Component.ModelSoftDeletes" as class name', function() {
        const softDeletes = new ModelSoftDeletes()
        expect(softDeletes.getClassName()).toEqual('NajsEloquent.Model.Component.ModelSoftDeletes')
      })
    })

    describe('.extend()', function() {
      it('extends the given prototype with 8 functions', function() {
        const functions = ['hasSoftDeletes', 'getSoftDeletesSetting']
        const prototype = {}
        const softDeletes = new ModelSoftDeletes()
        softDeletes.extend(prototype, [], <any>{})
        for (const name of functions) {
          expect(typeof prototype[name] === 'function').toBe(true)
          expect(prototype[name] === ModelSoftDeletes[name]).toBe(true)
        }
      })
    })
  })

  describe('Integration', function() {
    class NotUse extends Eloquent {
      static className = 'NotUse'
    }

    class StaticTrue extends Eloquent {
      static className = 'StaticTrue'
      static softDeletes = true
    }

    class MemberTrue extends Eloquent {
      static className = 'MemberTrue'
      protected softDeletes = true
    }

    class StaticFalse extends Eloquent {
      static className = 'StaticFalse'
      static softDeletes = false
    }

    class MemberFalse extends Eloquent {
      static className = 'MemberFalse'
      softDeletes = false
    }

    class StaticCustom extends Eloquent {
      static className = 'StaticCustom'
      static softDeletes = { deletedAt: 'deletedAt', overrideMethods: true }
    }

    class MemberCustom extends Eloquent {
      static className = 'MemberCustom'
      static softDeletes = { deletedAt: 'deletedAt', overrideMethods: true }
    }

    class Both extends Eloquent {
      static className = 'Both'
      static softDeletes = true
      softDeletes = { deletedAt: 'deletedAt', overrideMethods: true }
    }

    describe('.hasSoftDeletes()', function() {
      it('determines softDeletes settings is exist or not', function() {
        expect(new NotUse().hasSoftDeletes()).toEqual(false)
        expect(new StaticTrue().hasSoftDeletes()).toEqual(true)
        expect(new MemberTrue().hasSoftDeletes()).toEqual(true)
        expect(new StaticFalse().hasSoftDeletes()).toEqual(false)
        expect(new MemberFalse().hasSoftDeletes()).toEqual(false)
        expect(new StaticCustom().hasSoftDeletes()).toEqual(true)
        expect(new MemberCustom().hasSoftDeletes()).toEqual(true)
        expect(new Both().hasSoftDeletes()).toEqual(true)
      })
    })

    describe('.getSoftDeletesSetting()', function() {
      it('always returns DEFAULT_TIMESTAMPS despite the .hasSoftDeletes() returns false', function() {
        expect(new NotUse().getSoftDeletesSetting()).toEqual(ModelSoftDeletes.DefaultSetting)
        expect(new StaticTrue().getSoftDeletesSetting()).toEqual(ModelSoftDeletes.DefaultSetting)
        expect(new MemberTrue().getSoftDeletesSetting()).toEqual(ModelSoftDeletes.DefaultSetting)
        expect(new StaticFalse().getSoftDeletesSetting()).toEqual(ModelSoftDeletes.DefaultSetting)
        expect(new MemberFalse().getSoftDeletesSetting()).toEqual(ModelSoftDeletes.DefaultSetting)
        expect(new Both().getSoftDeletesSetting()).toEqual(ModelSoftDeletes.DefaultSetting)
      })

      it('returns custom settings instead of default if defined', function() {
        expect(new StaticCustom().getSoftDeletesSetting()).toEqual({ deletedAt: 'deletedAt', overrideMethods: true })
        expect(new MemberCustom().getSoftDeletesSetting()).toEqual({ deletedAt: 'deletedAt', overrideMethods: true })
      })
    })
  })
})
