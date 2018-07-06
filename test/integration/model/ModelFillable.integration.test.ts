import 'jest'
import { register } from 'najs-binding'
import { Model } from '../../../lib/model/Model'
import { DummyDriver } from '../../../lib/drivers/DummyDriver'
import { EloquentDriverProvider } from '../../../lib/facades/global/EloquentDriverProviderFacade'

EloquentDriverProvider.register(DummyDriver, 'dummy', true)

describe('Model Fillable Feature', function() {
  describe('No Setting', function() {
    class ModelFillableNoSetting extends Model<any> {
      getClassName() {
        return 'ModelFillableNoSetting'
      }
    }
    register(ModelFillableNoSetting)

    it('does not allow to .fill() any data because default guarded = ["*"]', function() {
      const model = new ModelFillableNoSetting()

      model.fill({
        a: 1,
        b: 2,
        _test: 3
      })
      expect(model.toObject()).toEqual({})
    })

    it('could add config fillable programmatically via .markFillable()', function() {
      const model = new ModelFillableNoSetting()

      model.markFillable('a', ['b', 'c']).fill({
        a: 1,
        b: 2,
        _test: 3
      })
      expect(model.getFillable()).toEqual(['a', 'b', 'c'])
      expect(model.toObject()).toEqual({ a: 1, b: 2 })
    })

    it('could add config guarded programmatically via .markGuarded()', function() {
      const model = new ModelFillableNoSetting()

      model.markGuarded('a', ['c']).fill({
        a: 1,
        b: 2,
        _test: 3
      })
      expect(model.getGuarded()).toEqual(['a', 'c'])
      expect(model.toObject()).toEqual({ b: 2 })
    })
  })
})
