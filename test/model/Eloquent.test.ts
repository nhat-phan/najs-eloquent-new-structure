import 'jest'
import { Model } from '../../lib/model/Model'
import { Eloquent } from '../../lib/model/Eloquent'
import { DummyDriver } from '../../lib/drivers/dummy/DummyDriver'
import { EloquentDriverProvider } from '../../lib/facades/global/EloquentDriverProviderFacade'
import { EloquentPublicApi } from '../../lib/model/mixin/EloquentPublicApi'
import { EloquentStaticPublicApi } from '../../lib/model/mixin/EloquentStaticPublicApi'

EloquentDriverProvider.register(DummyDriver, 'dummy', true)

describe('Eloquent', function() {
  it('extends Model', function() {
    const eloquent = new Eloquent()
    expect(eloquent).toBeInstanceOf(Model)
  })

  for (const method in EloquentPublicApi) {
    describe(`.${method}()`, function() {
      it(`is provided by EloquentPublicApi.${method}()`, function() {
        expect(Eloquent[method] === EloquentPublicApi['method'])
      })
    })
  }

  describe('Static Functions', function() {
    describe('.Class()', function() {
      it('returns it-self, just for better grammar', function() {
        expect(Eloquent.Class() === (Eloquent as any)).toBe(true)

        class ChildEloquent extends Eloquent.Class() {
          getClassName() {
            return 'ChildEloquent'
          }
        }
        expect(ChildEloquent.Class() === (ChildEloquent as any)).toBe(true)
      })
    })

    for (const method in EloquentStaticPublicApi) {
      describe(`.${method}()`, function() {
        it(`is provided by EloquentStaticPublicApi.${method}()`, function() {
          expect(Eloquent[method] === EloquentStaticPublicApi['method'])
        })
      })
    }
  })
})
